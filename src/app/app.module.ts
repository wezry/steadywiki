import { PageComponent } from './components/page/page.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesService } from './services/pages.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PageListComponent } from './components/page-list/page-list.component';
import { MarkdownModule } from 'ngx-markdown';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    PageListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [
    NgbModule,
    PagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
