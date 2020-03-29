import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";

const Nav = styled.ul`
  margin: 0;
  list-style: none;
  display: flex;
`;

const LinkStyle = css`
  color: #808182;
  font-size: 0.8rem;
  font-style: italic;
  text-decoration: none;
  box-shadow: none;
`;

const Tag = styled.li`
  padding: 12px 12px 0 0;
  margin: 0 0.5rem 0.3rem 0;

  &:hover a {
    color: teal;
  }
`;

const BlogTag = ({ tags }: { tags: string[] }) => {
  return (
    <Nav>
      {tags.map(tag => {
        return (
          <Tag key={`${tag}`}>
            <Link to={`/tags/${tag}`} css={LinkStyle}>
              #{tag}
            </Link>
          </Tag>
        );
      })}
    </Nav>
  );
};

export default BlogTag;
