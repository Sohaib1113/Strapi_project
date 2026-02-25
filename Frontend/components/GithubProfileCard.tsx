import React from "react";
import { Card, Container, Row, Col } from "reactstrap";
import SocialLinks from "./SocialLinks";
import { GithubUserType } from "../types";

const GithubProfileCard = ({ avatar_url, bio, location, socialLinks }: GithubUserType & { socialLinks?: any }) => {
  console.log("[GithubProfileCard] props:", { avatar_url, bio, location, socialLinks });

  return (
    <Card className="section-lg bg-gradient-info shadow-lg border-0">
      <Container>
        <Row>
          <Col lg="4" className="order-lg-2 text-center">
            {avatar_url && (
              <img
                src={avatar_url}
                alt="Avatar"
                className="rounded-circle img-center img-fluid shadow shadow-lg--hover mb-4"
                style={{ width: "200px" }}
              />
            )}
          </Col>
          <Col lg="8" className="order-lg-1">
            <h2 className="text-white">Reach Out to me!</h2>
            <p className="lead text-white mt-3">
              DISCUSS A PROJECT OR JUST WANT TO SAY HI? MY INBOX IS OPEN FOR ALL
            </p>
            {bio && <p className="text-white mt-3">{bio}</p>}
            {location && (
              <div className="my-3 icon-shape bg-gradient-white shadow rounded text-info">
                <i className="ni ni-pin-3 text-info mr-2" />
                {location}
              </div>
            )}
            <SocialLinks socialLinks={socialLinks} />
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default GithubProfileCard;