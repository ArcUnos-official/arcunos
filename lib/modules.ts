export interface Tool {
  name: string;
  tier: 'FREE' | 'PRO';
  placeholder: string;
  description: string;
}

export interface Module {
  id: string;
  name: string;
  short: string;
  icon: string;
  desc: string;
  tools: Tool[];
}

export const appModules: Module[] = [
  {
    id: 'general',
    name: 'General AI',
    short: 'General',
    icon: '✨',
    desc: 'Universal assistant for daily work',
    tools: [
      { name: 'Ask anything', tier: 'FREE', placeholder: 'Enter details for ask anything', description: 'AI-ready workflow for ask anything.' },
      { name: 'Improve writing', tier: 'FREE', placeholder: 'Enter details for improve writing', description: 'AI-ready workflow for improve writing.' },
      { name: 'Deep reasoning brief', tier: 'PRO', placeholder: 'Enter details for deep reasoning brief', description: 'AI-ready workflow for deep reasoning brief.' },
      { name: 'Multi-step agent plan', tier: 'PRO', placeholder: 'Enter details for multi-step agent plan', description: 'AI-ready workflow for multi-step agent plan.' },
    ]
  },
  {
    id: 'website',
    name: 'Website Analyzer',
    short: 'Website',
    icon: '🌐',
    desc: 'Analyze, build and improve websites',
    tools: [
      { name: 'Website audit overview', tier: 'FREE', placeholder: 'Enter details for website audit overview', description: 'AI-ready workflow for website audit overview.' },
      { name: 'SEO score check', tier: 'FREE', placeholder: 'Enter details for seo score check', description: 'AI-ready workflow for seo score check.' },
      { name: 'Heading and metadata check', tier: 'FREE', placeholder: 'Enter details for heading and metadata check', description: 'AI-ready workflow for heading and metadata check.' },
      { name: 'Broken link checklist', tier: 'FREE', placeholder: 'Enter details for broken link checklist', description: 'AI-ready workflow for broken link checklist.' },
      { name: 'Competitor comparison', tier: 'PRO', placeholder: 'Enter details for competitor comparison', description: 'AI-ready workflow for competitor comparison.' },
      { name: 'AI auto-fix generator', tier: 'PRO', placeholder: 'Enter details for ai auto-fix generator', description: 'AI-ready workflow for ai auto-fix generator.' },
      { name: 'Download audit report', tier: 'PRO', placeholder: 'Enter details for download audit report', description: 'AI-ready workflow for download audit report.' },
    ]
  },
  {
    id: 'seo',
    name: 'SEO Tools',
    short: 'SEO',
    icon: '📈',
    desc: 'Rank better with SEO workflows',
    tools: [
      { name: 'Meta title generator', tier: 'FREE', placeholder: 'Enter details for meta title generator', description: 'AI-ready workflow for meta title generator.' },
      { name: 'Meta description generator', tier: 'FREE', placeholder: 'Enter details for meta description generator', description: 'AI-ready workflow for meta description generator.' },
      { name: 'Keyword ideas', tier: 'FREE', placeholder: 'Enter details for keyword ideas', description: 'AI-ready workflow for keyword ideas.' },
      { name: 'Blog outline', tier: 'FREE', placeholder: 'Enter details for blog outline', description: 'AI-ready workflow for blog outline.' },
      { name: 'Competitor content gap', tier: 'PRO', placeholder: 'Enter details for competitor content gap', description: 'AI-ready workflow for competitor content gap.' },
      { name: 'Full SEO content brief', tier: 'PRO', placeholder: 'Enter details for full seo content brief', description: 'AI-ready workflow for full seo content brief.' },
      { name: 'Schema markup generator', tier: 'PRO', placeholder: 'Enter details for schema markup generator', description: 'AI-ready workflow for schema markup generator.' },
    ]
  },
  {
    id: 'student',
    name: 'Student Assistant',
    short: 'Student',
    icon: '🎓',
    desc: 'Study, learn and prepare faster',
    tools: [
      { name: 'Generate notes', tier: 'FREE', placeholder: 'Enter details for generate notes', description: 'AI-ready workflow for generate notes.' },
      { name: 'Quiz generator', tier: 'FREE', placeholder: 'Enter details for quiz generator', description: 'AI-ready workflow for quiz generator.' },
      { name: 'Explain topic simply', tier: 'FREE', placeholder: 'Enter details for explain topic simply', description: 'AI-ready workflow for explain topic simply.' },
      { name: 'Assignment helper', tier: 'FREE', placeholder: 'Enter details for assignment helper', description: 'AI-ready workflow for assignment helper.' },
      { name: 'Exam planner', tier: 'PRO', placeholder: 'Enter details for exam planner', description: 'AI-ready workflow for exam planner.' },
      { name: 'Flashcard set creator', tier: 'PRO', placeholder: 'Enter details for flashcard set creator', description: 'AI-ready workflow for flashcard set creator.' },
      { name: 'Research paper helper', tier: 'PRO', placeholder: 'Enter details for research paper helper', description: 'AI-ready workflow for research paper helper.' },
    ]
  },
  {
    id: 'teacher',
    name: 'Teacher Assistant',
    short: 'Teacher',
    icon: '🧑‍🏫',
    desc: 'Lesson plans, quizzes and teaching aids',
    tools: [
      { name: 'Lesson plan', tier: 'FREE', placeholder: 'Enter details for lesson plan', description: 'AI-ready workflow for lesson plan.' },
      { name: 'Worksheet creator', tier: 'FREE', placeholder: 'Enter details for worksheet creator', description: 'AI-ready workflow for worksheet creator.' },
      { name: 'Quiz questions', tier: 'FREE', placeholder: 'Enter details for quiz questions', description: 'AI-ready workflow for quiz questions.' },
      { name: 'Rubric generator', tier: 'PRO', placeholder: 'Enter details for rubric generator', description: 'AI-ready workflow for rubric generator.' },
      { name: 'Personalized learning plan', tier: 'PRO', placeholder: 'Enter details for personalized learning plan', description: 'AI-ready workflow for personalized learning plan.' },
    ]
  },
  {
    id: 'developer',
    name: 'Developer Assistant',
    short: 'Developer',
    icon: '💻',
    desc: 'Code, debug and ship faster',
    tools: [
      { name: 'Generate code', tier: 'FREE', placeholder: 'Enter details for generate code', description: 'AI-ready workflow for generate code.' },
      { name: 'Debug code', tier: 'FREE', placeholder: 'Enter details for debug code', description: 'AI-ready workflow for debug code.' },
      { name: 'Explain code', tier: 'FREE', placeholder: 'Enter details for explain code', description: 'AI-ready workflow for explain code.' },
      { name: 'API route builder', tier: 'FREE', placeholder: 'Enter details for api route builder', description: 'AI-ready workflow for api route builder.' },
      { name: 'Repository analysis', tier: 'PRO', placeholder: 'Enter details for repository analysis', description: 'AI-ready workflow for repository analysis.' },
      { name: 'Multi-file refactor plan', tier: 'PRO', placeholder: 'Enter details for multi-file refactor plan', description: 'AI-ready workflow for multi-file refactor plan.' },
      { name: 'Deployment assistant', tier: 'PRO', placeholder: 'Enter details for deployment assistant', description: 'AI-ready workflow for deployment assistant.' },
    ]
  },
  {
    id: 'business',
    name: 'Business Assistant',
    short: 'Business',
    icon: '💼',
    desc: 'Plan, analyze and grow',
    tools: [
      { name: 'Business plan generator', tier: 'FREE', placeholder: 'Enter details for business plan generator', description: 'AI-ready workflow for business plan generator.' },
      { name: 'SWOT analysis', tier: 'FREE', placeholder: 'Enter details for swot analysis', description: 'AI-ready workflow for swot analysis.' },
      { name: 'Customer persona', tier: 'FREE', placeholder: 'Enter details for customer persona', description: 'AI-ready workflow for customer persona.' },
      { name: 'Pitch deck outline', tier: 'PRO', placeholder: 'Enter details for pitch deck outline', description: 'AI-ready workflow for pitch deck outline.' },
      { name: 'Go-to-market strategy', tier: 'PRO', placeholder: 'Enter details for go-to-market strategy', description: 'AI-ready workflow for go-to-market strategy.' },
      { name: 'Investor Q&A prep', tier: 'PRO', placeholder: 'Enter details for investor q&a prep', description: 'AI-ready workflow for investor q&a prep.' },
    ]
  },
  {
    id: 'finance',
    name: 'Finance Assistant',
    short: 'Finance',
    icon: '💰',
    desc: 'Budgets, summaries and projections',
    tools: [
      { name: 'Budget planner', tier: 'FREE', placeholder: 'Enter details for budget planner', description: 'AI-ready workflow for budget planner.' },
      { name: 'Expense summary', tier: 'FREE', placeholder: 'Enter details for expense summary', description: 'AI-ready workflow for expense summary.' },
      { name: 'Simple projection', tier: 'FREE', placeholder: 'Enter details for simple projection', description: 'AI-ready workflow for simple projection.' },
      { name: 'Investment research brief', tier: 'PRO', placeholder: 'Enter details for investment research brief', description: 'AI-ready workflow for investment research brief.' },
      { name: 'Financial dashboard plan', tier: 'PRO', placeholder: 'Enter details for financial dashboard plan', description: 'AI-ready workflow for financial dashboard plan.' },
    ]
  },
  {
    id: 'household',
    name: 'Household Assistant',
    short: 'Household',
    icon: '🏠',
    desc: 'Home planning and daily life help',
    tools: [
      { name: 'Meal plan', tier: 'FREE', placeholder: 'Enter details for meal plan', description: 'AI-ready workflow for meal plan.' },
      { name: 'Cleaning checklist', tier: 'FREE', placeholder: 'Enter details for cleaning checklist', description: 'AI-ready workflow for cleaning checklist.' },
      { name: 'Budget grocery list', tier: 'FREE', placeholder: 'Enter details for budget grocery list', description: 'AI-ready workflow for budget grocery list.' },
      { name: 'Monthly home system', tier: 'PRO', placeholder: 'Enter details for monthly home system', description: 'AI-ready workflow for monthly home system.' },
      { name: 'Smart automation plan', tier: 'PRO', placeholder: 'Enter details for smart automation plan', description: 'AI-ready workflow for smart automation plan.' },
    ]
  },
  {
    id: 'shopping',
    name: 'Shopping Assistant',
    short: 'Shopping',
    icon: '🛒',
    desc: 'Compare and choose products',
    tools: [
      { name: 'Product comparison', tier: 'FREE', placeholder: 'Enter details for product comparison', description: 'AI-ready workflow for product comparison.' },
      { name: 'Buying checklist', tier: 'FREE', placeholder: 'Enter details for buying checklist', description: 'AI-ready workflow for buying checklist.' },
      { name: 'Review summarizer', tier: 'FREE', placeholder: 'Enter details for review summarizer', description: 'AI-ready workflow for review summarizer.' },
      { name: 'Deal tracking plan', tier: 'PRO', placeholder: 'Enter details for deal tracking plan', description: 'AI-ready workflow for deal tracking plan.' },
      { name: 'Premium recommendation matrix', tier: 'PRO', placeholder: 'Enter details for premium recommendation matrix', description: 'AI-ready workflow for premium recommendation matrix.' },
    ]
  },
  {
    id: 'sales-crm',
    name: 'Sales/CRM Assistant',
    short: 'Sales CRM',
    icon: '📞',
    desc: 'Leads, scripts and CRM workflows',
    tools: [
      { name: 'Cold email', tier: 'FREE', placeholder: 'Enter details for cold email', description: 'AI-ready workflow for cold email.' },
      { name: 'Sales call script', tier: 'FREE', placeholder: 'Enter details for sales call script', description: 'AI-ready workflow for sales call script.' },
      { name: 'Lead qualification checklist', tier: 'FREE', placeholder: 'Enter details for lead qualification checklist', description: 'AI-ready workflow for lead qualification checklist.' },
      { name: 'Pipeline strategy', tier: 'PRO', placeholder: 'Enter details for pipeline strategy', description: 'AI-ready workflow for pipeline strategy.' },
      { name: 'Follow-up sequence', tier: 'PRO', placeholder: 'Enter details for follow-up sequence', description: 'AI-ready workflow for follow-up sequence.' },
      { name: 'AI sales coach', tier: 'PRO', placeholder: 'Enter details for ai sales coach', description: 'AI-ready workflow for ai sales coach.' },
    ]
  },
  {
    id: 'designer',
    name: 'Designer Assistant',
    short: 'Designer',
    icon: '🎨',
    desc: 'Design ideas and brand systems',
    tools: [
      { name: 'Color palette', tier: 'FREE', placeholder: 'Enter details for color palette', description: 'AI-ready workflow for color palette.' },
      { name: 'Logo concept prompt', tier: 'FREE', placeholder: 'Enter details for logo concept prompt', description: 'AI-ready workflow for logo concept prompt.' },
      { name: 'UI section copy', tier: 'FREE', placeholder: 'Enter details for ui section copy', description: 'AI-ready workflow for ui section copy.' },
      { name: 'Design system plan', tier: 'PRO', placeholder: 'Enter details for design system plan', description: 'AI-ready workflow for design system plan.' },
      { name: 'Brand guideline generator', tier: 'PRO', placeholder: 'Enter details for brand guideline generator', description: 'AI-ready workflow for brand guideline generator.' },
    ]
  },
  {
    id: 'creator',
    name: 'Creator Assistant',
    short: 'Creator',
    icon: '🎬',
    desc: 'Content ideas and creator workflows',
    tools: [
      { name: 'Content ideas', tier: 'FREE', placeholder: 'Enter details for content ideas', description: 'AI-ready workflow for content ideas.' },
      { name: 'Caption generator', tier: 'FREE', placeholder: 'Enter details for caption generator', description: 'AI-ready workflow for caption generator.' },
      { name: 'YouTube script outline', tier: 'FREE', placeholder: 'Enter details for youtube script outline', description: 'AI-ready workflow for youtube script outline.' },
      { name: '30-day content calendar', tier: 'PRO', placeholder: 'Enter details for 30-day content calendar', description: 'AI-ready workflow for 30-day content calendar.' },
      { name: 'Viral hook analysis', tier: 'PRO', placeholder: 'Enter details for viral hook analysis', description: 'AI-ready workflow for viral hook analysis.' },
    ]
  },
  {
    id: 'health',
    name: 'Health Assistant',
    short: 'Health',
    icon: '🩺',
    desc: 'General wellness information',
    tools: [
      { name: 'Habit plan', tier: 'FREE', placeholder: 'Enter details for habit plan', description: 'AI-ready workflow for habit plan.' },
      { name: 'Workout plan', tier: 'FREE', placeholder: 'Enter details for workout plan', description: 'AI-ready workflow for workout plan.' },
      { name: 'Nutrition checklist', tier: 'FREE', placeholder: 'Enter details for nutrition checklist', description: 'AI-ready workflow for nutrition checklist.' },
      { name: 'Routine optimizer', tier: 'PRO', placeholder: 'Enter details for routine optimizer', description: 'AI-ready workflow for routine optimizer.' },
      { name: 'Progress tracker plan', tier: 'PRO', placeholder: 'Enter details for progress tracker plan', description: 'AI-ready workflow for progress tracker plan.' },
    ]
  },
  {
    id: 'legal',
    name: 'Legal Assistant',
    short: 'Legal',
    icon: '⚖️',
    desc: 'General legal information and document help',
    tools: [
      { name: 'Explain legal text', tier: 'FREE', placeholder: 'Enter details for explain legal text', description: 'AI-ready workflow for explain legal text.' },
      { name: 'Simple agreement outline', tier: 'FREE', placeholder: 'Enter details for simple agreement outline', description: 'AI-ready workflow for simple agreement outline.' },
      { name: 'Rights checklist', tier: 'FREE', placeholder: 'Enter details for rights checklist', description: 'AI-ready workflow for rights checklist.' },
      { name: 'Clause risk review', tier: 'PRO', placeholder: 'Enter details for clause risk review', description: 'AI-ready workflow for clause risk review.' },
      { name: 'Document comparison', tier: 'PRO', placeholder: 'Enter details for document comparison', description: 'AI-ready workflow for document comparison.' },
    ]
  },
  {
    id: 'travel',
    name: 'Travel Assistant',
    short: 'Travel',
    icon: '✈️',
    desc: 'Trips, itineraries and travel planning',
    tools: [
      { name: 'Trip itinerary', tier: 'FREE', placeholder: 'Enter details for trip itinerary', description: 'AI-ready workflow for trip itinerary.' },
      { name: 'Packing list', tier: 'FREE', placeholder: 'Enter details for packing list', description: 'AI-ready workflow for packing list.' },
      { name: 'Budget plan', tier: 'FREE', placeholder: 'Enter details for budget plan', description: 'AI-ready workflow for budget plan.' },
      { name: 'Multi-city optimizer', tier: 'PRO', placeholder: 'Enter details for multi-city optimizer', description: 'AI-ready workflow for multi-city optimizer.' },
      { name: 'Premium travel brief', tier: 'PRO', placeholder: 'Enter details for premium travel brief', description: 'AI-ready workflow for premium travel brief.' },
    ]
  },
  {
    id: 'government',
    name: 'Government Assistant',
    short: 'Government',
    icon: '🏛️',
    desc: 'Forms, schemes and process guidance',
    tools: [
      { name: 'Form explanation', tier: 'FREE', placeholder: 'Enter details for form explanation', description: 'AI-ready workflow for form explanation.' },
      { name: 'Document checklist', tier: 'FREE', placeholder: 'Enter details for document checklist', description: 'AI-ready workflow for document checklist.' },
      { name: 'Application draft', tier: 'FREE', placeholder: 'Enter details for application draft', description: 'AI-ready workflow for application draft.' },
      { name: 'Eligibility comparison', tier: 'PRO', placeholder: 'Enter details for eligibility comparison', description: 'AI-ready workflow for eligibility comparison.' },
      { name: 'Process roadmap', tier: 'PRO', placeholder: 'Enter details for process roadmap', description: 'AI-ready workflow for process roadmap.' },
    ]
  },
  {
    id: 'resume',
    name: 'Resume Builder',
    short: 'Resume',
    icon: '📄',
    desc: 'ATS resumes and career documents',
    tools: [
      { name: 'Resume generation', tier: 'FREE', placeholder: 'Enter details for resume generation', description: 'AI-ready workflow for resume generation.' },
      { name: 'Cover letter builder', tier: 'FREE', placeholder: 'Enter details for cover letter builder', description: 'AI-ready workflow for cover letter builder.' },
      { name: 'ATS improvement', tier: 'FREE', placeholder: 'Enter details for ats improvement', description: 'AI-ready workflow for ats improvement.' },
      { name: 'LinkedIn optimization', tier: 'PRO', placeholder: 'Enter details for linkedin optimization', description: 'AI-ready workflow for linkedin optimization.' },
      { name: 'Interview preparation', tier: 'PRO', placeholder: 'Enter details for interview preparation', description: 'AI-ready workflow for interview preparation.' },
      { name: 'Career roadmap', tier: 'PRO', placeholder: 'Enter details for career roadmap', description: 'AI-ready workflow for career roadmap.' },
    ]
  },
  {
    id: 'pdf',
    name: 'PDF Tools',
    short: 'PDF',
    icon: '📕',
    desc: 'Read, summarize and work with PDFs',
    tools: [
      { name: 'Summarize PDF text', tier: 'FREE', placeholder: 'Enter details for summarize pdf text', description: 'AI-ready workflow for summarize pdf text.' },
      { name: 'Extract text and data', tier: 'FREE', placeholder: 'Enter details for extract text and data', description: 'AI-ready workflow for extract text and data.' },
      { name: 'Ask questions from text', tier: 'FREE', placeholder: 'Enter details for ask questions from text', description: 'AI-ready workflow for ask questions from text.' },
      { name: 'Compare documents', tier: 'PRO', placeholder: 'Enter details for compare documents', description: 'AI-ready workflow for compare documents.' },
      { name: 'OCR workflow plan', tier: 'PRO', placeholder: 'Enter details for ocr workflow plan', description: 'AI-ready workflow for ocr workflow plan.' },
      { name: 'Smart redaction plan', tier: 'PRO', placeholder: 'Enter details for smart redaction plan', description: 'AI-ready workflow for smart redaction plan.' },
    ]
  },
  {
    id: 'image',
    name: 'Image Tools',
    short: 'Image',
    icon: '🖼️',
    desc: 'Image prompts, logos and editing workflows',
    tools: [
      { name: 'Image prompt generator', tier: 'FREE', placeholder: 'Enter details for image prompt generator', description: 'AI-ready workflow for image prompt generator.' },
      { name: 'Logo concept creator', tier: 'FREE', placeholder: 'Enter details for logo concept creator', description: 'AI-ready workflow for logo concept creator.' },
      { name: 'Background removal brief', tier: 'FREE', placeholder: 'Enter details for background removal brief', description: 'AI-ready workflow for background removal brief.' },
      { name: 'High-res image generation plan', tier: 'PRO', placeholder: 'Enter details for high-res image generation plan', description: 'AI-ready workflow for high-res image generation plan.' },
      { name: 'Brand-consistent image set', tier: 'PRO', placeholder: 'Enter details for brand-consistent image set', description: 'AI-ready workflow for brand-consistent image set.' },
    ]
  },
  {
    id: 'video',
    name: 'Video Tools',
    short: 'Video',
    icon: '🎥',
    desc: 'Scripts, edits and production plans',
    tools: [
      { name: 'Video script', tier: 'FREE', placeholder: 'Enter details for video script', description: 'AI-ready workflow for video script.' },
      { name: 'Shot list', tier: 'FREE', placeholder: 'Enter details for shot list', description: 'AI-ready workflow for shot list.' },
      { name: 'Reel ideas', tier: 'FREE', placeholder: 'Enter details for reel ideas', description: 'AI-ready workflow for reel ideas.' },
      { name: 'Full campaign storyboard', tier: 'PRO', placeholder: 'Enter details for full campaign storyboard', description: 'AI-ready workflow for full campaign storyboard.' },
      { name: 'Video ad strategy', tier: 'PRO', placeholder: 'Enter details for video ad strategy', description: 'AI-ready workflow for video ad strategy.' },
    ]
  },
  {
    id: 'voice',
    name: 'Voice Tools',
    short: 'Voice',
    icon: '🎙️',
    desc: 'Speech, audio and voice workflows',
    tools: [
      { name: 'Voiceover script', tier: 'FREE', placeholder: 'Enter details for voiceover script', description: 'AI-ready workflow for voiceover script.' },
      { name: 'Transcript cleaner', tier: 'FREE', placeholder: 'Enter details for transcript cleaner', description: 'AI-ready workflow for transcript cleaner.' },
      { name: 'Podcast outline', tier: 'FREE', placeholder: 'Enter details for podcast outline', description: 'AI-ready workflow for podcast outline.' },
      { name: 'Text-to-speech plan', tier: 'PRO', placeholder: 'Enter details for text-to-speech plan', description: 'AI-ready workflow for text-to-speech plan.' },
      { name: 'Voice brand system', tier: 'PRO', placeholder: 'Enter details for voice brand system', description: 'AI-ready workflow for voice brand system.' },
    ]
  },
  {
    id: 'excel',
    name: 'Excel Tools',
    short: 'Excel',
    icon: '📊',
    desc: 'Tables, formulas and spreadsheet planning',
    tools: [
      { name: 'Table generator', tier: 'FREE', placeholder: 'Enter details for table generator', description: 'AI-ready workflow for table generator.' },
      { name: 'Formula helper', tier: 'FREE', placeholder: 'Enter details for formula helper', description: 'AI-ready workflow for formula helper.' },
      { name: 'CSV cleaner plan', tier: 'FREE', placeholder: 'Enter details for csv cleaner plan', description: 'AI-ready workflow for csv cleaner plan.' },
      { name: 'Dashboard formula pack', tier: 'PRO', placeholder: 'Enter details for dashboard formula pack', description: 'AI-ready workflow for dashboard formula pack.' },
      { name: 'Bulk spreadsheet workflow', tier: 'PRO', placeholder: 'Enter details for bulk spreadsheet workflow', description: 'AI-ready workflow for bulk spreadsheet workflow.' },
    ]
  },
  {
    id: 'presentation',
    name: 'Presentation Tools',
    short: 'Slides',
    icon: '📽️',
    desc: 'Create outlines and slide content',
    tools: [
      { name: 'Presentation outline', tier: 'FREE', placeholder: 'Enter details for presentation outline', description: 'AI-ready workflow for presentation outline.' },
      { name: 'Slide-by-slide content', tier: 'FREE', placeholder: 'Enter details for slide-by-slide content', description: 'AI-ready workflow for slide-by-slide content.' },
      { name: 'Speaker notes', tier: 'FREE', placeholder: 'Enter details for speaker notes', description: 'AI-ready workflow for speaker notes.' },
      { name: 'Investor deck builder', tier: 'PRO', placeholder: 'Enter details for investor deck builder', description: 'AI-ready workflow for investor deck builder.' },
      { name: 'Premium pitch storyline', tier: 'PRO', placeholder: 'Enter details for premium pitch storyline', description: 'AI-ready workflow for premium pitch storyline.' },
    ]
  },
  {
    id: 'email',
    name: 'Email Tools',
    short: 'Email',
    icon: '✉️',
    desc: 'Write and improve emails',
    tools: [
      { name: 'Professional email', tier: 'FREE', placeholder: 'Enter details for professional email', description: 'AI-ready workflow for professional email.' },
      { name: 'Reply draft', tier: 'FREE', placeholder: 'Enter details for reply draft', description: 'AI-ready workflow for reply draft.' },
      { name: 'Subject line ideas', tier: 'FREE', placeholder: 'Enter details for subject line ideas', description: 'AI-ready workflow for subject line ideas.' },
      { name: 'Email sequence', tier: 'PRO', placeholder: 'Enter details for email sequence', description: 'AI-ready workflow for email sequence.' },
      { name: 'Personalized outreach system', tier: 'PRO', placeholder: 'Enter details for personalized outreach system', description: 'AI-ready workflow for personalized outreach system.' },
    ]
  },
  {
    id: 'meeting',
    name: 'Meeting Tools',
    short: 'Meeting',
    icon: '📝',
    desc: 'Summaries, agendas and action items',
    tools: [
      { name: 'Meeting agenda', tier: 'FREE', placeholder: 'Enter details for meeting agenda', description: 'AI-ready workflow for meeting agenda.' },
      { name: 'Action items', tier: 'FREE', placeholder: 'Enter details for action items', description: 'AI-ready workflow for action items.' },
      { name: 'Summary formatter', tier: 'FREE', placeholder: 'Enter details for summary formatter', description: 'AI-ready workflow for summary formatter.' },
      { name: 'Decision log', tier: 'PRO', placeholder: 'Enter details for decision log', description: 'AI-ready workflow for decision log.' },
      { name: 'Team follow-up automation plan', tier: 'PRO', placeholder: 'Enter details for team follow-up automation plan', description: 'AI-ready workflow for team follow-up automation plan.' },
    ]
  },
  {
    id: 'translator',
    name: 'Translator',
    short: 'Translate',
    icon: '🌍',
    desc: 'Translate and localize content',
    tools: [
      { name: 'Simple translation', tier: 'FREE', placeholder: 'Enter details for simple translation', description: 'AI-ready workflow for simple translation.' },
      { name: 'Tone-preserving rewrite', tier: 'FREE', placeholder: 'Enter details for tone-preserving rewrite', description: 'AI-ready workflow for tone-preserving rewrite.' },
      { name: 'Grammar correction', tier: 'FREE', placeholder: 'Enter details for grammar correction', description: 'AI-ready workflow for grammar correction.' },
      { name: 'Localization strategy', tier: 'PRO', placeholder: 'Enter details for localization strategy', description: 'AI-ready workflow for localization strategy.' },
      { name: 'Multi-language content pack', tier: 'PRO', placeholder: 'Enter details for multi-language content pack', description: 'AI-ready workflow for multi-language content pack.' },
    ]
  },
  {
    id: 'research',
    name: 'Research Assistant',
    short: 'Research',
    icon: '🔎',
    desc: 'Research summaries and briefs',
    tools: [
      { name: 'Topic summary', tier: 'FREE', placeholder: 'Enter details for topic summary', description: 'AI-ready workflow for topic summary.' },
      { name: 'Pros and cons', tier: 'FREE', placeholder: 'Enter details for pros and cons', description: 'AI-ready workflow for pros and cons.' },
      { name: 'Source checklist', tier: 'FREE', placeholder: 'Enter details for source checklist', description: 'AI-ready workflow for source checklist.' },
      { name: 'Deep research brief', tier: 'PRO', placeholder: 'Enter details for deep research brief', description: 'AI-ready workflow for deep research brief.' },
      { name: 'Competitor intelligence report', tier: 'PRO', placeholder: 'Enter details for competitor intelligence report', description: 'AI-ready workflow for competitor intelligence report.' },
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Assistant',
    short: 'Marketing',
    icon: '📣',
    desc: 'Copy, campaigns and growth',
    tools: [
      { name: 'Ad copy', tier: 'FREE', placeholder: 'Enter details for ad copy', description: 'AI-ready workflow for ad copy.' },
      { name: 'Landing page copy', tier: 'FREE', placeholder: 'Enter details for landing page copy', description: 'AI-ready workflow for landing page copy.' },
      { name: 'Social captions', tier: 'FREE', placeholder: 'Enter details for social captions', description: 'AI-ready workflow for social captions.' },
      { name: 'Campaign strategy', tier: 'PRO', placeholder: 'Enter details for campaign strategy', description: 'AI-ready workflow for campaign strategy.' },
      { name: 'Funnel optimization', tier: 'PRO', placeholder: 'Enter details for funnel optimization', description: 'AI-ready workflow for funnel optimization.' },
      { name: 'Brand positioning report', tier: 'PRO', placeholder: 'Enter details for brand positioning report', description: 'AI-ready workflow for brand positioning report.' },
    ]
  },
  {
    id: 'document',
    name: 'Document AI',
    short: 'Document',
    icon: '📑',
    desc: 'Documents, drafts and extraction',
    tools: [
      { name: 'Document summary', tier: 'FREE', placeholder: 'Enter details for document summary', description: 'AI-ready workflow for document summary.' },
      { name: 'Rewrite document', tier: 'FREE', placeholder: 'Enter details for rewrite document', description: 'AI-ready workflow for rewrite document.' },
      { name: 'Extract key points', tier: 'FREE', placeholder: 'Enter details for extract key points', description: 'AI-ready workflow for extract key points.' },
      { name: 'Document workflow automation', tier: 'PRO', placeholder: 'Enter details for document workflow automation', description: 'AI-ready workflow for document workflow automation.' },
      { name: 'Contract-style review', tier: 'PRO', placeholder: 'Enter details for contract-style review', description: 'AI-ready workflow for contract-style review.' },
    ]
  },
]

export function findModule(query: string) {
  const q = query.toLowerCase().trim();
  return appModules.filter((m) =>
    m.name.toLowerCase().includes(q) ||
    m.short.toLowerCase().includes(q) ||
    m.desc.toLowerCase().includes(q) ||
    m.tools.some((t) => t.name.toLowerCase().includes(q))
  );
}
