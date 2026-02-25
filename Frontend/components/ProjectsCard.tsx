import React from "react";
import { Card, CardBody, Col, Button } from "reactstrap";
import { ProjectType } from "../types/sections";

const ProjectsCard = ({ name, desc, github, link }: ProjectType) => (
  <Col lg="6">
    <Card className="shadow-lg--hover shadow mt-4">
      <CardBody>
        <h3>{name}</h3>
        <p className="description mt-3">{desc}</p>
        <div className="d-flex gap-2">
          {github && (
            <Button
              className="btn-icon"
              color="github"
              href={github}
              target="_blank"
              rel="noopener"
            >
              <i className="fa fa-github" />
            </Button>
          )}
          {link && (
            <Button
              className="btn-icon"
              color="success"
              href={link}
              target="_blank"
              rel="noopener"
            >
              <i className="fa fa-arrow-right mr-2" />
              Demo
            </Button>
          )}
        </div>
      </CardBody>
    </Card>
  </Col>
);

export default ProjectsCard;