import { GoogleGenerativeAI } from "@google/generative-ai";

export const getChatResponse = async (req, res) => {
    const { message } = await req.body;

    console.log(message);

    // Inicializar Gemini con tu API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    //Configurar el modelo con sus instrucciones de sistema
    const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash-lite", 
        systemInstruction: "Eres una instructora virtual llamada Sigrun para una aplicación web basada en rutinas de ejercicios y recetas saludables. "
                         + "Contestarás cualquier pregunta respecto al tema de ejercicios que trabajan ciertos grupos musculares, "
                         + "la mejor forma de ejercitarse, alimentos ricos en calorías y macronutrientes, así como recomendar rutinas de ejercicios. "
                         + "El idioma que hablarás será el español. No hace falta que saludes después del segundo mensaje."
    });

    try {
        
        const result = await model.generateContentStream(message);

        let fullResponse = '';

        
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
        }

        res.status(200).json({ message: fullResponse });

    } catch (error) {
        console.error("Error con Gemini:", error);
        res.status(500).json({ error: "Hubo un fallo al procesar la respuesta." });
    }
};
