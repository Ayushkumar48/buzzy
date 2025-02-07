import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/db";
import { db } from "@/db/index";
import { projectsTable, tasksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return NextResponse.json(
      { error: "Session not found", success: false },
      { status: 400 }
    );
  }
  try {
    const username = await decrypt(session);
    const projects = await db
      .select()
      .from(projectsTable)
      .where(eq(username, username));
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);
    return NextResponse.json(
      { error: "Failed to get projects.", details: error, success: false },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const session = (await cookies()).get("session")?.value;
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const username = (await decrypt(session)).username;
    const project = await req.json();
    const addedProject = await db
      .insert(projectsTable)
      .values({ ...project, username })
      .returning();
    return NextResponse.json(addedProject);
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Failed to add project.", details: error, success: false },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = (await cookies()).get("session")?.value;
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const { username } = await decrypt(session);
    const project = await req.json();
    const { id, ...p } = project;
    await db
      .update(projectsTable)
      .set({ ...p, username })
      .where(eq(projectsTable.id, id));
    return NextResponse.json(project);
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
    const session = (await cookies()).get("session")?.value;
    if (!session) {
      return NextResponse.json(
        { error: "Session not found", success: false },
        { status: 400 }
      );
    }
    const { username } = await decrypt(session);
    const project = (
      await db
        .select({ username: projectsTable.username })
        .from(projectsTable)
        .where(eq(projectsTable.id, id))
    )[0];
    if (project.username !== username) {
      return NextResponse.json(
        { error: "User not authorized!", success: false },
        { status: 400 }
      );
    }
    await db.delete(tasksTable).where(eq(tasksTable.projectId, id));
    await db.delete(projectsTable).where(eq(projectsTable.id, id));
    return NextResponse.json(id);
  } catch (error) {
    console.error("Error inserting task:", error);
    return NextResponse.json(
      { error: "Failed to create task", details: error, success: false },
      { status: 500 }
    );
  }
}
