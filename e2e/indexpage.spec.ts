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

test('year sort test', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link',{name:'Index'}).click();
  const indexPage = new indexPageModel(page);
  await indexPage.educationFilter.click();
  
  const locatorsInitial = await indexPage.projectsList.all();
  const listValuesInitial = await Promise.all(locatorsInitial.map(row => row.textContent()));

  listValuesInitial.sort((a, b) => {
    
    const yearRegex = /\b\d{4}\b/;
    const arrA = a?.match(yearRegex);
    const arrB = b?.match(yearRegex);
    const yearA = parseInt(arrA?.[0] ?? "");
    const yearB = parseInt(arrB?.[0] ?? "");
    return yearB -yearA;
  });

  //await indexPage.yearSort.click();
  const locatorsSorted = await indexPage.projectsList.all();
  const listValuesSorted = await Promise.all(locatorsSorted.map(row => row.textContent()));
  
  expect(listValuesInitial).toEqual(listValuesSorted);
});
