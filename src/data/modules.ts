import { Brain, Briefcase, Code2, GraduationCap, HeartPulse, Image, Landmark, LineChart, Plane, Search, ShieldCheck, ShoppingBag, Sparkles, Users, WalletCards } from 'lucide-react';

export type ModuleKey =
  | 'assistant' | 'website' | 'student' | 'developer' | 'business' | 'designer' | 'creator'
  | 'seo' | 'sales' | 'finance' | 'health' | 'shopping' | 'legal' | 'government' | 'travel';

export type ArcModule = {
  key: ModuleKey;
  title: string;
  subtitle: string;
  free: string[];
  pro: string[];
  icon: any;
};

export const modules: ArcModule[] = [
  { key: 'assistant', title: 'Arc AI Assistant', subtitle: 'Central AI router for every task.', icon: Sparkles, free: ['Daily chat', 'Writing help', 'Idea generator'], pro: ['Advanced routing', 'Long memory', 'Priority models'] },
  { key: 'website', title: 'Website Intelligence', subtitle: 'SEO, performance, security and accessibility audits.', icon: ShieldCheck, free: ['Basic audit', 'SEO score', 'Mobile check'], pro: ['Deep crawler', 'Security scan', 'PDF report'] },
  { key: 'student', title: 'Student AI', subtitle: 'Study, resume, interview and assignment assistant.', icon: GraduationCap, free: ['Study plan', 'Resume draft', 'Quiz maker'], pro: ['PDF notes', 'Mind maps', 'Research assistant'] },
  { key: 'developer', title: 'Developer AI', subtitle: 'Code, debug, refactor and document faster.', icon: Code2, free: ['Code helper', 'Bug explainer', 'Docs generator'], pro: ['Project builder', 'Code review', 'Architecture'] },
  { key: 'business', title: 'Business AI', subtitle: 'Planning, reporting, proposals and insights.', icon: Briefcase, free: ['SWOT', 'Business plan', 'Email writer'], pro: ['Pitch deck', 'Market research', 'Dashboards'] },
  { key: 'designer', title: 'Designer AI', subtitle: 'Brand, UI, colors, layouts and creative ideas.', icon: Image, free: ['Logo ideas', 'Color palette', 'Wireframe text'], pro: ['Brand kit', 'Landing UI', 'Image generation'] },
  { key: 'creator', title: 'Creator AI', subtitle: 'Scripts, captions, thumbnails and calendars.', icon: Brain, free: ['Captions', 'Hashtags', 'Script outline'], pro: ['Content calendar', 'YouTube SEO', 'Brand analysis'] },
  { key: 'seo', title: 'SEO AI', subtitle: 'Keywords, blogs, optimization and growth.', icon: Search, free: ['Keywords', 'Meta titles', 'Blog outline'], pro: ['Competitor tracking', 'Rank reports', 'Content optimizer'] },
  { key: 'sales', title: 'Sales AI', subtitle: 'Lead scripts, CRM suggestions and emails.', icon: Users, free: ['Sales email', 'Cold script', 'Objection answers'], pro: ['Pipeline analysis', 'Forecasting', 'CRM automation'] },
  { key: 'finance', title: 'Finance AI', subtitle: 'Budgets, summaries and financial planning.', icon: WalletCards, free: ['Budget plan', 'Expense categories', 'Saving tips'], pro: ['Forecasting', 'Reports', 'Tax planner'] },
  { key: 'health', title: 'Health & Fitness AI', subtitle: 'Workout, meals and habit planning.', icon: HeartPulse, free: ['Workout plan', 'Meal idea', 'Habit tracker'], pro: ['Personal plan', 'Progress analytics', 'Nutrition tracker'] },
  { key: 'shopping', title: 'Shopping AI', subtitle: 'Compare products, specs and reviews.', icon: ShoppingBag, free: ['Compare specs', 'Review summary', 'Best value'], pro: ['Price history', 'Deal alerts', 'Buying assistant'] },
  { key: 'legal', title: 'Legal AI', subtitle: 'Simple document explanation and draft help.', icon: Landmark, free: ['Document summary', 'Clause meaning', 'Template draft'], pro: ['Contract review', 'Clause comparison', 'Compliance notes'] },
  { key: 'government', title: 'Government Services AI', subtitle: 'Forms, schemes and document checklists.', icon: Landmark, free: ['Form guide', 'Checklist', 'Scheme finder'], pro: ['Application assistant', 'Document review', 'Deadline tracking'] },
  { key: 'travel', title: 'Travel AI', subtitle: 'Itineraries, budgets and trip planning.', icon: Plane, free: ['Itinerary', 'Packing list', 'Budget estimate'], pro: ['Smart planner', 'Live alerts', 'Group trips'] }
];
