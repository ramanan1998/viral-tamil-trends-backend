// @ts-ignore
import { PromptTemplate } from "@langchain/core/prompts";
// @ts-ignore
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import z from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Request, Response } from "express";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.4,
  maxOutputTokens: 2048,
});


const zodSchema = z.object({
  query: z.string(),
  content: z.array(
    z.object({
        topic: z.string(),
        hook: z.string(),
        script: z.array(z.object({ personA: z.string(), personB: z.string() })),
        cta: z.string(),
        hashtags: z.string().array(),
        caption: z.string()
      })
  ),
});

const parser = StructuredOutputParser.fromZodSchema(zodSchema);

export const generateQuery = async (req: Request, res: Response) => {

    try{

        const { query } = req.query;
        
        const prompt = PromptTemplate.fromTemplate(`
            You are a Tamil content writer. 
            Generate a viral 25-sec script. 
            Assume person A and person B having energetic, funny conversation for creating a viral video. 
            write in tamil words.
            - DO NOT hallucinate products — respond ONLY using the query.
            Tone: Energetic, Tamil slang mixing English lightly.
            Topic: {query}
            Start with a strong hook.
            End with a punchline.
            - If data is found, summarize the key details in {format_instructions}.
        `);

        const pipe = prompt.pipe(llm).pipe(parser);
        const result = await pipe.invoke({ query, format_instructions: parser.getFormatInstructions() });
        res.send(result)

    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
};
