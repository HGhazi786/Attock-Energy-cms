import { NextRequest, NextResponse } from "next/server";
import { db, clientTable, complaintTable } from "@/lib/drizzle";
import { eq, and } from "drizzle-orm";
import { timeStamp } from "console";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const mid = Number(params.id);
    const res = await db
      .select()
      .from(complaintTable)
      .where(eq(complaintTable.user_id, mid));
    const Items = res.map((item: any) => ({
      _id: item.complaint_id,
      username: item.user_id,
      title: item.title,
      description: item.description,
      action: item.action,
      status: item.status,
      creationdate: `${item.created_at?.getDate()}-${item.created_at?.getMonth()}-${item.created_at?.getFullYear()}`,
      creationtime: `${item.created_at?.getHours()}:${item.created_at?.getMinutes()}:${item.created_at?.getSeconds()}`,
      updationdate: `${item.updated_at?.getDate()}-${item.updated_at?.getMonth()}-${item.updated_at?.getFullYear()}`,
      updationtime: `${item.updated_at?.getHours()}:${item.updated_at?.getMinutes()}:${item.updated_at?.getSeconds()}`,
    }));
    return NextResponse.json(Items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
