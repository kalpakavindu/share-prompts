import { connectDB } from "@utils/database";
import Prompt from "@models/Prompt";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) {
      return new Response("Prompt not found!", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch the post!", { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();
  try {
    await connectDB();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found!", { status: 404 });
    }
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (err) {
    return new Response("Failed to update the post!", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const deletedPrompt = await Prompt.findByIdAndDelete(params.id);
    if (!deletedPrompt) {
      return new Response("Prompt not found!", { status: 404 });
    }
    return new Response("Prompt deleted!", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete the post!", { status: 500 });
  }
}
