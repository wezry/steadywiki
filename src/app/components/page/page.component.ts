import { PagesService } from '../../services/pages.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Page } from 'src/app/models/page';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  @ViewChild('content', {static: false}) content: HTMLElement;
  page: Page;
  safeHtml: SafeHtml;

  constructor(
    private route: ActivatedRoute,
    private pagesService: PagesService,
    private sanitizer: DomSanitizer,
    private router: Router
    ) { }

  ngOnInit() {
    // this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(`<a href="/123">test link</a> and not a link.`);
    this.route.paramMap.pipe(switchMap((params: ParamMap) => {
      console.log(params.get('id'));
      return this.pagesService.getPageById(params.get('id'));
    })).subscribe((resp) => {
      this.page = resp;
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(this.page.content);
    });
  }

  link(ev: any){
    if (ev.target.localName == 'a') {
      ev.preventDefault();
      this.router.navigate([ev.target.pathname]);
    }
  }
}
