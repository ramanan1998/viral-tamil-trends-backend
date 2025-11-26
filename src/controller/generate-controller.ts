// @ts-ignore
import { PromptTemplate } from "@langchain/core/prompts";
// @ts-ignore
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import z from "zod";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Request, Response } from "express";
import userModel from "../model/user";

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-2.0-flash",
  temperature: 0.4,
  maxOutputTokens: 2048,
});


// const zodSchema = z.object({
//   query: z.string(),
//   content: z.array(
//     z.object({
//         topic: z.string(),
//         hook: z.string(),
//         // script: z.array(z.object({ personA: z.string(), personB: z.string() })),
//         script: z.string(),
//         cta: z.string(),
//         hashtags: z.string().array(),
//         caption: z.string()
//       })
//   ),
// });

const zodSchema = z.object({
  content: z.array(
    z.string()
  ),
});

const parser = StructuredOutputParser.fromZodSchema(zodSchema);

export const generateQuery = async (req: Request, res: Response) => {

    try{

      const { trending, language, writingStyle, platform, videoLength, numberOfVariations, trendingKeywords, content } = req.query;
      const userId = req.userId

      const user = await userModel.findOne({ _id: userId });

      if(!user){
        res.status(401).json({ message: "unauthorized user" });
        return;
      }

      if(user.credits <= 0){
        res.status(400).json({ message: "Insufficient credits" });
        return;
      }

      const prompt = PromptTemplate.fromTemplate(`
        Assume person A and person B having a {writingStyle} conversation in {language} for creating a viral video on {platform}
        Generate a viral {videoLength} script. 
        - DO NOT hallucinate products — respond ONLY using the query.
        - Tone: {writingStyle}, {language} slang mixing English lightly.
        - Topic: {trending} - {content}
        - Strictly include these keywords in the script: {trendingKeywords}
        - Start with a strong hook.
        - End with a punchline.
        - Give me {numberOfVariations} variations to select better script in an array. eg: [ "variation1", "variation2", "variation3" ]
        - If data is found, summarize the key details in {format_instructions}.
      `);

      const pipe = prompt.pipe(llm).pipe(parser);
      const result = await pipe.invoke({ trending, language, writingStyle, platform, videoLength, numberOfVariations, trendingKeywords, content, format_instructions: parser.getFormatInstructions() });
      await user.updateOne({ $inc: { credits: -1 } })
      res.send(result)

    }catch(error){
      console.log(error)
      res.status(500).json(error)
    }
};


// Assume person A and person B having energetic, funny conversation for creating a viral video. 