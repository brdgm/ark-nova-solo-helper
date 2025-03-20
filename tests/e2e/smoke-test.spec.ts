import { test, expect } from '@playwright/test'

test('smoke test', async ({ page }) => {
  await page.goto('/')

  // app home
  await expect(page.locator('h1')).toHaveText('Ark Nova Solo Helper')
  await page.getByRole('link', { name: 'Play Game' }).click()

  // setup game
  await page.getByRole('link', { name: 'ARNO Setup' }).click()
  await page.getByRole('button', { name: 'Start Game' }).click()

  // play three rounds
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()
  await page.getByRole('link', { name: 'Next' }).click()

  // finish game, end game
  await page.getByRole('button', { name: 'Finish Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'Finish Game' }).click()
  await page.getByRole('button', { name: 'End Game' }).click()
  await page.locator('#endGameModal').getByRole('button', { name: 'End Game' }).click()

  // app home
  await expect(page.locator('h1')).toHaveText('Ark Nova Solo Helper')
})
