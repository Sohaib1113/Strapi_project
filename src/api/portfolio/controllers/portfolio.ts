import type { Context } from "koa";
console.log("Portfolio route hit");
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
        strapi.documents("api::greeting.greeting").findMany(),
        strapi.documents("api::open-source.open-source").findMany(),
        strapi.documents("api::contact.contact").findMany(),
        strapi.documents("api::seo.seo").findMany({ populate: "*" }),
        strapi.documents("api::skills-section.skills-section").findMany({ populate: { data: { populate: '*' } } }),
        strapi.documents("api::education.education").findMany(),
        strapi.documents("api::experience.experience").findMany({ populate: "*" }),
        strapi.documents("api::project.project").findMany(),
        strapi.documents("api::feedback.feedback").findMany(),
        strapi.documents("api::skill-bar.skill-bar").findMany(),
      ]);

      ctx.body = {
        greeting: greeting?.[0] ?? null,
        openSource: openSource?.[0] ?? null,
        contact: contact?.[0] ?? null,
        seo: seo?.[0] ?? null,
        skillsSection: skillsSection?.[0] ?? null,
        education,
        experience,
        projects,
        feedback,
        skillBars,
      };
    } catch (error) {
      ctx.throw(500, "Failed to fetch portfolio data");
    }
  },
};