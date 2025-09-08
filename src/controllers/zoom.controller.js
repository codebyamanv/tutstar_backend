import Zoom from '../models/zoom.model.js'
import {
    createMeeting,
    deleteMeeting,
    getMeeting,
    getMeetingParticipants,
} from '../services/zoom.services.js'
import ApiResponse from '../utils/apiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'

export async function createMeetingController(req, res) {
    try {
        const { topic, start_time, duration } = req.body
        const timezone = 'Asia/Kolkata'
        const meeting = await createMeeting(topic, start_time, duration, timezone)
        await Zoom.create(meeting)
        return ApiResponse.created(meeting).send(res)
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message })
    }
}

export const allMeetings = asyncHandler(async (req, res) => {
    const meetings = await Zoom.find()
    return ApiResponse.success({ meetings }).send(res)
})

export async function getMeetingController(req, res) {
    try {
        const { id } = req.params
        const meeting = await getMeeting(id)
        res.json(meeting)
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message })
    }
}

export async function deleteMeetingController(req, res) {
    try {
        const { id } = req.params
        const result = await deleteMeeting(id)
        res.json(result)
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message })
    }
}

export async function getParticipantsController(req, res) {
    try {
        const { id } = req.params
        const participants = await getMeetingParticipants(id)
        res.json(participants)
    } catch (err) {
        res.status(500).json({ error: err.response?.data || err.message })
    }
}
