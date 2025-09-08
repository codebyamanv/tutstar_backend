import axios from 'axios'
import dotenv from 'dotenv'

const ZOOM_ACCOUNT_ID = 'VUKalZ8RRXOCkDLmWs6HhQ'
const ZOOM_CLIENT_ID = 'KMRQQwXySSe2d1x8Ed8sDg'
const ZOOM_CLIENT_SECRET = 'LtF3e9Mg6Psp6q7ibelp2hHAEX6B3RfQ'
const ZOOM_USER_ID = 'amanverma0428@gmail.com'

let accessToken = null
let tokenExpiry = null

// Generate Access Token
async function getAccessToken() {
    const now = Date.now()

    if (accessToken && tokenExpiry && now < tokenExpiry) {
        return accessToken // reuse valid token
    }

    const resp = await axios.post(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
        {},
        {
            auth: {
                username: ZOOM_CLIENT_ID,
                password: ZOOM_CLIENT_SECRET,
            },
        },
    )

    accessToken = resp.data.access_token
    tokenExpiry = now + resp.data.expires_in * 1000 // ms
    return accessToken
}

export async function createMeeting(topic, start_time, duration = 30) {
    const token = await getAccessToken()
    const resp = await axios.post(
        `https://api.zoom.us/v2/users/${ZOOM_USER_ID}/meetings`,
        {
            topic,
            type: 2, // scheduled meeting
            start_time,
            duration,
            timezone: 'Asia/Kolkata',
            settings: {
                host_video: true,
                participant_video: true,
            },
        },
        { headers: { Authorization: `Bearer ${token}` } },
    )
    return resp.data
}

export async function getMeeting(meetingId) {
    const token = await getAccessToken()
    const resp = await axios.get(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return resp.data
}

export async function deleteMeeting(meetingId) {
    const token = await getAccessToken()
    await axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    return { message: 'Meeting deleted' }
}
export async function getMeetingParticipants(meetingId) {
    const token = await getAccessToken()

    const resp = await axios.get(
        `https://api.zoom.us/v2/report/meetings/${meetingId}/participants?page_size=100`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    )

    return resp.data // contains participants list
}
