import axios from "axios"

export const getVideos = async (req, res) => {
    const { find } = req.query
    try{
        
        const searchRes = await axios.get ('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                q:find,
                type: 'video',
                videoDuration: 'medium',
                maxResults: 4,

                key: process.env.YOUTUBE_API_KEY
            }
        }) 
        res.json(searchRes.data)

    }catch (error){
        console.error(error.message)
        res.status(500).json({error: 'Error al obtener datos de Youtube'})

    }
    
          

}