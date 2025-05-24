import { expect, test } from '@playwright/test';

test('should work fine', async ({ page }) => {
   await page.goto('http://localhost:3000/');

   await page.getByRole('link', { name: 'Add New Volunteer' }).click();

   await page.getByRole('textbox', { name: 'Full Name' }).click();
   await page.getByRole('textbox', { name: 'Full Name' }).fill('Jack');
   await page.getByRole('textbox', { name: 'Full Name' }).press('Tab');
   await page
      .getByRole('textbox', { name: 'Phone Number' })
      .fill('09366667788');
   await page.getByRole('textbox', { name: 'Phone Number' }).press('Tab');
   await page.getByRole('textbox', { name: 'Birthday' }).fill('2006-01-24');
   await page.getByRole('button', { name: 'Next' }).click();

   await page.getByRole('textbox', { name: 'Skills' }).click();
   await page.getByRole('textbox', { name: 'Skills' }).fill('html');
   await page.getByRole('button', { name: 'Add' }).click();
   await page.getByRole('textbox', { name: 'Skills' }).click();
   await page.getByRole('textbox', { name: 'Skills' }).fill('react');
   await page.getByRole('button', { name: 'Add' }).click();
   await page.getByRole('textbox', { name: 'Skills' }).click();
   await page.getByRole('textbox', { name: 'Skills' }).fill('javascript');
   await page.getByRole('button', { name: 'Add' }).click();
   await page.getByRole('button', { name: 'Next' }).click();

   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.getByText('Success!')).toBeVisible();
});

test('should fail with incomplete data', async ({ page }) => {
   await page.goto('http://localhost:3000/add-volunteer/3');

   await page.getByRole('button', { name: 'Submit' }).click();
   await expect(page.getByText('Oops!')).toBeVisible();
});

test('back buttons should work', async ({ page }) => {
   await page.goto('http://localhost:3000/add-volunteer/3');

   await page.getByRole('button', { name: 'Back' }).click();
   await expect(page).toHaveURL('http://localhost:3000/add-volunteer/2');

   await page.getByRole('button', { name: 'Back' }).click();
   await expect(page).toHaveURL('http://localhost:3000/add-volunteer/1');

   await expect(page.getByRole('button', { name: 'Back' })).not.toBeVisible();
});

test.describe('Personal Info Input Validation', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/add-volunteer/1');
   });

   test('should show errors if required inputs not provided', async ({
      page,
   }) => {
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(
         page.getByText('Full name must be at least 3 characters.')
      ).toBeVisible();
      await expect(
         page.getByText('At least phone or email must be provided.')
      ).toBeVisible();
      await expect(
         page.getByText('Please select your birthday.')
      ).toBeVisible();
   });

   test('should show error for 1 char full name', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Full Name' }).fill('J');

      await page.getByRole('button', { name: 'Next' }).click();
      await expect(
         page.getByText('Full name must be at least 3 characters.')
      ).toBeVisible();
   });

   test('should show error for invalid birthday', async ({ page }) => {
      await page.getByRole('textbox', { name: 'Full Name' }).fill('Jack');
      await page
         .getByRole('textbox', { name: 'Phone Number' })
         .fill('09366667788');
      await page
         .getByRole('textbox', { name: 'Birthday' })
         .fill('2015-01-01  ');
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(page.getByText(/18 years old/i)).toBeVisible();
   });
});

test.describe('Skills Page Tests', () => {
   test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/add-volunteer/2');
   });

   test('clicking on add button adds skill', async ({ page }) => {
      const skill = 'playwright';
      await page.getByRole('textbox', { name: 'Skills' }).fill(skill);
      await page.getByRole('button', { name: 'Add' }).click();
      await expect(page.getByText(skill)).toBeVisible();
   });

   test('error text appears without any skills', async ({ page }) => {
      await page.getByRole('button', { name: 'Next' }).click();
      await expect(
         page.getByText('You have to enter at least one skill!')
      ).toBeVisible();
   });

   test('delete button works', async ({ page }) => {
      const skill = 'playwright';
      await page.getByRole('textbox', { name: 'Skills' }).fill(skill);
      await page.getByRole('button', { name: 'Add' }).click();
      await page.getByLabel('Delete').click();
      await expect(page.getByText(skill)).not.toBeVisible();
   });
});
