# SteadyWiki

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.3.

## Project Scope and Goals

The goal of this project is to create a simple web application that can display a list of wiki pages and the corresponding detail pages. The detail pages and the contents should be automatically linking to other pages if they exist.

## Technologies

Using the MEAN stack deployed on Heroku.

## Terminology

Page - a wiki page
Child page - a linked page in the contents of a wiki page

## Challenges

### Matching available pages with content phrases

I am using a brute force approach in detecting child page availability by checking if every available page is in the body text. If so, then we create a link to the child page. All this is done on the front-end of the application. Therefore, this process has to be run each time a page is loaded.

This approach is decent for a small number of pages, but as the number of available pages becomes larger, each page's loading time will continue to increase. 

### Overlapping page namespaces

One of the main challenges that first came to mind is the concurrency of linked pages in the body of each page. For example, presume we have the following pages: "pets", "cats", and "feral cats". If the body of "pets" contains the phrase "feral cats", which page do we route to? "cats" or "feral cats"?

My first approach was to find one that is more matching. In the above example, we would be matching to "feral cats" as that is the more specific match. Then skip any of the inside pages such as "feral" and "cats". However, after implementing, I realized that this would invalidate real cases where "feral" or "cats" when not a part of "feral cats".

Another approach that came to mind was to link both matching words. For example, we would write <a>Feral <a>Cats</a></a> and have the behavior where clicking on the larger phrase would go to Feral Cats while clicking on cats would only go to cats. However, if we had the pages "feral", "cats", and "feral cats". This approach would not work because the user would not be able to reach the page "feral cats".

The solution I have is to replace matching names with guid (from longest title to shortest) and then once all available pages are matched, we backfill from guid to the original text. This is computationally intensive, but we guarantee that we don't "double match" overlapping name spaces.