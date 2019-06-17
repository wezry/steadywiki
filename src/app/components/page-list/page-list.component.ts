import { PagesService } from './../../services/pages.service';
import { Component, OnInit } from '@angular/core';
import { Page } from 'src/app/models/page';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  pages: Array<Page>;

  constructor(private pagesService: PagesService) { }

  ngOnInit() {
    this.pagesService.getPages().subscribe((pages) => {
      this.pages = pages.pages;
    });
  }

}
