import Topic from "@/models/topic";
import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle, newDescription } = await request.json(); // Assuming you have a JSON body with newTitle and newDescription

  try {
    await connectMongoDB();

    // Find the topic by ID and update the fields
    const updatedTopic = await Topic.findByIdAndUpdate(
      id,
      {
        title: newTitle,
        description: newDescription,
      },
      { new: true } // This option returns the updated document
    );

    if (!updatedTopic) {
      return NextResponse.json({ message: "Topic not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedTopic }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export async function GET(request, { params }) {
//   const { id } = params;
//   try {
//     await connectMongoDB();

//     const getTopic = await Topic.findById(id);

//     if (!getTopic) {
//       return NextResponse.json({ message: "Topic not found" }, { status: 404 });
//     }

//     return NextResponse.json({ getTopic }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   }
// }

export async function GET(request, { params }) {
  const { id } = params;
  await connectMongoDB();
  const topic = await Topic.findOne({ _id: id });
  return NextResponse.json({ topic }, { status: 200 });
}
