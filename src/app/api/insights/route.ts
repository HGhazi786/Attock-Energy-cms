import { NextRequest, NextResponse } from "next/server";
import { db, complaintTable,clientTable } from "@/lib/drizzle";
import { eq, and } from "drizzle-orm";

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(complaintTable)
      .values({
        user_id: req.user_id,
        title: req.title,
        description: req.description,
        status: false,
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
