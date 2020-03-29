import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import styled from "@emotion/styled";
import { rhythm } from "../utils/typography";
import DateUtils from "../utils/dateUtils";
import BlogTag from "../components/blogTag";
import SNSLink from "../components/snsLink";
import PostToc from "../components/postToc";
import { css } from "@emotion/core";
import Ad from "../components/adsense";

const Main = styled.div`
  background-color: white;
  padding: 0 1rem 0 1rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 30px;
  padding: 1rem 0 0 0;
  margin-bottom: 0;
`;

const DateStyle = styled.p`
  font-size: 15px;
  display: block;
  margin-bottom: ${rhythm(0.5)};
  margin-top: ${rhythm(0.5)};
  padding-top: 10px;
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
`;

const PostPage = (query: postQuery) => {
  const data: postData = query.data.allMarkdownRemark.edges[0].node;

  const postInfo = {
    url: data.frontmatter.slug,
    title: data.frontmatter.title
  };
  const toc: string = data.tableOfContents.replace(
    new RegExp(data.frontmatter.slug, "g"),
    `posts/${data.frontmatter.slug}`
  );

  return (
    <Layout>
      <SEO
        title={data.frontmatter.title}
        description={data.frontmatter.description || data.excerpt}
      />
      <Main>
        <DateStyle>{`${DateUtils.formatDate(
          data.frontmatter.date
        )}`}</DateStyle>
        <Title>{data.frontmatter.title}</Title>
        <BlogTag tags={data.frontmatter.tags} />
        {toc && <PostToc toc={toc} />}
        <Ad />
        <Post dangerouslySetInnerHTML={{ __html: data.html }} css={PostCss} />
        <SNSLink postInfo={postInfo} />
      </Main>
    </Layout>
  );
};

interface postData {
  tableOfContents: string;
  frontmatter: {
    title: string;
    date: string;
    slug: string;
    tags: string[];
    description: string;
  };
  excerpt: string;
  html: any;
}

interface postQuery {
  data: {
    allMarkdownRemark: {
      edges: {
        node: postData[];
      };
    };
  };
}

export const query = graphql`
  query($slug: String!) {
    allMarkdownRemark(filter: { frontmatter: { slug: { eq: $slug } } }) {
      totalCount
      edges {
        node {
          tableOfContents(pathToSlugField: "frontmatter.slug")
          frontmatter {
            title
            date
            slug
            tags
            description
          }
          excerpt
          html
        }
      }
    }
  }
`;

export default PostPage;
