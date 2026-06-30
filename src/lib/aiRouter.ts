import type { ModuleItem } from '../data/modules';

export function generateDemoResponse(module: ModuleItem, input: string): string {
  const goal = input.trim() || module.prompt;
  return `ArcUnos ${module.title} agent is ready.\n\nGoal: ${goal}\n\nPlan:\n1. Understand the exact requirement.\n2. Collect or read the provided data.\n3. Generate a structured result.\n4. Give clear next actions.\n\nNote: This is the safe V3 foundation. Real API keys can be connected through Cloudflare/Supabase in the next backend update.`;
}
