import { NextResponse } from "next/server";
import { db } from "@/db/index";
import { tasksTable } from "@/db/schema";
import { decrypt } from "@/db";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = (await cookies()).get("session");
  if (!session) {
    return NextResponse.json(
      { error: "Session not found", success: false },
      { status: 400 }
    );
  }
  try {
    const username = (await decrypt(session.value)).username;
    const data = await db
      .select()
      .from(tasksTable)
      .where(eq(username, username));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = (await cookies()).get("session");
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const username = (await decrypt(session.value)).username;
    const task = await req.json();

    const newTask = await db
      .insert(tasksTable)
      .values({ ...task, username })
      .returning();
    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error, success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = (await cookies()).get("session");
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const username = (await decrypt(session.value)).username;
    const task = await req.json();
    const { id, ...t } = task;
    await db
      .update(tasksTable)
      .set({ ...t, username })
      .where(eq(tasksTable.id, id));
    return NextResponse.json(task);
  } catch (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error, success: false },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const session = (await cookies()).get("session");
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const username = (await decrypt(session.value)).username;
    const task = (
      await db
        .select({ username: tasksTable.username })
        .from(tasksTable)
        .where(eq(tasksTable.id, id))
    )[0];
    if (task.username !== username) {
      return NextResponse.json(
        { error: "User not authorized!", success: false },
        { status: 400 }
      );
    }
    await db.delete(tasksTable).where(eq(tasksTable.id, id));
    return NextResponse.json(id);
  } catch (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error, success: false },
      { status: 500 }
    );
  }
}
