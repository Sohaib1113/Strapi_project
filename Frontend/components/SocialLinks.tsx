import React from "react";
import { Button } from "reactstrap";

interface SocialLinksProps {
  socialLinks?: {
    email?: string;
    github?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    twitter?: string;
    url?: string;
  };
}

const SocialLinks = ({ socialLinks = {} }: SocialLinksProps) => (
  <div className="btn-wrapper text-lg">
    {Object.entries(socialLinks).map(([key, url]) =>
      url ? (
        <Button
          key={key}
          className="btn-icon-only rounded-circle ml-1"
          color={key === "email" ? "white" : key}
          href={url}
          target="_blank"
          rel="noopener"
          aria-label={key}
        >
          <i className={`fa fa-${key}`} />
        </Button>
      ) : null
    )}
  </div>
);

export default SocialLinks;