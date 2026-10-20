import { expect, test } from '@playwright/test'

test('entra com e-mail e senha corretos', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill('palmer.oliveira@ulbra.br')
  await page.getByLabel('Senha').fill('senha123')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page).toHaveURL('/secure')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bem-vindo, Palmer!')

  await page.getByRole('button', { name: 'Sair' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Entrar')
})

test('abrir /secure sem login volta para o login', async ({ page }) => {
  await page.goto('/secure')
  await expect(page).toHaveURL('/')
})

test('senha errada mostra mensagem de erro', async ({ page }) => {
  await page.goto('/')
  await page.getByLabel('E-mail').fill('palmer.oliveira@ulbra.br')
  await page.getByLabel('Senha').fill('errada')
  await page.getByRole('button', { name: 'Entrar' }).click()
  await expect(page.getByRole('alert')).toHaveText('E-mail ou senha incorretos')
})

test('criar conta leva para a página de cadastro', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Criar conta' }).click()
  await expect(page).toHaveURL('/cadastro')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Criar conta')
})
