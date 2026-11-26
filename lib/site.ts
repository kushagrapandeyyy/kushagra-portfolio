export const portfolioName = "Kushagra Pandey";
export const linkedinUrl = "https://www.linkedin.com/in/kushagra-pandey-66421424a/";
export const githubUrl = "https://github.com/kushagrapandeyyy";

const vercelProductionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const deploymentUrl = process.env.PORTFOLIO_URL?.trim()
  || (vercelProductionHost && `https://${vercelProductionHost}`);

export const portfolioUrl = deploymentUrl ? new URL("/", deploymentUrl) : undefined;
