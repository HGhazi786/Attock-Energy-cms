import { NextRequest, NextResponse } from "next/server";
import { db, proposalTable } from "@/lib/drizzle";

export const POST = async (request: NextRequest) => {
  const req = await request.json();

  try {
    const res = await db
      .insert(proposalTable)
      .values({
        refno: req.refno,
        name: req.name,
        address: req.address,
        city: req.city,
        phno: req.phno,
        panels: req.panels,
        pnlsize: req.pnlsize,
        sys_size: req.sys_size,
        inv_size: req.inv_size,
        pnl_brand: req.pnl_brand,
        inv_brand: req.inv_brand,
        aepl_charges: req.aepl_charges,
        sub_charges: req.sub_charges,
        discount: req.discount,
        cust_struct: req.cust_struct,
        warranty: req.warranty,
        tilt: req.tilt,
      })
      .returning();
    return NextResponse.json({ res });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Something went wrong" });
  }
};