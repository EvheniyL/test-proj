import { expect, type Locator, type Page } from '@playwright/test';

export class indexPageModel { 

    readonly page: Page;
    readonly educationFilter: Locator;
    readonly azSort: Locator;
    readonly projectsList: Locator;

    /**
     *
     */
    constructor(page: Page) {
        this.page = page;
        this.educationFilter = page.getByRole('link', { name: 'E d u c a t i o n' });
        this.azSort = page.getByRole('link', { name: 'A-Z' });
        this.projectsList = page.getByTestId('projects').getByRole('listitem');
    }

}