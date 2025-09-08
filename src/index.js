import dotenv from 'dotenv'
import { app } from './app.js'
import connectDatabase from './config/database.js'
import { ENV } from './config/env.js'

dotenv.config()

await connectDatabase()

app.listen(ENV.port, () => {
    console.log(`Server is running on port ${ENV.port}`)
})
