/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/index";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 hour")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormData) {
  const data = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, data.username))
    .execute();
  if (existingUser.length === 0) return { error: "User doesn't exist!" };

  const match = await bcrypt.compare(data.password, existingUser[0].password);
  if (!match) return { error: "Invalid credentials!" };
  const expires: Date = new Date(Date.now() + 7 * 60 * 60 * 1000);
  const session = await encrypt({ username: data.username, expires });
  (await cookies()).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  return { success: true };
}

export async function signup(formData: FormData) {
  const confirmpassword = formData.get("confirmpassword") as string;
  let data = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };
  if (data.firstname.length === 0 || data.lastname.length === 0) {
    return { error: "Name can't be empty!" };
  }
  if (data.username.length < 4) {
    return { error: "Username should be greater than 4 characters long!" };
  }
  if (data.password !== confirmpassword) {
    return { error: "Passwords do not match!" };
  }
  if (data.password.length < 8) {
    return { error: "Passwords must be 8 characters long!" };
  }
  const existingUser = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, data.username))
    .execute();
  if (existingUser.length > 0) {
    return { error: "Username already exists!" };
  }
  const hashedPassword: string = await bcrypt.hash(data.password, 10);
  data = { ...data, password: hashedPassword };
  await db.insert(usersTable).values(data);
  const expires: Date = new Date(Date.now() + 7 * 60 * 60 * 1000);
  const session = await encrypt({ username: data.username, expires });
  (await cookies()).set("session", session, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true };
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const url = request.url;
  if (url.includes("login") || url.includes("signup")) {
    if (session) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }
  if (url.includes("profile") || url.includes("dashboard")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const parsed = await decrypt(session);
      const currentTime = Date.now();
      if (parsed.expires < currentTime) {
        (await cookies()).set("session", "", { expires: new Date(0) });
        return NextResponse.redirect(new URL("/login", request.url));
      }
      parsed.expires = new Date(Date.now() + 7 * 60 * 60 * 1000);
      const res = NextResponse.next();
      res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
        secure: process.env.NODE_ENV === "production",
      });
      return res;
    } catch (error) {
      console.error("Error decrypting or updating session:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export async function getUsername() {
  const session = (await cookies()).get("session")?.value;
  if (session) {
    const u = (await decrypt(session)).username;
    return u;
  }
  return "Username";
}
export async function getUserData() {
  const session = (await cookies()).get("session")?.value;
  if (session) {
    const u = (await decrypt(session)).username;
    const userData = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, u))
      .execute();
    if (userData.length === 0) {
      return {
        username: "",
        firstname: "",
        lastname: "",
        password: "",
      };
    }
    return userData[0];
  }
  return {
    username: "",
    firstname: "",
    lastname: "",
    password: "",
  };
}

export async function updateProfile(data: {
  username: string;
  password?: string;
  firstname: string;
  lastname: string;
}) {
  try {
    const updateData: Partial<typeof usersTable.$inferInsert> = {
      firstname: data.firstname,
      lastname: data.lastname,
    };
    if (data.password && data.password.trim() !== "") {
      updateData.password = await bcrypt.hash(data.password, 10);
    }
    await db
      .update(usersTable)
      .set(updateData)
      .where(eq(usersTable.username, data.username));

    return { success: true, message: "Profile updated successfully." };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "An error occurred while updating profile.",
    };
  }
}
