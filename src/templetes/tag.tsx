import React from "react";
import { graphql } from "gatsby";
import BlogLink from "../components/blogLink";
import Layout from "../components/layout";
import SEO from "../components/seo";
import DateUtils from "../utils/dateUtils";

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const edges = DateUtils.sortByDate(data.allMarkdownRemark.edges);

  return (
    <Layout>
      <SEO title={`${tag}についての記事一覧`} isIndex={false} />
      <h1>
        {tag} <small>についての記事一覧</small>
      </h1>
      <p>
        {tag}についての記事一覧です。
        <br />
        現在{edges.length}件の記事が作成されています。
      </p>

      {edges.map(edge => {
        const node = edge.node;
        return <BlogLink data={node} key={node.id} />;
      })}
    </Layout>
  );
};

export const query = graphql`
  query($tag: [String]!) {
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: $tag } } }
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

export default Tag;
