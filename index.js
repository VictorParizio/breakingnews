import express from 'express'
import dotenv from 'dotenv'

import connectDatabase from './src/database/database.js'

import userRoute from './src/routes/user.route.js'
import authRoute from './src/routes/auth.route.js'

const app = express()
const port = process.env.PORT || 3000

dotenv.config()
connectDatabase()

app.use(express.json())
app.use("/user", userRoute)
app.use("/auth", authRoute)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))