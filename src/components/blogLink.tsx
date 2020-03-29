import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import DateUtils from "../utils/dateUtils";
import BlogTag from "../components/blogTag";

const Container = styled.div`
  margin-bottom: 1rem;
  background-color: white;
  padding: 8px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  &:hover {
    box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.14),
      0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2);
  }
`;

const Posts = styled.div`
  @media only screen and (max-width: 480px) {
    max-width: 620px;
  }
`;

const Title = styled.h3`
  margin-bottom: 1px;
  font-size: 18px;
  line-height: 1.48;
  color: #222;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  word-break: break-all;
  overflow-y: hidden;
  max-height: 4rem;
  color: #666666;
  margin-bottom: 0;
`;

const CardLink = css`
  text-decoration: none;

  &:hover ${Title} {
    color: teal;
  }
`;

const BlogLink = ({ data }) => (
  <Container>
    <Link to={`/posts/${data.frontmatter.slug}`} css={CardLink}>
      <Posts>
        <Title>{data.frontmatter.title}</Title>
        <Description>{DateUtils.formatDate(data.frontmatter.date)}</Description>
        <Description>{data.excerpt}</Description>
      </Posts>
    </Link>
    <BlogTag tags={data.frontmatter.tags} />
  </Container>
);

export default BlogLink;
