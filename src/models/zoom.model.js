import { Schema, model } from 'mongoose'

const zoomSchame = new Schema(
    {
        zoomid: String,
        timeZone: String,
        host_id: String,
        start_url: String,
        join_url: String,
        topic: String,
        duration: Number,
        start_time: String,
        password: String,   
    },
    {
        timestamps: true,
    },
)

const Zoom = model('Zoom', zoomSchame)
export default Zoom
