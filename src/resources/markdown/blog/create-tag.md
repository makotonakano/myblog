---
title: "GatsbyJSでタグ単位での記事絞りこみを実装する"
date: "2019/5/8"
slug: create-tag
tags: [Gatsby,JavaScript, GraphQL]
description: Gatsby TypeScript GraphQL
---
ブログの機能として、記事をタグごとに絞り込みできるようにしたいなあと思い、実装してみました。  
大まかに分けて、以下の工程で実装しました。
1. markdownファイルにタグ登録する
2. gatsby-node.jsでタグを取得し、ページを生成
3. 動的に生成したページ上でタグから記事を取得し、出力

少し多いですが、やっていきましょう。

## markdownファイルにタグを記載する
それぞれの記事にタグを設定します。
複数存在する可能性があるので、配列で指定します。
```
tags: [foo, bar]
```

## 動的にページを生成する
### GraphQLでタグ一覧を取得
指定したtagはgroupクエリで纏めることができます。  
[http://localhost:8000/___graphql](http://localhost:8000/___graphql)でクエリを試すことができます。
```graphql
query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
      }
    }
}
```
このクエリを実行すると、以下のような結果が出力されます。  
```json
{
  "data": {
    "allMarkdownRemark": {
      "group": [
        {
          "fieldValue": "foo"
        },
        {
          "fieldValue": "bar"
        }
      ]
    }
  }
}
```
group配列の各fieldValueの値が、先ほどtags配列で指定した値であることが分かりますね。
```
tags: [foo, bar]
```

### gatsby-node.jsで動的にページを生成
先ほどのtag一覧取得クエリを`gatsby-node.js`で記述し、動的にページを生成しましょう。  
`createPage`で動的にページを生成しています。
```javascript:title=gatsby-node.js
const path = require("path");

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return graphql(`
    {
      allMarkdownRemark {
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `).then(result => {
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
```

この場合、URLは`tags/{タグ名}`です。  
また、生成したページに対して`tag`の値を渡しています。
```json
context: {
          tag: tag.fieldValue
         }
```

## 動的に生成したページ上でタグから記事を取得する

それではページの基となる`tag.tsx`の中身を記載していきましょう。  
動的に生成するページはtempletes配下に記載するのが慣習です。

```typescript:title=tag.tsx
import React from "react";
import { graphql } from "gatsby";
import BlogLink from "../components/blogLink";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Tag = ({ pageContext, data }) => {
  const { tag } = pageContext;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <SEO title={`${tag}についての記事一覧`} />
      <h1>
        {tag} <small>についての記事一覧</small>
      </h1>

      {edges.map(edge => {
        const node = edge.node;
        return <BlogTag tags={node}.frontmatter.tags} key={node.id} />;
      })}
    </Layout>
  );
};

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
        }
      }
    }
  }
`;

export default Tag;
```

渡されたタグを基に、データを取得しています。
GraphQLのクエリの中で、`$tag`という記述がありますが、これは変数で`gatsby-node.js`で指定した値が入ります。
tags配列の中に`$tag`の中身と合致するものがあれば取得するようなクエリです。
```graphQL
filter: { frontmatter: { tags: { in: $tag } } })
```
また、取得できたクエリを日付の降順で取得するようにしており、新しい記事が先頭に出るようにしています。
```graphQL
sort: { order: DESC, fields: [frontmatter___date] }
```
取得できた値はBlogTagコンポーネントへ渡しており、この中でデータをもとにタグを生成しています。
```TypeScript
{edges.map(edge => {
        const node = edge.node;
        return <BlogTag tags={node}.frontmatter.tags} key={node.id} />;
      })}
```

特別な処理はしていないので別段解説はしませんが、ソースを記載しておきます。

```TypeScript:title=BlogTag.tsx
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
  font-size: 0.5rem;
  font-weight: bold;
  text-decoration: none;
  color: black;
  box-shadow: none;
`;

const Tag = styled.li`
  width: 4rem;
  text-align: center;
  margin: 0.5rem 0.5rem 0.5rem 0;
  border: 1px solid;
  border-color: black;
  border-radius: 5rem;

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
              {tag}
            </Link>
          </Tag>
        );
      })}
    </Nav>
  );
};

export default BlogTag;
```

## 感想
これでタグを動的に生成することができました。    
タグの生成部はコンポーネントとして切り出しておくと記事一覧や記事の詳細ページにも簡単に追加することができるので、切り出しておいて損はないなと感じました！
