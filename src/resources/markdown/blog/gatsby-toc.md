---
title: "GatsbyJSで目次を実装する"
date: "2019/7/15"
slug: gatsby-toc
tags: [Gatsby,JavaScript]
description: Gatsby TypeScript GraphQL, 目次, TOC, tableOfContent
---
## はじめに
記事内に目次機能を導入したいと思い、実装してみました。

当初は[gatsby-remark-toc](https://github.com/DSchau/gatsby-remark-toc)を利用してサクッと作ろうとしたのですが、動かなかったので`GraphQL`を使って導入しました。  
大まかに、以下の工程で実装できます。
1. GraphQLで目次取得
2. gatsby-remark-autolink-headersで見出しにidを入れる

## GraphQLで目次取得
Gatsbyでは`tableOfContents`というクエリを投げることで目次一覧を取得することが出来ます。
```
  query {
    allMarkdownRemark {
      edges {
        node {
          tableOfContents(pathToSlugField: "frontmatter.slug")
          frontmatter {
            slug
          }
        }
      }
    }
  }
```
記事毎の目次の表示を実装したい場合は`pathToSlugField`でスラグを指定することで絞り込みを行うことができます。

結果は以下のようになります。
```
{
  "data": {
    "allMarkdownRemark": {
      "edges": [
        {
          "node": {
            "tableOfContents": "<ul>\n<li>
            <a href=\"/gatsby-toc/#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB\">はじめに</a>
            </li>\n<li><a href=\"/gatsby-toc/#graphql%E3%81%A7%E7%9
            B%AE%E6%AC%A1%E5%8F%96%E5%BE%97\">GraphQLで目次取得</a></li>\n<li>
            <a href=\"/gatsby-toc/#gatsby-remark-autolink-headers
            %E3%81%A7%E8%A6%8B%E5%87%BA%E3%81%97%E3%81%ABid%E3%82%92%E5%
            85%A5%E3%82%8C%E3%82%8B\">gatsby-remark-autolink-headersで見出しにidを入れる
            </a></li>\n<li>
            <a href=\"/gatsby-toc/#%E3%81%BE%E3%81%A8%E3%82%81\">まとめ</a>
            </li>\n</ul>",
            "frontmatter": {
              "slug": "gatsby-toc"
            }
          }
        }
      ]
    }
  }
}
```

これでテーブルタグが取得できたのであとは表示するだけだと嬉しいのですが、記事の各見出しにidを挿入する必要があります。

これに関しては`gatsby`のプラグインを利用することで簡単に出来ます。
## gatsby-remark-autolink-headersで見出しにidを入れる
[gatsby-remark-autolink-headers](https://www.gatsbyjs.org/packages/gatsby-remark-autolink-headers/)を利用することで簡単に記事の各見出しにidを挿入することが出来ます。

まずはインストール
```
yarn add gatsby-remark-autolink-headers1
```

あとは他のプラグインと同様に`gatsby-config.js`内に設定するだけです。
```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-autolink-headers`],
      },
    },
  ],
}
```

注意点として、**prismjsを設定している場合、それより上に`gatsby-remark-autolink-headers`を設定しなければいけません。**

```javascript:title=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
            `gatsby-remark-autolink-headers`,
            `gatsby-remark-prismjs`
        ],
      },
    },
  ],
}
```

上記のような形ですね。

設定した後、`gatsby develop`して各見出しの要素を見ると、idが挿入されています。

```html
<h2 id="gatsby-remark-autolink-headersで見出しにidを入れる">
    gatsby-remark-autolink-headersで見出しにidを入れる
</h2>
```

これで目次の生成と各見出しにidの挿入が出来たので、あとは表示するだけです。
`GraphQL`で取得した目次を`dangerouslySetInnerHTML`を使って表示します。
```html
<div 
dangerouslySetInnerHTML=
    {{ 
        __html: query.data.allMarkdownRemark.edges[0].node.tableOfContents 
    }} 
/>
```

以下のようにリンクが表示されているはずです。
<ul>
<li><a href="/posts/gatsby-toc/#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB">はじめに</a></li>
<li><a href="/posts/gatsby-toc/#graphql%E3%81%A7%E7%9B%AE%E6%AC%A1%E5%8F%96%E5%BE%97">GraphQLで目次取得</a></li>
<li><a href="/posts/gatsby-toc/#gatsby-remark-autolink-headers%E3%81%A7%E8%A6%8B%E5%87%BA%E3%81%97%E3%81%ABid%E3%82%92%E5%85%A5%E3%82%8C%E3%82%8B">gatsby-remark-autolink-headersで見出しにidを入れる</a></li>
<li><a href="/posts/gatsby-toc/#%E3%81%BE%E3%81%A8%E3%82%81">まとめ</a></li>
</ul>

あとはcssでお好みのデザインを施してください。

## まとめ
gatsbyで目次を作る方法のまとめとしては以下の通りです。

1. GraphQLのtableOfContentsクエリで目次一覧を取得
2. gatsby-remark-autolink-headersで記事見出しにidを自動挿入
3. dangerouslySetInnerHTMLを使って目次一覧を表示

少し手順は複雑ですが、工程自体は少ないのでぜひ試してみてください！