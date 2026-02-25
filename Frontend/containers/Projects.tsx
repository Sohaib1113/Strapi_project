import React from "react";
import { Container, Row } from "reactstrap";
import ProjectsCard from "../components/ProjectsCard";
import { ProjectType } from "../types/sections";
import Fade from "react-reveal/Fade";

interface ProjectsProps {
  projects?: ProjectType[] | null;
}

const Projects = ({ projects }: ProjectsProps) => {
  if (!projects) return null;

  return (
    <Fade bottom duration={2000}>
      <section className="section section-lg">
        <Container>
          <div className="d-flex p-4">
            <div>
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <i className="ni ni-laptop text-info" />
              </div>
            </div>
            <div className="pl-4">
              <h4 className="display-3 text-info">Projects</h4>
            </div>
          </div>
          <Row className="row-grid align-items-center">
            {projects.map((data, i) => (
              <ProjectsCard key={i} {...data} />
            ))}
          </Row>
        </Container>
      </section>
    </Fade>
  );
};

export default Projects;