import { Router } from 'express'
import {
    allMeetings,
    createMeetingController,
    deleteMeetingController,
    getMeetingController,
} from '../controllers/zoom.controller.js'
import { getMeetingParticipants } from '../services/zoom.services.js'

const zoomRouter = Router()

zoomRouter.post('/', createMeetingController)
zoomRouter.get('/', allMeetings)
zoomRouter.get('/meetings/:id', getMeetingController)
zoomRouter.get('/meetings/:id/participants', getMeetingParticipants)
zoomRouter.delete('/meetings/:id', deleteMeetingController)
export default zoomRouter
