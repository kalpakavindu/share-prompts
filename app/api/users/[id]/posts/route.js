import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch the posts!", { status: 500 });
  }
}
