import { NextRequest, NextResponse } from "next/server";
import { db, complaintTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const req = Number(params.id);

  try {
    const res = await db
      .delete(complaintTable)
      .where(eq(complaintTable.complaint_id, req))
      .returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
