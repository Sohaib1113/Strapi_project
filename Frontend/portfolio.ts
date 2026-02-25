import { Context } from "vm";

export default {
  async find(ctx: Context) {
    try {
      const [
        greeting,
        openSource,
        contact,
        seo,
        skillsSection,
        education,
        experience,
        projects,
        feedback,
        skillBars,
      ] = await Promise.all([
        ctx.strapi.documents("api::greeting.greeting").findMany(),
        ctx.strapi.documents("api::open-source.open-source").findMany(),
        ctx.strapi.documents("api::contact.contact").findMany(),
        ctx.strapi.documents("api::seo.seo").findMany({ populate: "*" }),
        // Use entityService with explicit populate for nested component fields
        // to ensure `skills` and `softwareSkills` are returned.
        ctx.strapi.entityService.findMany("api::skills-section.skills-section", {
          populate: {
            data: {
              skills: { populate: "*" },
              softwareSkills: { populate: "*" },
            },
          },
        }),
        ctx.strapi.documents("api::education.education").findMany(),
        ctx.strapi.documents("api::experience.experience").findMany({ populate: "*" }),
        ctx.strapi.documents("api::project.project").findMany(),
        ctx.strapi.documents("api::feedback.feedback").findMany(),
        ctx.strapi.documents("api::skill-bar.skill-bar").findMany(),
      ]);

      /* ---------------- SEO → stringify ---------------- */
      const formattedSEO = seo?.[0]
        ? JSON.stringify(seo[0])
        : null;

      /* ---------------- SkillBars → force string ---------------- */
      const formattedSkillBars =
        skillBars?.map((bar: any) => ({
          ...bar,
          progressPercentage: String(bar.progressPercentage),
        })) ?? [];

      /* ---------------- Skills Section Transform ---------------- */
      const formattedSkillsSection = skillsSection?.[0]
        ? {
            ...skillsSection[0],
            data: skillsSection[0].data?.map((section: any) => {
              const attrs = section?.attributes ? section.attributes : section;

              // normalize skills to strings (handle component shapes)
              const skillsArr = (attrs?.skills ?? []).map((skill: any) => {
                if (typeof skill === "string") return `⚡ ${skill}`;
                if (skill == null) return "";
                if (typeof skill === "object") {
                  if (skill.value) return `⚡ ${skill.value}`;
                  if (skill.attributes && skill.attributes.value) return `⚡ ${skill.attributes.value}`;
                  // last resort: try to extract first string-like field
                  const val = skill.skillName || skill.name || skill.title || JSON.stringify(skill);
                  return `⚡ ${val}`;
                }
                return `⚡ ${String(skill)}`;
              });

              // normalize softwareSkills to simple objects with skillName and iconifyTag
              const softwareSkillsArr = (attrs?.softwareSkills ?? []).map((skill: any) => {
                const item = skill?.attributes ? skill.attributes : skill;
                return {
                  skillName: item?.skillName ?? item?.name ?? item?.value ?? "",
                  iconifyTag: item?.iconifyTag ?? item?.icon ?? "",
                };
              });

              return {
                ...attrs,
                skills: skillsArr,
                softwareSkills: softwareSkillsArr,
              };
            }),
          }
        : null;

      ctx.body = {
        greeting: greeting?.[0] ?? null,
        openSource: openSource?.[0] ?? null,
        contact: contact?.[0] ?? null,
        seo: formattedSEO,
        skillsSection: formattedSkillsSection,
        education,
        experience,
        projects,
        feedback,
        skillBars: formattedSkillBars,
      };
    } catch (error) {
      ctx.throw(500, "Failed to fetch portfolio data");
    }
  },
};