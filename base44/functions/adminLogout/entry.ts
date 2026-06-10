// Secret admin — logout. Deletes the server-side session record for the submitted
// token, so the token becomes worthless everywhere (not just in the browser that
// discarded it).
//
// No ../_shared imports — helpers inlined (Base44 cannot resolve local cross-file
// imports; using them deploys the function silently broken / 404 deploymentNotFound).

import { createClientFromRequest } from "npm:@base44/sdk";

const enc = new TextEncoder();

function toHex(bytes: ArrayBuffer | Uint8Array): string {
  return Array.from(bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sha256Hex(value: string): Promise<string> {
  return toHex(await crypto.subtle.digest("SHA-256", enc.encode(value)));
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  let token: unknown = "";
  try {
    const body = await req.json();
    token = body?.token;
  } catch {
    // no/invalid body → nothing to delete
  }

  if (typeof token === "string" && token.length >= 32) {
    try {
      const base44 = createClientFromRequest(req);
      const matches = await base44.asServiceRole.entities.admin_session.filter({
        token_hash: await sha256Hex(token),
      });
      for (const session of matches ?? []) {
        await base44.asServiceRole.entities.admin_session.delete(session.id);
      }
    } catch {
      /* best effort — the client already discarded its token */
    }
  }

  return Response.json({ success: true }, { status: 200 });
});
