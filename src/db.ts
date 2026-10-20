import { DatabaseSync } from 'node:sqlite'
import { hashSenha } from './auth.ts'

// ':memory:' = banco que nasce e morre com o processo (usado nos testes)
export function criarBanco(arquivo = ':memory:'): DatabaseSync {
  const db = new DatabaseSync(arquivo)
  db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha_hash TEXT NOT NULL
  )`)
  db.prepare('INSERT OR IGNORE INTO users (nome, email, senha_hash) VALUES (?, ?, ?)')
    .run('Palmer', 'palmer.oliveira@ulbra.br', hashSenha('senha123'))
  return db
}
