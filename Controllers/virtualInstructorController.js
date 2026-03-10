import OpenAI from 'openai';

export const getChatResponse = async (req, res) => {
    const { message } = await req.body;

    console.log(message)

      const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY || '',
     });

     const stream = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user",
              content: 'Eres una instructora virtual llamada sigrun para una aplicacion web basada en rutinas de ejercicios y recetas saludables'
             + 'contestaras cualquier pregunta respecto al tema de ejercicios que trabajan ciertos grupos musculares,' 
             + 'la mejor forma de ejercitarse, alimentos ricos en calorias y macronutrientes asi como recomendar rutinas de ejercicios,' 
              + 'el idioma que hablaras sera el español' 
              + 'No hace falta que saludes despues del segundo mensaje'
              + message

             }],
        stream: true,

     });

     let fullResponse = ''

     for await (const chunk of stream) {
         fullResponse += chunk.choices[0]?.delta?.content || "";
     }

     res.status(200).json({message: fullResponse})




};
