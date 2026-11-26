export const portfolioName = "Kushagra Pandey";
export const linkedinUrl = "https://www.linkedin.com/in/kushagra-pandey-66421424a/";
export const githubUrl = "https://github.com/kushagrapandeyyy";

const deploymentUrl = process.env.PORTFOLIO_URL?.trim() || "https://kushagrapandey.in";

export const portfolioUrl = new URL("/", deploymentUrl);
