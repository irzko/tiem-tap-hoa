import Ably from "ably/promises";

export async function GET(request: Request) {
  const client = new Ably.Realtime(process.env.ABLY_API_KEY as string);
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: "ably-nextjs-demo",
  });
  return Response.json(tokenRequestData);
}
