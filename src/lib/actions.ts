import { db,complaintTable,clientTable } from "@/lib/drizzle";
import { eq,desc, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// User Action

export async function getUser() {
  try {
    const res = await db.select().from(clientTable);
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email: item.email,
      contactdetails: item.contact_details,
      system_size: item.system_size,
      date_of_installation: item.date_of_installation,
    }));
    revalidatePath('/')
    return Items;
  } catch (error) {
    console.log(error);
  }
}

export async function getNewestUser() {
  try {
    const res = await db.select().from(clientTable).orderBy(desc(clientTable.date_of_installation));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email: item.email,
      contactdetails: item.contact_details,
      system_size: item.system_size,
      date_of_installation: item.date_of_installation,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
}

export async function getOldestUser() {
  try {
    const res = await db
      .select()
      .from(clientTable)
      .orderBy(clientTable.date_of_installation);
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email: item.email,
      contactdetails: item.contact_details,
      system_size: item.system_size,
      date_of_installation: item.date_of_installation,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecificUser(mid:number) {
    const res = await db.select().from(clientTable).where(eq(clientTable.user_id, mid));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      username: item.username,
      email: item.email,
      contactdetails: item.contact_details,
      system_size: item.system_size,
      date_of_installation: item.date_of_installation,
    }));
    revalidatePath("/");
    return Items
};

// Complaint actions

export async function getComplaints() {
  try {
    const res = await db
      .select({
        user_id: clientTable.username,
        usrname: clientTable.user_id,
        complaint_id: complaintTable.complaint_id,
        title: complaintTable.title,
        description: complaintTable.description,
        action: complaintTable.action,
        status: complaintTable.status,
        payment_status: complaintTable.payment_status,
        invoice_required:clientTable.invoice_required
      })
      .from(complaintTable)
      .leftJoin(clientTable, eq(complaintTable.user_id, clientTable.user_id));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      usrname: item.usrname,
      complaint_id: item.complaint_id,
      title: item.title,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      invoice_required: item.invoice_required,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
};

export async function getSpecificComplaint(mid:number) {
    const res = await db
      .select()
      .from(complaintTable)
      .where(eq(complaintTable.user_id, mid));
    const Items = res.map((item: any) => ({
      complaint_id: item.complaint_id,
      username: item.user_id,
      title: item.title,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      creationdate: `${item.created_at?.getDate()}-${item.created_at?.getMonth()}-${item.created_at?.getFullYear()}`,
      creationtime: `${item.created_at?.getHours()}:${item.created_at?.getMinutes()}:${item.created_at?.getSeconds()}`,
      updationdate: `${item.updated_at?.getDate()}-${item.updated_at?.getMonth()}-${item.updated_at?.getFullYear()}`,
      updationtime: `${item.updated_at?.getHours()}:${item.updated_at?.getMinutes()}:${item.updated_at?.getSeconds()}`,
    }));
    revalidatePath("/");
    return Items;
};

export async function getOldestComplaints() {
  try {
    const res = await db
      .select({
        user_id: clientTable.username,
        usrname: clientTable.user_id,
        complaint_id: complaintTable.complaint_id,
        title: complaintTable.title,
        description: complaintTable.description,
        action: complaintTable.action,
        status: complaintTable.status,
        payment_status: complaintTable.payment_status,
        invoice_required: clientTable.invoice_required,
      })
      .from(complaintTable)
      .leftJoin(clientTable, eq(complaintTable.user_id, clientTable.user_id))
      .orderBy(clientTable.created_at);
    const Items = res.map((item) => ({
      user_id: item.user_id,
      complaint_id: item.complaint_id,
      title: item.title,
      usrname: item.usrname,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      invoice_required: item.invoice_required,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
};

export async function getNewestComplaints() {
  try {
    const res = await db
      .select({
        user_id: clientTable.username,
        usrname: clientTable.user_id,
        complaint_id: complaintTable.complaint_id,
        title: complaintTable.title,
        description: complaintTable.description,
        action: complaintTable.action,
        status: complaintTable.status,
        payment_status: complaintTable.payment_status,
        invoice_required: clientTable.invoice_required,
      })
      .from(complaintTable)
      .leftJoin(clientTable, eq(complaintTable.user_id, clientTable.user_id))
      .orderBy(desc(complaintTable.created_at));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      complaint_id: item.complaint_id,
      title: item.title,
      usrname: item.usrname,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      invoice_required: item.invoice_required,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
};

export async function getPending() {
  try {
    const res = await db
      .select({
        user_id: clientTable.username,
        complaint_id: complaintTable.complaint_id,
        title: complaintTable.title,
        usrname: clientTable.user_id,
        description: complaintTable.description,
        action: complaintTable.action,
        status: complaintTable.status,
        payment_status: complaintTable.payment_status,
        invoice_required: clientTable.invoice_required,
      })
      .from(complaintTable)
      .leftJoin(clientTable, eq(complaintTable.user_id, clientTable.user_id))
      .where(eq(complaintTable.status, false));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      complaint_id: item.complaint_id,
      usrname: item.usrname,
      title: item.title,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      invoice_required: item.invoice_required,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
};

export async function getResolved() {
  try {
    const res = await db
      .select({
        user_id: clientTable.username,
        complaint_id: complaintTable.complaint_id,
        title: complaintTable.title,
        usrname: clientTable.user_id,
        description: complaintTable.description,
        action: complaintTable.action,
        status: complaintTable.status,
        payment_status: complaintTable.payment_status,
        invoice_required: clientTable.invoice_required,
      })
      .from(complaintTable)
      .leftJoin(clientTable, eq(complaintTable.user_id, clientTable.user_id))
      .where(eq(complaintTable.status, true));
    const Items = res.map((item) => ({
      user_id: item.user_id,
      complaint_id: item.complaint_id,
      title: item.title,
      usrname: item.usrname,
      description: item.description,
      action: item.action,
      status: item.status,
      payment_status: item.payment_status,
      invoice_required: item.invoice_required,
    }));
    revalidatePath("/");
    return Items;
  } catch (error) {
    console.log(error);
  }
};

export async function getInsights() {
  try {const Complaints = await db.select({ totalComplaints: sql`COUNT(*)` }).from(complaintTable);
  const Pending = await db.select({ totalPending: sql`COUNT(*)` }).from(complaintTable).where(eq(complaintTable.status,false));
  const Payed = await db.select({ totalPayed: sql`COUNT(*)` }).from(clientTable).where(eq(clientTable.invoice_required,true));
  const Users = await db.select({ totalUsers: sql`COUNT(*)` }).from(clientTable);
  const Items = {
    Complaint:Number(Complaints[0].totalComplaints),
    Pending:Number(Pending[0].totalPending),
    Payed:Number(Payed[0].totalPayed),
    Users:Number(Users[0].totalUsers) 
  };
  revalidatePath("/");
   return Items;
  } catch (error) {
    console.log(error);
  }
}