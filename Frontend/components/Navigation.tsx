import React, { useState, useEffect } from "react";
import Headroom from "headroom.js";
import {
  UncontrolledCollapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";

// Props interfaces
interface GreetingType {
  name: string;
}

interface SocialLinksType {
  facebook?: string;
  instagram?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

interface NavigationProps {
  greeting?: GreetingType | null;
  socialLinks?: SocialLinksType;
}

const Navigation = ({ greeting, socialLinks = {} }: NavigationProps) => {
  const [collapseClasses, setCollapseClasses] = useState("");

  const onExiting = () => setCollapseClasses("collapsing-out");
  const onExited = () => setCollapseClasses("");

  useEffect(() => {
    const headroom = new Headroom(document.getElementById("navbar-main")!);
    headroom.init();
  }, []);

  return (
    <header className="header-global">
      <Navbar
        className="navbar-main navbar-transparent navbar-light headroom"
        expand="lg"
        id="navbar-main"
      >
        <Container>
          <NavbarBrand href="/" className="mr-lg-5">
            <h2 className="text-white" id="nav-title">
              {greeting?.name || "Your Name"}
            </h2>
          </NavbarBrand>

          <button
            className="navbar-toggler"
            aria-label="navbar_toggle"
            id="navbar_global"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <UncontrolledCollapse
            toggler="#navbar_global"
            navbar
            className={collapseClasses}
            onExiting={onExiting}
            onExited={onExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-brand" xs="6">
                  <h3 className="text-black">{greeting?.name || "Your Name"}</h3>
                </Col>
                <Col className="collapse-close" xs="6">
                  <button className="navbar-toggler" id="navbar_global">
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>

            <Nav className="align-items-lg-center ml-lg-auto" navbar>
              {Object.entries(socialLinks).map(([key, url]) =>
                url ? (
                  <NavItem key={key}>
                    <NavLink
                      href={url}
                      target="_blank"
                      rel="noopener"
                      className="nav-link-icon"
                      aria-label={key}
                    >
                      <i className={`fa fa-${key}`} />
                      <span className="nav-link-inner--text d-lg-none ml-2">{key}</span>
                    </NavLink>
                  </NavItem>
                ) : null
              )}
            </Nav>
          </UncontrolledCollapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;