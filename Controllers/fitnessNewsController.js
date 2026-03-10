import axios from 'axios'

export const getFitnessNews = async (req, res) => {
    try{
        const newsResponse = await axios.get('https://newsapi.org/v2/everything',{
            params:{
                q: 'ejercicio',
                language: 'es',
                pageSize: 9,
                apiKey: process.env.NEWS_API_KEY
            }
        });

        res.json(newsResponse.data.articles);
    }catch(error){
        req.status(500).json({error: 'Error al obtener noticias'})
    }
}