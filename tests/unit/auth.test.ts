import { expect, test } from 'vitest'
import { hashSenha, validarLogin, verificarSenha } from '../../src/auth.ts'

test('aceita e-mail e senha preenchidos', () => {
  expect(validarLogin('palmer.oliveira@ulbra.br', 'senha123')).toBeNull()
})

test('rejeita e-mail sem @', () => {
  expect(validarLogin('palmer.ulbra.br', 'senha123')).toBe('E-mail inválido')
})

test('rejeita senha vazia', () => {
  expect(validarLogin('palmer.oliveira@ulbra.br', '')).toBe('Informe a senha')
})

test('confere a senha certa e recusa a errada', () => {
  const hash = hashSenha('senha123')
  expect(verificarSenha('senha123', hash)).toBe(true)
  expect(verificarSenha('senha124', hash)).toBe(false)
})
