import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

export async function POST(req) {
  const { query } = await req.json();
  try {
    await connectDB();

    const prompts = await Prompt.find().populate("creator");

    let filteredPrompts;
    if (query && query !== "") {
      if (query[0] === "#") {
        filteredPrompts = prompts.filter((prompt) =>
          prompt.tag.toLowerCase().includes(query.toLowerCase())
        );
      } else {
        filteredPrompts = prompts.filter((prompt) =>
          prompt.creator.username.toLowerCase().includes(query.toLowerCase())
        );
      }
    } else {
      filteredPrompts = prompts;
    }

    return new Response(JSON.stringify(filteredPrompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch posts!", { status: 500 });
  }
}
