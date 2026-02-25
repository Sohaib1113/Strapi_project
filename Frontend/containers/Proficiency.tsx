import React from "react";
import { Container, Row, Col, Progress } from "reactstrap";
import Fade from "react-reveal/Fade";
import DisplayLottie from "../components/DisplayLottie";
import { SkillBarsType } from "../types/sections";

interface ProficiencyProps {
  skillBars?: SkillBarsType[] | null;
}

const Proficiency = ({ skillBars }: ProficiencyProps) => {
  if (!skillBars) return null;

  return (
    <Container className="section section-lg">
      <Fade bottom duration={2000}>
        <Row>
          <Col lg="6">
            <h1 className="h1">Proficiency</h1>
            {skillBars.map((skill, i) => (
              <div className="progress-info" key={i}>
                <div className="progress-label">
                  <span>{skill.Stack}</span>
                </div>
                <div className="progress-percentage">
                  <span>{skill.progressPercentage}%</span>
                </div>
                <Progress
                  max="100"
                  value={parseInt(skill.progressPercentage, 10)}
                  color="info"
                  role="progressbar"
                  aria-label={skill.Stack}
                />
              </div>
            ))}
          </Col>
          <Col lg="6">
            <DisplayLottie animationPath="/lottie/build.json" />
          </Col>
        </Row>
      </Fade>
    </Container>
  );
};

export default Proficiency;