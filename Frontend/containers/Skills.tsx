import { Icon } from "@iconify/react";
import React, { Fragment } from "react";
import Fade from "react-reveal/Fade";
import { Col, Container, Row, UncontrolledTooltip } from "reactstrap";
import DisplayLottie from "../components/DisplayLottie";

interface SkillSection {
  title?: string;
  lottieAnimationFile?: string;
  skills?: string[];
  softwareSkills?: { skillName: string; iconifyTag: string }[];
}

interface SkillsProps {
  skillsSection?: {
    title?: string;
    subTitle?: string;
    data?: SkillSection[];
  } | null;
}

const Skills = ({ skillsSection }: SkillsProps) => {
  if (!skillsSection) return null;

  console.log("[Skills] skillsSection:", skillsSection);
  skillsSection.data?.forEach((section, i) =>
    console.log(`[Skills] section ${i} skills:`, section.skills, "softwareSkills:", section.softwareSkills)
  );

  return (
    <Fade bottom duration={2000}>
      <Container className="text-center my-5 section section-lg">
        <h1 className="h1">{skillsSection.title}</h1>
        <p className="lead">{skillsSection.subTitle}</p>
        {(() => {
          // Support multiple possible shapes from Strapi or the API
          let sectionsRaw: any = null;

          if (Array.isArray((skillsSection as any).data)) sectionsRaw = (skillsSection as any).data;
          else if ((skillsSection as any).attributes && Array.isArray((skillsSection as any).attributes.data))
            sectionsRaw = (skillsSection as any).attributes.data;
          else if ((skillsSection as any).data && (skillsSection as any).data.data && Array.isArray((skillsSection as any).data.data))
            sectionsRaw = (skillsSection as any).data.data;
          else if (Array.isArray(skillsSection)) sectionsRaw = skillsSection;
          else sectionsRaw = [];

          console.log("[Skills] inferred sections count:", sectionsRaw.length);

          return sectionsRaw.map((rawSection: any, index: number) => {
          console.log(`[Skills] rawSection ${index}:`, rawSection);
          const attrs = (rawSection && rawSection.attributes) ? rawSection.attributes : rawSection;

          console.log(`[Skills] attrs ${index}:`, attrs);

          // normalize skills array from multiple possible shapes
          let skillsArr: string[] = [];
          if (Array.isArray(attrs?.skills)) {
            skillsArr = attrs.skills.map((s: any) =>
              typeof s === "string"
                ? s
                : s?.value ?? s?.attributes?.value ?? s?.attributes ?? String(s)
            );
          } else if (attrs?.skills?.data && Array.isArray(attrs.skills.data)) {
            skillsArr = attrs.skills.data.map((s: any) =>
              typeof s === "string"
                ? s
                : s?.value ?? s?.attributes?.value ?? s?.attributes ?? String(s)
            );
          } else if (Array.isArray(rawSection?.skills)) {
            skillsArr = rawSection.skills.map((s: any) =>
              typeof s === "string"
                ? s
                : s?.value ?? s?.attributes?.value ?? s?.attributes ?? String(s)
            );
          }

          // normalize software skills from different shapes
          let softwareSkillsRaw: any[] = [];
          if (Array.isArray(attrs?.softwareSkills)) softwareSkillsRaw = attrs.softwareSkills;
          else if (attrs?.softwareSkills?.data && Array.isArray(attrs.softwareSkills.data)) softwareSkillsRaw = attrs.softwareSkills.data;
          else if (Array.isArray(rawSection?.softwareSkills)) softwareSkillsRaw = rawSection.softwareSkills;

          const softwareSkills = (softwareSkillsRaw || []).map(s => {
            const item = s && s.attributes ? s.attributes : s;
            return {
              skillName: item?.skillName ?? item?.name ?? "",
              iconifyTag: item?.iconifyTag ?? item?.icon ?? "",
            };
          });

          const section = {
            title: attrs?.title ?? "",
            lottieAnimationFile: attrs?.lottieAnimationFile ?? "",
            skills: skillsArr,
            softwareSkills,
          };

          return (
            <Row className="my-5" key={index}>
              <Col lg="6" className="order-2 order-lg-1">
                <DisplayLottie animationPath={section.lottieAnimationFile} />
              </Col>
              <Col lg="6" className="order-1 order-lg-2">
                <h3 className="h3 mb-2">{section.title}</h3>
                <div className="d-flex justify-content-center flex-wrap mb-2">
                  {section.softwareSkills?.map((skill, i) => (
                    <Fragment key={i}>
                      <div
                        className="icon icon-lg icon-shape shadow-sm rounded-circle m-1"
                        id={skill.skillName.replace(/\s/g, "")}
                      >
                        <Icon icon={skill.iconifyTag} data-inline="false" />
                      </div>
                      <UncontrolledTooltip
                        delay={0}
                        placement="bottom"
                        target={skill.skillName.replace(/\s/g, "")}
                      >
                        {skill.skillName}
                      </UncontrolledTooltip>
                    </Fragment>
                  ))}
                </div>
                <div>
                  {section.skills?.map((skill, i) => (
                    <p key={i}>{skill}</p>
                  ))}
                </div>
              </Col>
            </Row>
          );
          });
        })()}
      </Container>
    </Fade>
  );
};

export default Skills;