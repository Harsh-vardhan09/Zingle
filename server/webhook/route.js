import { inngest } from "@/lib/inngest";

export async function POST(req) {
  const body = await req.json();

  console.log("CLERK EVENT:", body.type);

  await inngest.send({
    name: body.type, // user.created, user.updated
    data: body.data,
  });

  return new Response("OK", { status: 200 });
}