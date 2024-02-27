import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

export const POST = async (req) => {
  const { user_id, prompt, tag } = await req.json();

  try {
    await connectDB();
    const newPrompt = new Prompt({
      creator: user_id,
      tag,
      prompt,
    });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    return new Response("Something went wrong!", { status: 500 });
  }
};
