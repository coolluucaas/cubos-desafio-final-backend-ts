import dotenv from 'dotenv'
dotenv.config({ path: `./env/.env.${process.env.NODE_ENV}` })

import express from 'express'
import { router } from './routes'

const app = express()

app.use(express.json())
app.use(router)

export { app }
