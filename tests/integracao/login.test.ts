import request from 'supertest'
import { expect, test } from 'vitest'
import { criarApp } from '../../src/app.ts'
import { criarBanco } from '../../src/db.ts'

const app = criarApp(criarBanco()) // SQLite em memória, já com o usuário semeado

test('POST /api/login com credenciais certas devolve 200 e o nome', async () => {
  const res = await request(app).post('/api/login')
    .send({ email: 'palmer.oliveira@ulbra.br', senha: 'senha123' })
  expect(res.status).toBe(200)
  expect(res.body).toEqual({ nome: 'Palmer' })
})

test('POST /api/login com senha errada devolve 401', async () => {
  const res = await request(app).post('/api/login')
    .send({ email: 'palmer.oliveira@ulbra.br', senha: 'errada' })
  expect(res.status).toBe(401)
})

test('POST /api/login com e-mail desconhecido devolve 401', async () => {
  const res = await request(app).post('/api/login')
    .send({ email: 'ninguem@ulbra.br', senha: 'senha123' })
  expect(res.status).toBe(401)
})

test('POST /api/login com e-mail inválido devolve 400', async () => {
  const res = await request(app).post('/api/login').send({ email: 'x', senha: 'senha123' })
  expect(res.status).toBe(400)
})
