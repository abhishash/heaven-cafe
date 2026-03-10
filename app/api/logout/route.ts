import { authOptions } from "@/auth";
import { isObject } from "@/lib/type-guards";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (isObject(session?.user)) {
    // Call PHP API logout endpoint
    await fetch(`${process.env.API_ENDPOINT}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
      },
    });
  }

  return NextResponse.json({ success: true });
}