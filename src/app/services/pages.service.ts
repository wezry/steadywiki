import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Page, PageList } from '../models/page';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  private API_ROOT = 'api';
  private availablePages: Array<Page>;

  constructor(private httpClient: HttpClient) { }

  getPages(): Observable<PageList> {
    return this.httpClient.get<PageList>(`${this.API_ROOT}/pages`).pipe(map((pages) => {
      this.availablePages = pages.pages;
      return pages;
    }));
  }

  getPageById(pageGuid: string): Observable<Page> {
    return this.httpClient.get<Page>(`${this.API_ROOT}/pages/${pageGuid}`).pipe(map((page) => {
      page.content = this.processPageLinks(page.content);
      return page;
    }));
  }

  processPageLinks(pageContent: string): string {
    let pageList = this.availablePages.slice().sort((a, b) => {
      // return a.title.length - b.title.length;
      return b.title.length - a.title.length;
    });
    let mappings: Array<{guid: Guid, originalText: string}> = [];
    // We find and replace from longest to shortest. We use a guid for each item to place hold so we don't get name collisions.
    while (pageList.length > 0) {
      let currentPage = pageList.shift();
      let regEx = new RegExp(`\\b${currentPage.title}\\b`, 'ig');
      if (pageContent.match(regEx)) {
        pageContent = pageContent.replace(new RegExp(`\\b${currentPage.title}\\b`, 'ig'), (original) => {
          let guid = Guid.create();
          mappings.push({guid: guid, originalText: original});
          return `<a href="/${currentPage._id}">${guid.toString()}</a>`
        });
      }
    }
    // Then we backfill the replaced words via guid.
    for (let map of mappings) {
      pageContent = pageContent.replace(map.guid.toString(), map.originalText);
    }

    return pageContent;
  }

}
