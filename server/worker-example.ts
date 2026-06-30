// Cloudflare Worker example for future real AI backend.
// Do NOT put API keys in frontend. Store secrets in Cloudflare Worker environment variables.

export default {
  async fetch(request: Request, env: any) {
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders() });
    if (request.method !== 'POST') return Response.json({ error: 'POST only' }, { status: 405, headers: corsHeaders() });

    const { module, prompt, plan } = await request.json() as { module: string; prompt: string; plan: string };

    // Connect OpenAI/Gemini/Groq/Cloudflare AI here using env.API_KEY.
    const output = `ArcUnos backend received ${module} request for ${plan} plan: ${prompt}`;
    return Response.json({ output }, { headers: corsHeaders() });
  }
};

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
}
