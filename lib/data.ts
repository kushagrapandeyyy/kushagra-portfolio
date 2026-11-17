export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  description: string;
  artLabel: string;
  symbol: string;
  stack: string[];
  live?: string;
  github?: string;
  problem: string;
  approach: string[];
  notes: string;
};

export const projects: Project[] = [
  {
    slug: "hidetheball",
    title: "HideTheBall",
    type: "INTERACTIVE GAME · PERSONAL PROJECT",
    summary: "A psychological cup-and-ball game built around bluffing, observation and the next move.",
    description: "An interactive game concept where players hide a treasure bag under cups and try to outthink their opponent.",
    artLabel: "THE ART OF MISDIRECTION",
    symbol: "◉",
    stack: ["React", "Vite", "Firebase", "Capacitor"],
    live: "https://killtheking.vercel.app/",
    github: "https://github.com/kushagrapandeyyy",
    problem: "Create a quick-to-understand game experience where the tension comes from player decisions rather than complicated rules.",
    approach: [
      "Built the application with React and Vite, using Firebase for authentication and application data.",
      "Designed gameplay modes around bot play, pass-and-play and room-based multiplayer flows.",
      "Used Capacitor as the path toward an Android application while retaining a web experience.",
    ],
    notes: "The live deployment currently uses the KillTheKing URL. Replace it with the final HideTheBall deployment URL if the project has moved.",
  },
  {
    slug: "dtps",
    title: "DTPS",
    type: "SEARCH · RECIPE DISCOVERY",
    summary: "A recipe discovery experience using vector and semantic search across a large recipe collection.",
    description: "A search-focused product that helps users discover relevant recipes through meaning, not only exact keyword matches.",
    artLabel: "DISCOVER BY MEANING",
    symbol: "⌕",
    stack: ["Python", "Vector Search", "Semantic Search", "APIs"],
    problem: "Keyword-only discovery can miss useful results when people describe what they want differently from how a recipe is indexed.",
    approach: [
      "Worked on vector and semantic search across approximately 20,000 recipes.",
      "Connected search capabilities to application APIs and the product experience.",
      "Focused on making discovery more useful when the query and stored recipe wording differ.",
    ],
    notes: "Add a public demo, architecture diagram and details of the embedding/vector database implementation before publishing a deeper technical case study.",
  },
  {
    slug: "herflo",
    title: "HerFlo",
    type: "WEB APPLICATION · PERSONAL PROJECT",
    summary: "A deployed web application with a focus on a clear product experience and reliable application flows.",
    description: "A web application built with a modern React and Next.js stack.",
    artLabel: "A PRODUCT IN PROGRESS",
    symbol: "✳",
    stack: ["Next.js", "React", "Authentication", "Vercel"],
    live: "https://herflo.vercel.app/",
    problem: "Turn a product concept into an accessible web application with a clear interface and working authentication flow.",
    approach: [
      "Built the frontend using Next.js and React.",
      "Implemented application authentication and deployment workflows.",
      "Prioritized a straightforward user experience and a maintainable application structure.",
    ],
    notes: "Add screenshots and clarify the exact feature set and your individual contribution before treating this as a complete case study.",
  },
  {
    slug: "personal-ai-agent",
    title: "Personal AI Agent",
    type: "AI · AUTOMATION · EXPERIMENT",
    summary: "An agentic assistant exploring tool orchestration and choosing an appropriate strategy for each task.",
    description: "A personal assistant concept designed to use tools and different execution approaches based on task complexity.",
    artLabel: "TOOLS WITH INTENTION",
    symbol: "⌘",
    stack: ["LLM APIs", "Tool Calling", "Browser Automation", "Sarvam TTS"],
    problem: "An agent should not use the heaviest workflow for every request. Small tasks need direct actions; complex tasks need planning and verification.",
    approach: [
      "Explored adaptive tool orchestration based on task complexity.",
      "Integrated browser automation and external model capabilities.",
      "Worked on voice interaction using text-to-speech capabilities.",
    ],
    notes: "Add a short demo video, supported tool list and architecture diagram when the project is ready for public presentation.",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
