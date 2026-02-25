import React from "react";
import { Container, Row, Col } from "reactstrap";
import FeedbackCard from "../components/FeedbackCard";
import { FeedbackType } from "../types/sections";
import Fade from "react-reveal/Fade";

interface FeedbacksProps {
  feedbacks?: FeedbackType[] | null;
}

const Feedbacks = ({ feedbacks }: FeedbacksProps) => {
  if (!feedbacks) return null;

  return (
    <Fade bottom duration={2000}>
      <section className="section section-lg">
        <Container>
          <div className="d-flex p-4">
            <div>
              <div className="icon icon-lg icon-shape bg-gradient-white shadow rounded-circle text-info">
                <i className="fa fa-star text-info" />
              </div>
            </div>
            <div className="pl-4">
              <h4 className="display-3 text-info">Our Clients Feedback</h4>
            </div>
          </div>
          <Row className="g-3">
            {feedbacks.map((data, i) => (
              <Col key={i} lg={6}>
                <FeedbackCard {...data} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </Fade>
  );
};

export default Feedbacks;