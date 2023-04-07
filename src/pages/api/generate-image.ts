import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function generateImage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const inputValue = req.body.prompt as string;
  const numberOfImagesToBeGenerated = req.body.n as number;

  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI key not configured!",
      },
    });
    return;
  }
  try {
    let imageUrl = [""];
    const response = await openai.createImage({
      prompt: inputValue,
      n: numberOfImagesToBeGenerated,
      size: "512x512",
    });

    imageUrl = response.data.data.map((image) => image.url as string);
    res.status(200).json({ success: imageUrl });
  } catch (error: any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}
