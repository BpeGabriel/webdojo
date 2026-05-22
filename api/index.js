const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  console.log(err)

  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid Json Format' })
  }

  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Cypress!' })
})

app.post('/api/users/register', async (req, res) => {

  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({ error: 'The "name" field is required.' })
  }

  if (!email) {
    return res.status(400).json({ error: 'The "email" field is required.' })
  }

  if (!password) {
    return res.status(400).json({ error: 'The "password" field is required.' })
  }

  try {

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password
      }
    })

    return res.status(201).json({
      message: "User successfully registered.",
      user
    })

  } catch (error) {

    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'Email address already exists.' })
    }

    return res.status(500).json({ error: 'Internal server error.' })
  }

})


app.get('/api/users', async (req, res) => {

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false
      }
    })
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users.' })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})