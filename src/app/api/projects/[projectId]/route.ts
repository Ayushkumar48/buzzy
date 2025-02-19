import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/db";
import { db } from "@/db/index";
import { projectsTable, tasksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ projectId: number }> }
) {
  const session = (await cookies()).get("session")?.value;
  if (!session) {
    return NextResponse.json(
      { error: "Session not found", success: false },
      { status: 400 }
    );
  }

  const { projectId } = await params;
  console.log(projectId);
  if (isNaN(projectId)) {
    return NextResponse.json(
      { error: "Invalid project ID", success: false },
      { status: 400 }
    );
  }

  try {
    const { username } = await decrypt(session);
    const projects = await db
      .select()
      .from(projectsTable)
      .where(eq(projectsTable.id, projectId));

    if (!projects.length || projects[0].username !== username) {
      return NextResponse.json(
        { error: "User not authorized", success: false },
        { status: 403 }
      );
    }

    const tasks = await db
      .select()
      .from(tasksTable)
      .where(eq(tasksTable.projectId, projectId));

    return NextResponse.json({ tasks, project: projects[0] });
  } catch (error) {
    console.error("Error getting projects:", error);
    return NextResponse.json(
      {
        error: "Failed to get projects.",
        details: String(error),
        success: false,
      },
      { status: 500 }
    );
  }
}
