import { test, expect } from '@playwright/test';
import { indexPageModel } from '../pom/indexPageModel';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Diller/);
});

test('az sort test', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link',{name:'Index'}).click();
  const indexPage = new indexPageModel(page);
  await indexPage.educationFilter.click();
  const locatorsInitial = await indexPage.projectsList.all();
  const listValuesInitial = await Promise.all(locatorsInitial.map(row => row.textContent()));
  await indexPage.azSort.click();
  const locatorsSorted = await indexPage.projectsList.all();
  const listValuesSorted = await Promise.all(locatorsSorted.map(row => row.textContent()));
  expect(listValuesInitial.sort()).toEqual(listValuesSorted);
});
