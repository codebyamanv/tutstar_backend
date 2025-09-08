import { Router } from 'express'

const baseRouter = Router()

baseRouter.get('/', (req, res) => {
    res.send('TutStar API: Started successfully')
})

export default baseRouter
