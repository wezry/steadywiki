export interface Page {
    _id: string,
    content: string,
    title: string
}

export interface PageList {
    pages: Array<Page>
}