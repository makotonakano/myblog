import { graphql } from "gatsby";
import React from "react";
import BlogLink from "../components/blogLink";
import Layout from "../components/layout";
import SEO from "../components/seo";
import DateUtils from "../utils/dateUtils";
import Ad from "../components/adsense";

const IndexPage = (query: queryProps) => {
  const edges = DateUtils.sortByDate(query.data.allMarkdownRemark.edges);
  return (
    <Layout>
      <SEO
        title="中野's workspace"
        keywords={[
          `programming blog books IT エンジニア プログラミング PHP JavaScript`
        ]}
      />
      {edges.map(edge => {
        const node = edge.node;
        return <BlogLink data={node} key={node.id} />;
      })}
    </Layout>
  );
};

interface queryProps {
  data: {
    allMarkdownRemark: {
      edges: [
        {
          node: {
            id: string;
            excerpt: string;
            frontmatter: {
              title: string;
              date: string;
              slug: string;
              tags: string[];
            };
          };
        }
      ];
    };
  };
}

export const query = graphql`
  query blogPosts {
    allMarkdownRemark(
      filter: { frontmatter: { slug: { ne: null } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            slug
            tags
          }
          excerpt(pruneLength: 160, truncate: true)
        }
      }
    }
  }
`;

export default IndexPage;
