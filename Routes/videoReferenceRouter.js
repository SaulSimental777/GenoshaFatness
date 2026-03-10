import { Router } from 'express'

import { getVideos } from '../Controllers/videoReference.js'


const router = Router()
router.get('/videoReference', getVideos)

export default router