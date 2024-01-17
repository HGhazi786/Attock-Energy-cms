import { NextRequest,NextResponse } from "next/server"
import { db,clientTable } from "@/lib/drizzle";
import {eq} from "drizzle-orm"


export const GET = async () => {
  try {
    const res = await db
      .select()
      .from(clientTable)
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email:item.email,
      contactdetails:item.contact_details,
      system_size: item.system_size,
      date_of_installation:item.date_of_installation,
    }));
    return NextResponse.json(Items);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      Message: (error as { message: string }).message,
    });
  }
};

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(clientTable)
      .values({
        username: req.username,
        email: req.email,
        contact_details: req.contact_details,
        system_size:req.system_size,
        invoice_required:req.invoice_required,
        date_of_installation:req.date_of_installation,
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const PUT = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .update(clientTable)
      .set({ username: req.username, email: req.email, system_size:req.system_size, date_of_installation:req.date_of_installation})
      .where(eq(clientTable.user_id, req.user_id))
      .returning();

    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};


