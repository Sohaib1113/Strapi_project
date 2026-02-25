import React from "react";
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Col } from "reactstrap";
import { ExperienceType } from "../types/sections";

const ExperienceCard = ({
  companyLogo,
  company,
  role,
  date,
  desc,
  descBullets,
}: ExperienceType) => {
  return (
    <Col lg="6">
      <Card className="shadow-lg--hover my-4 shadow border-0 text-center rounded h-100">
        <CardBody>
          {companyLogo && (
            <img
              src={companyLogo}
              alt={company}
              style={{
                objectFit: "cover",
                left: 0,
                right: 0,
                top: "7rem",
                marginLeft: "auto",
                marginRight: "auto",
                width: "8rem",
                height: "8rem",
                borderRadius: "50%",
              }}
              className="shadow mb-3"
            />
          )}
          <CardTitle tag="h4" className="mb-2">{company}</CardTitle>
          <CardSubtitle tag="h5" className="mb-2">{role}</CardSubtitle>
          <CardSubtitle>{date}</CardSubtitle>
          <CardText tag="div" className="description my-3 text-left">
            {desc}
            {descBullets?.length ? (
              <ul>
                {descBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            ) : null}
          </CardText>
        </CardBody>
      </Card>
    </Col>
  );
};

export default ExperienceCard;