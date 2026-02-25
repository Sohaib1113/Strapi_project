import React from "react";
import { Container, Row, Col } from "reactstrap";
import EducationCard from "../components/EducationCard";
import { EducationType } from "../types/sections";
import Fade from "react-reveal/Fade";

interface EducationProps {
  educationInfo?: EducationType[] | null;
}

const Education = ({ educationInfo }: EducationProps) => {
  if (!educationInfo) return null;

  return (
    <Fade bottom duration={2000}>
      <section className="section pb-0 bg-gradient-info my-5">
        <Container>
          <div className="d-flex px-3">
            <div>
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <i className="ni ni-books text-info" />
              </div>
            </div>
            <div className="pl-4">
              <h4 className="display-3 text-white">Education</h4>
            </div>
          </div>
          <Row className="row-grid align-items-center">
            {educationInfo.map(info => (
              <Col className="order-lg-1" lg="6" key={info.schoolName}>
                <EducationCard {...info} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fade>
  );
};

export default Education;