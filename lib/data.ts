export const metrics = [
  { value: 100, suffix: "K+", context: "Platform scale", outcome: "Platform users supported" },
  { value: 20, suffix: "K+", context: "Semantic retrieval", outcome: "Recipes indexed" },
  { value: 20, suffix: "%", context: "Concurrency", outcome: "Concurrency improvement" },
  { value: 30, suffix: "%", context: "Application security", outcome: "Fewer critical vulnerabilities" },
  { value: 25, suffix: "%", context: "Query performance", outcome: "Reduction in query response time" },
  { value: 15, suffix: "%", context: "Production reliability", outcome: "Fewer production errors" },
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
    technologies: "Python, FastAPI, Django, Django REST Framework, Node.js, Express.js, REST APIs, GraphQL, WebSockets",
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
    technologies: "LLM APIs, Retrieval-Augmented Generation (RAG), LangChain, LangGraph, MCP, Vector Search, Semantic Search, AI Agents, OpenAI APIs",
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
    technologies: "OWASP, API Security, Vulnerability Analysis, Security Testing, Authentication, Authorization, Input Validation, Secure API Design, Application Security",
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
    technologies: "AWS EC2, AWS S3, Docker, Jenkins, CI/CD, Vercel, Firebase",
    familiarity: "Broader familiarity with Kubernetes and Azure Fundamentals.",
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
    technologies: "JavaScript, TypeScript, React, Next.js, HTML, CSS, Playwright",
  },
];

export const arsenal = [
  { label: "Languages", tools: "Python, JavaScript, TypeScript, SQL, C++", note: "C++ for programming and problem-solving. Java as programming knowledge." },
  { label: "Backend", tools: "FastAPI, Django, Django REST Framework, Node.js, Express.js" },
  { label: "Frontend", tools: "React, Next.js, HTML, CSS" },
  { label: "Databases & Search", tools: "Firebase Realtime Database, SQL, NoSQL, Vector Search, Semantic Search" },
  { label: "AI Engineering", tools: "LLM APIs, RAG, LangChain, LangGraph, MCP, OpenAI APIs" },
  { label: "Cloud & DevOps", tools: "AWS EC2, AWS S3, Docker, Kubernetes, Jenkins, CI/CD, Vercel" },
  { label: "Security & Testing", tools: "OWASP, API Security, Playwright, Vulnerability Analysis" },
  { label: "Protocols & Architecture", tools: "REST, GraphQL, WebSockets, Authentication, Authorization" },
];

export const experience = [
  {
    start: { iso: "2024-08", label: "Aug 2024" },
    end: { iso: "2025-10", label: "Oct 2025" },
    heading: "Backend & Platform Engineering",
    description: "Developed backend services and production APIs. Optimized database queries and API performance, diagnosed production errors and improved reliability.",
  },
  {
    start: { iso: "2025-11", label: "Nov 2025" },
    end: null,
    heading: "Software Engineering Experience",
    description: "Build and maintain backend services with Python, FastAPI and Django REST Framework. Improve concurrency and contribute to application security testing, remediation and production debugging.",
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
