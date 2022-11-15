import dotenv from 'dotenv'
import { setupServer } from './setup'

dotenv.config({})

const dev = process.env.NODE_ENV !== 'production'

setupServer({ dev })
