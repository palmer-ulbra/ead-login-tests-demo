import { criarApp } from './app.ts'
import { criarBanco } from './db.ts'

const porta = Number(process.env.PORT ?? 3000)
criarApp(criarBanco('dados.sqlite')).listen(porta, () => {
  console.log(`🔐 http://localhost:${porta}`)
})
