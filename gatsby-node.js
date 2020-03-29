/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path");
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark(filter: { frontmatter: { slug: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `).then(result => {
    // query result
    // console.log(JSON.stringify(result, null, 4));
    result.data.allMarkdownRemark.edges.map(edge => {
      const node = edge.node;
      // to see page url
      // console.log("create page", `posts/${node.frontmatter.slug}`);
      createPage({
        path: `posts/${node.frontmatter.slug}`,
        component: path.resolve("./src/templetes/post.tsx"),
        context: {
          slug: node.frontmatter.slug
        }
      });
    });

    // タグ一覧の生成
    result.data.allMarkdownRemark.group.map(tag => {
      createPage({
        path: `tags/${tag.fieldValue}`,
        component: path.resolve("./src/templetes/tag.tsx"),
        context: {
          tag: tag.fieldValue
        }
      });
    });
  });
};
