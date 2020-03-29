import { graphql } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import PostToc from "../components/postToc";

const Title = styled.h1`
  font-size: 30px;
`;
const Post = styled.div`
  line-height: 1.6rem;
`;

const PostCss = css`
  margin-top: 1.5rem;
  h2 {
    padding-right: 40px;
    padding-left: 40px;
    background: #f7f7f7;
    padding: 20px 15px 18px;
    color: #333;
    border-left: 9px solid teal;
    line-height: 40px;
  }
  h3 {
    letter-spacing: 1.6px;
    padding: 0px 15px 0px;
    border-left: 9px solid teal;
    color: #333;
    font-weight: 600;
    margin-top: 60px;
  }
  p {
    margin-left: 1rem;
  }
`;

const PrivacyPage = query => {
  const data = query.data.allMarkdownRemark.edges[0].node;
  return (
    <Layout>
      <SEO
        title={data.frontmatter.title}
        description="プライバシーポリシー"
        isIndex={false}
      />
      <Title>{data.frontmatter.title}</Title>
      {data.tableOfContents && <PostToc toc={data.tableOfContents} />}
      <Post dangerouslySetInnerHTML={{ __html: data.html }} css={PostCss} />
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "privacy/index.md/" } }
    ) {
      edges {
        node {
          tableOfContents(pathToSlugField: "frontmatter.page")
          frontmatter {
            title
          }
          html
        }
      }
    }
  }
`;

export default PrivacyPage;
