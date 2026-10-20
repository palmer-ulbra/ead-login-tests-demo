import express from 'express'
import type { DatabaseSync } from 'node:sqlite'
import { validarLogin, verificarSenha } from './auth.ts'

type User = { nome: string; senha_hash: string }

export function criarApp(db: DatabaseSync) {
  const app = express()
  app.use(express.json())
  app.use(express.static(new URL('../public', import.meta.url).pathname, { extensions: ['html'] }))

  app.post('/api/login', (req, res) => {
    const { email, senha } = req.body ?? {}
    const erro = validarLogin(email, senha)
    if (erro) return res.status(400).json({ erro })

    const user = db.prepare('SELECT nome, senha_hash FROM users WHERE email = ?').get(email) as User | undefined
    if (!user || !verificarSenha(senha, user.senha_hash)) {
      return res.status(401).json({ erro: 'E-mail ou senha incorretos' })
    }
    res.json({ nome: user.nome })
  })

  return app
}
