import { inngest } from "@/lib/inngest/client";

export async function GET() {
  await inngest.send({
    name: "generate-monthly-reports",
    data: {},
  });

  return Response.json({ triggered: true });
}
