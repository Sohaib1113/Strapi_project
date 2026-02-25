import dynamic from "next/dynamic";
import SEO from "../components/SEO";
import { GithubUserType } from "../types";

const Navigation = dynamic(() => import("../components/Navigation"));
const Greetings = dynamic(() => import("../containers/Greetings"));
const Skills = dynamic(() => import("../containers/Skills"));
const Proficiency = dynamic(() => import("../containers/Proficiency"));
const Education = dynamic(() => import("../containers/Education"));
const Experience = dynamic(() => import("../containers/Experience"));
const Projects = dynamic(() => import("../containers/Projects"));
const Feedbacks = dynamic(() => import("../containers/Feedbacks"));
const GithubProfileCard = dynamic(() => import("../components/GithubProfileCard"));

interface HomeProps {
  githubProfileData: GithubUserType | null;
  portfolioData: any;
}

export default function Home({ githubProfileData, portfolioData }: HomeProps) {
  console.log("[Home] portfolioData:", portfolioData);
  console.log("[Home] githubProfileData:", githubProfileData);
  return (
    <div>
      <SEO seoData={portfolioData?.seo || { title: "Portfolio" }} />

<Navigation
  greeting={portfolioData?.greeting}
  socialLinks={portfolioData?.openSource}
/>
<Greetings greetings={portfolioData?.greeting} />
<Skills skillsSection={portfolioData?.skillsSection} />
<Proficiency skillBars={portfolioData?.skillBars} />
<Education educationInfo={portfolioData?.education} />
<Experience experience={portfolioData?.experience} />
<Projects projects={portfolioData?.projects} />
<Feedbacks feedbacks={portfolioData?.feedback} />
<GithubProfileCard
  {...(githubProfileData as GithubUserType)}
  socialLinks={portfolioData?.openSource}
/>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const portfolioRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portfolio`);
    const portfolioData = await portfolioRes.json();

    const githubUserName = portfolioData?.openSource?.githubUserName;

    if (!githubUserName) {
      console.warn("GitHub username not found in portfolioData");
      return { props: { githubProfileData: null, portfolioData } };
    }

    const githubRes = await fetch(`https://api.github.com/users/${githubUserName}`);
    let githubProfileData: GithubUserType | null = null;

    if (githubRes.ok) {
      githubProfileData = await githubRes.json();
    } else {
      console.error("GitHub fetch failed", githubRes.status, githubRes.statusText);
    }

    return {
      props: { githubProfileData, portfolioData },
    };
  } catch (err) {
    console.error("Error fetching data", err);
    return { props: { githubProfileData: null, portfolioData: null } };
  }
}