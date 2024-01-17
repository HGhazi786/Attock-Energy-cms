import { NextRequest, NextResponse } from "next/server";
import { db, clientTable } from "@/lib/drizzle";
import { eq, and } from "drizzle-orm";
import { timeStamp } from "console";

export const GET = async (request:NextRequest,{ params }: { params: { id: string } }) => {
  try {
    const mid = Number(params.id);
    const res = await db
      .select()
      .from(clientTable)
      .where(eq(clientTable.user_id,mid));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email: item.email,
      contactdetails: item.contact_details,
      system_size: item.system_size,
      date_of_installation: item.date_of_installation,
    }));
    return NextResponse.json(Items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};
