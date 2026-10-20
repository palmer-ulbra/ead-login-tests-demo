import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto'

export function validarLogin(email: unknown, senha: unknown): string | null {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'E-mail inválido'
  if (typeof senha !== 'string' || senha.length === 0) return 'Informe a senha'
  return null
}

export function hashSenha(senha: string): string {
  const sal = randomBytes(16).toString('hex')
  return `${sal}:${scryptSync(senha, sal, 64).toString('hex')}`
}

export function verificarSenha(senha: string, hash: string): boolean {
  const [sal, chave] = hash.split(':')
  return timingSafeEqual(scryptSync(senha, sal, 64), Buffer.from(chave, 'hex'))
}
