import { test, expect } from '@playwright/test'

test('homepage loads and shows Icondoric brand', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Icondoric/)
  await expect(page.locator('#nav-brand')).toBeVisible()
})

test('hero section displays full name', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=Ivan Condori Choquehuanca')).toBeVisible()
})

test('portfolio section is present', async ({ page }) => {
  await page.goto('/')
  await page.locator('#portafolio').scrollIntoViewIfNeeded()
  await expect(page.locator('#portafolio')).toBeVisible()
})

test('social icons are rendered', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#social-github')).toBeVisible()
  await expect(page.locator('#social-instagram')).toBeVisible()
})
