import { Briefcase, Code2, FileText, Globe2, GraduationCap, HeartPulse, Home, Image, Languages, PenLine, PieChart, Plane, Presentation, ReceiptText, Search, Settings, ShoppingBag, Sparkles, UserRound, WalletCards } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ModuleItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'ready' | 'demo' | 'soon';
  prompt: string;
};

export const modules: ModuleItem[] = [
  { id: 'website', title: 'Website Analyzer', description: 'Audit SEO, speed, security and accessibility.', icon: Globe2, status: 'demo', prompt: 'Analyze this website and give score, issues and fixes.' },
  { id: 'seo', title: 'SEO Audit', description: 'Find ranking gaps, keywords and content fixes.', icon: Search, status: 'demo', prompt: 'Create an SEO action plan for my website.' },
  { id: 'student', title: 'Student AI', description: 'Notes, assignments, quizzes and study plans.', icon: GraduationCap, status: 'demo', prompt: 'Make notes and exam plan from this topic.' },
  { id: 'business', title: 'Business AI', description: 'Plans, SWOT, market research and pitch decks.', icon: Briefcase, status: 'demo', prompt: 'Create a startup plan and growth strategy.' },
  { id: 'developer', title: 'Developer AI', description: 'Explain code, debug, optimize and deploy.', icon: Code2, status: 'demo', prompt: 'Debug this code and explain the fix.' },
  { id: 'shopping', title: 'Shopping AI', description: 'Compare products, prices and best deals.', icon: ShoppingBag, status: 'demo', prompt: 'Compare products and choose the best value.' },
  { id: 'creator', title: 'Creator AI', description: 'Content, scripts, reels, captions and videos.', icon: Image, status: 'demo', prompt: 'Create content ideas and a posting plan.' },
  { id: 'designer', title: 'Designer AI', description: 'UI, UX, brand colors, logos and graphics.', icon: Sparkles, status: 'demo', prompt: 'Create a modern design direction.' },
  { id: 'household', title: 'Household AI', description: 'Meal plans, lists, routines and home organization.', icon: Home, status: 'demo', prompt: 'Create a household plan and shopping list.' },
  { id: 'finance', title: 'Finance AI', description: 'Budget, expenses, savings and investment planning.', icon: PieChart, status: 'demo', prompt: 'Make a simple monthly budget.' },
  { id: 'health', title: 'Health AI', description: 'Fitness, diet, wellness and habit planning.', icon: HeartPulse, status: 'demo', prompt: 'Create a safe fitness and diet routine.' },
  { id: 'legal', title: 'Legal Helper', description: 'Summarize documents and explain legal terms.', icon: ReceiptText, status: 'demo', prompt: 'Summarize this legal document in simple words.' },
  { id: 'travel', title: 'Travel AI', description: 'Plan trips, budgets, routes and itineraries.', icon: Plane, status: 'demo', prompt: 'Plan a budget trip itinerary.' },
  { id: 'resume', title: 'Resume Builder', description: 'Create ATS-friendly resumes and cover letters.', icon: UserRound, status: 'demo', prompt: 'Improve this resume for ATS.' },
  { id: 'pdf', title: 'PDF Tools', description: 'Summarize, extract, convert and analyze PDFs.', icon: FileText, status: 'demo', prompt: 'Summarize this PDF and extract action points.' },
  { id: 'presentation', title: 'Presentation Maker', description: 'Generate slide outlines and pitch decks.', icon: Presentation, status: 'demo', prompt: 'Create a presentation outline.' },
  { id: 'writer', title: 'AI Writer', description: 'Blogs, emails, captions, scripts and documents.', icon: PenLine, status: 'demo', prompt: 'Write a professional document for me.' },
  { id: 'translator', title: 'Translator', description: 'Translate, rewrite and simplify any text.', icon: Languages, status: 'demo', prompt: 'Translate and improve this text.' },
  { id: 'payments', title: 'Subscriptions', description: 'Pricing, plan limits and payment setup.', icon: WalletCards, status: 'soon', prompt: 'Set up pricing and subscription logic.' },
  { id: 'settings', title: 'App Settings', description: 'Profile, notifications, theme and workspace settings.', icon: Settings, status: 'demo', prompt: 'Open settings and update my workspace.' }
];
