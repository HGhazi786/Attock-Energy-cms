import { NextRequest, NextResponse } from "next/server";
import { db, clientTable,complaintTable } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export const DELETE = async (request:NextRequest,{ params }: { params: { id: string } }) => {
  const mid=Number(params.id)
  try {
    const com = await db
      .delete(complaintTable)
      .where(eq(complaintTable.user_id, mid));
      
    const res = await db
      .delete(clientTable)
      .where(eq(clientTable.user_id, mid))
      .returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};
