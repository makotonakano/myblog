import React from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

const ItemStyle = css`
  text-decoration: none;
  color: #222;

  &:hover {
    color: teal;
  }
`;

const H3 = styled.h3`
  font-size: 20px;
`;

const AllTagPage = (query: queryProps) => {
  const tags = sortTagsByCount(query.data.allMarkdownRemark.group);
  return (
    <Layout>
      <SEO title="タグ一覧" keywords={[`alltags`]} />
      <h1>タグ一覧</h1>
      <p>
        当ブログで扱っている記事のタグ一覧です。
        <br />
        {tags[0].fieldValue}, {tags[1].fieldValue}, {tags[2].fieldValue}
        など、様々なテーマで記事を作成しています。
        <br />
        タグをクリックすると、クリックしたタグの記事一覧ページへ飛ぶことが出来ます。
      </p>
      <ul>
        {tags.map((tag, index) => {
          return (
            <li key={index}>
              <Link to={`/tags/` + tag.fieldValue} css={ItemStyle}>
                <H3>{tag.fieldValue}</H3>
              </Link>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

const sortTagsByCount = (
  tags: {
    fieldValue: string;
    totalCount: number;
  }[]
) => {
  return tags.sort((a, b) => {
    const aCount = a.totalCount;
    const bCount = b.totalCount;

    if (aCount < bCount) return 1;
    if (aCount > bCount) return -1;
    return 0;
  });
};

interface queryProps {
  data: {
    allMarkdownRemark: {
      group: [
        {
          fieldValue: string;
          totalCount: number;
        }
      ];
    };
  };
}

export const query = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default AllTagPage;
