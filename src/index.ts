import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.use(async (_, next) => {
  console.log('middleware 1 start')
  await next()
  console.log('middleware 1 end')
})

app.use(async (_, next) => {
  console.log(`[${_.req.method}] ${_.req.url}`)
  await next()
})

app.get('/:fname', (c) => {
  console.log(123, c.req.param("fname"));

  return c.json({ name: "ali" })
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
