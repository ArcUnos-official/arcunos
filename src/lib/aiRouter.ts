import type { ModuleKey } from '../data/modules';

type AIRequest = { module: ModuleKey; prompt: string; plan: 'free' | 'pro' };

const endpoint = import.meta.env.VITE_AI_API_ENDPOINT;

const templates: Record<string, (prompt: string) => string> = {
  assistant: p => `ArcUnos Assistant\n\nTask understood: ${p}\n\nRecommended action plan:\n1. Identify the exact goal.\n2. Break it into steps.\n3. Generate a clean final output.\n4. Save this in your ArcUnos workspace.`,
  website: p => `Website Intelligence Report for: ${p}\n\nSEO: Add stronger title/meta, H1 structure, internal links and schema.\nPerformance: Compress images, lazy-load heavy assets, reduce JavaScript.\nSecurity: Enforce HTTPS, security headers, safe forms and rate limits.\nAccessibility: Improve contrast, alt text, keyboard navigation and labels.\nPriority: Fix mobile speed and clear CTA first.`,
  student: p => `Student AI Output\n\nTopic: ${p}\n\nStudy plan:\n- Understand fundamentals first.\n- Make short notes.\n- Practice 10 questions.\n- Revise weak areas.\n\nExam-ready summary and flashcards can be generated next.`,
  developer: p => `Developer AI Review\n\nRequest: ${p}\n\nProfessional approach:\n- Use TypeScript types.\n- Separate UI, API and data layers.\n- Add error handling and loading states.\n- Keep secrets on backend only.\n- Write reusable components and tests later.`,
  business: p => `Business AI Plan\n\nIdea: ${p}\n\nSections:\n1. Problem\n2. Target users\n3. Solution\n4. Revenue model\n5. MVP features\n6. Marketing channels\n7. Risks and next steps`,
  designer: p => `Designer AI Direction\n\nBrief: ${p}\n\nUse a premium dark interface with soft glass cards, gold highlights, high spacing, clear icons and one strong CTA. Keep ArcUnos futuristic but human, not overdecorated.`,
  creator: p => `Creator AI Draft\n\nTopic: ${p}\n\nHook: Start with a sharp pain point.\nBody: Show transformation.\nCTA: Ask the viewer to try ArcUnos or save the post.`,
  seo: p => `SEO AI Output\n\nKeyword/topic: ${p}\n\nSuggested title, meta description, H2 structure, FAQ block, semantic keywords and internal linking plan should be created for this topic.`,
  sales: p => `Sales AI Script\n\nLead context: ${p}\n\nOpen with problem, show value, ask a discovery question, handle objections, close with a clear next step.`,
  finance: p => `Finance AI Plan\n\nGoal: ${p}\n\nTrack income, fixed expenses, variable expenses, emergency fund, savings target and monthly review.`,
  health: p => `Health & Fitness AI Plan\n\nGoal: ${p}\n\nCreate workout split, meals, recovery, hydration and weekly progress tracking. This is general guidance, not medical advice.`,
  shopping: p => `Shopping AI Comparison\n\nProduct: ${p}\n\nCompare price, warranty, reviews, specs, long-term value and red flags before buying.`,
  legal: p => `Legal AI Explanation\n\nDocument/topic: ${p}\n\nSummarize clauses in plain language and flag confusing parts. This is informational, not legal advice.`,
  government: p => `Government Services AI\n\nRequirement: ${p}\n\nChecklist: identity proof, address proof, forms, eligibility, fee, timeline and submission steps.`,
  travel: p => `Travel AI Plan\n\nDestination/goal: ${p}\n\nCreate day-wise plan, budget, transport, stays, food, packing list and safety notes.`
};

export async function runArcAI({ module, prompt, plan }: AIRequest): Promise<string> {
  if (!prompt.trim()) return 'Please enter a clear task for ArcUnos AI.';
  if (endpoint) {
    const res = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ module, prompt, plan }) });
    if (!res.ok) throw new Error('AI backend failed. Check API endpoint.');
    const data = await res.json();
    return data.output || data.message || 'No output returned.';
  }
  await new Promise(r => setTimeout(r, 700));
  return templates[module]?.(prompt) || templates.assistant(prompt);
}
