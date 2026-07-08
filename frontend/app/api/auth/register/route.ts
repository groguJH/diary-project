import { NextResponse } from "next/server";

const backendApiUrl =
  process.env.BACKEND_API_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "http://localhost:8080";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${backendApiUrl}/api/auth/register`, {
    body: JSON.stringify(body),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  const contentType = response.headers.get("content-type");
  const responseBody = contentType?.includes("application/json")
    ? await response.json()
    : await response.text();

  return NextResponse.json(responseBody, { status: response.status });
}
