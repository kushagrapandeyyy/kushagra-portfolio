export const engineeringTenure = "2+";

const outcomes = {
  concurrency: { value: 20, suffix: "%", context: "Concurrency", outcome: "Concurrency improvement" },
  security: { value: 30, suffix: "%", context: "Application security", outcome: "Fewer critical vulnerabilities" },
  query: { value: 25, suffix: "%", context: "Query performance", outcome: "Reduction in query response time" },
  reliability: { value: 15, suffix: "%", context: "Production reliability", outcome: "Fewer production errors" },
};

export const metrics = [
  { value: 100, suffix: "K+", context: "Platform scale", outcome: "Users on a supported platform" },
  { value: 20, suffix: "K+", context: "Semantic retrieval", outcome: "Recipes indexed" },
  outcomes.concurrency,
  outcomes.security,
  outcomes.query,
  outcomes.reliability,
];

export const domains = [
  {
    title: "Backend Engineering",
    description: "Design APIs and backend services that stay predictable under load and are easier to debug in production.",
    capabilities: [
      "API architecture and backend development",
      "Authentication and authorization",
      "Database design and caching",
      "Concurrency and performance optimization",
      "Debugging and production troubleshooting",
    ],
    highlights: ["Python", "FastAPI", "Django REST Framework", "Node.js"],
  },
  {
    title: "AI & Intelligent Systems",
    description: "Integrate retrieval, models and tools into software workflows that can find relevant information and act on it.",
    capabilities: [
      "AI-powered application development",
      "Agentic workflows and tool orchestration",
      "Semantic retrieval and context-aware systems",
      "LLM integration and intelligent automation",
    ],
    highlights: ["RAG", "Vector Search", "Tool Orchestration"],
  },
  {
    title: "Security Engineering",
    description: "Treat access control, input handling and vulnerability remediation as part of building dependable applications.",
    capabilities: [
      "Vulnerability identification and analysis",
      "Application and API security testing",
      "Remediation and API hardening",
      "Access control and secure application development",
    ],
    highlights: ["OWASP", "API Security", "Input Validation"],
  },
  {
    title: "Cloud, DevOps & Infrastructure",
    description: "Package and deploy applications, configure production environments and automate repeatable delivery steps.",
    capabilities: [
      "Application deployment and containerization",
      "CI/CD workflows and deployment automation",
      "Cloud infrastructure and production configuration",
      "Infrastructure awareness across application layers",
    ],
    highlights: ["AWS", "Docker", "CI/CD"],
  },
  {
    title: "Frontend & Product Engineering",
    description: "Build responsive interfaces that carry backend functionality through to a complete user workflow.",
    capabilities: [
      "Complete application interfaces",
      "Frontend and backend integration",
      "Responsive application development",
      "Testing and product-focused implementation",
    ],
    highlights: ["React", "Next.js", "Playwright"],
  },
];

export const arsenal = [
  { label: "Languages", tools: "Python, JavaScript, TypeScript, C++, SQL" },
  { label: "Backend Frameworks", tools: "FastAPI, Django, Django REST Framework, Node.js, Express.js" },
  { label: "APIs & Protocols", tools: "REST, GraphQL, WebSockets" },
  { label: "Data & Search", tools: "Firebase Realtime Database, NoSQL, vector search, semantic search" },
  { label: "AI Engineering", tools: "OpenAI and other LLM APIs, retrieval-augmented generation (RAG), LangChain, LangGraph, MCP" },
  { label: "Cloud & DevOps", tools: "AWS EC2 and S3, Docker, Jenkins, CI/CD, Vercel", note: "Familiar with Kubernetes and Azure fundamentals." },
  { label: "Security & Testing", tools: "OWASP, API security testing, vulnerability analysis, authentication, authorization, input validation, Playwright" },
  { label: "Frontend", tools: "React, Next.js, HTML, CSS" },
];

export const experience = [
  {
    start: { iso: "2024-08", label: "Aug 2024" },
    end: { iso: "2025-10", label: "Oct 2025" },
    heading: "Backend & Platform Engineering",
    description: "Developed backend services and production APIs. Optimized database queries and API performance, and debugged production issues to improve reliability.",
    result: `Reduced query response time by ${outcomes.query.value}% and helped reduce production errors by ${outcomes.reliability.value}%.`,
  },
  {
    start: { iso: "2025-11", label: "Nov 2025" },
    end: null,
    heading: "Backend & Application Security",
    description: "Build and maintain backend services and production APIs. Contribute to application security testing and vulnerability remediation, and debug issues in production.",
    result: `Improved concurrency by approximately ${outcomes.concurrency.value}% through backend optimization.`,
  },
];

export const relatedExperience = [
  { heading: "Full-Stack Product Development", description: "Integrated application interfaces with backend services, built applications with in-app payment capabilities and contributed to deployment and infrastructure work." },
  { heading: "AI & Intelligent Systems", description: "Worked on semantic search and AI-powered application flows, connecting retrieval and orchestration to usable products." },
];

export const approach = [
  { stage: "Understand", description: "Break down the problem and clarify requirements." },
  { stage: "Architect", description: "Choose tools, system boundaries and data flows." },
  { stage: "Engineer", description: "Build reliable, maintainable and secure implementations." },
  { stage: "Scale", description: "Optimize performance, concurrency and infrastructure." },
  { stage: "Ship", description: "Test, deploy, monitor, debug and improve." },
];
