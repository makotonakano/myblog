---
title: "GatsbyJSでサイトマップを作成する"
date: "2019/5/11"
slug: create-sitemap
tags: [Gatsby,JavaScript,Gatsby-plugin]
description: Gatsby SiteMap SEO
---

そういやGatsbyJSでサイトマップでどうやって作るんだということで導入してみました。

## gatsby-plugin-sitemapをインストール
サイトマップを作成するために、`gatsby-plugin-sitemap`というプラグインが用意されています。  
npmもしくはyarnでインストールします。
```shell
npm install --save gatsby-plugin-sitemap

or

yarn add gatsby-plugin-sitemap
```
インストールが完了したことを確認出来たら早速設定していきます。

## とりあえず使う

siteMetadataの項目に`siteUrl`を追加します。

```javascript:title=gatsby-config.js
siteMetadata: {
    siteUrl: `https://nakawork.net/`
},
plugins: [`gatsby-plugin-sitemap`]
```

追加し終えたら`npm run build`を実行してください。  
publicディレクトリ直下に`sitemap.xml`が追加されていることが確認できると思います。  
とりあえずサイトマップを作成したいだけの場合は、これでOKです。

このプラグインはproduction用ビルドの時だけ動きます。  
サイトマップの中身をテストしたい場合は`gatsby build && gatsby serve`を実行すると良いです。

## オプション設定
このプラグインでは、デフォルトで以下のように設定されています。  

```javascript
export const defaultOptions = {
  query: `
    {
      site {
        siteMetadata {
          siteUrl
        }
      }
      allSitePage {
        edges {
          node {
            path
          }
        }
      }
  }`,
  output: `/sitemap.xml`,
  exclude: [
    `/dev-404-page`,
    `/404`,
    `/404.html`,
    `/offline-plugin-app-shell-fallback`,
  ],
  createLinkInHead: true,
  serialize: ({ site, allSitePage }) =>
    allSitePage.edges.map(edge => {
      return {
        url: site.siteMetadata.siteUrl + edge.node.path,
        changefreq: `daily`,
        priority: 0.7,
      }
    }),
}
```

上記の設定を変更するには`gatsby-config.js`に変更を加えます。  
例えば、出力されるサイトマップのファイル名と、除外するURLを追加するには以下のように設定します。

```javascript:title=gatsby-config.js
plugins: [
  {
    resolve: `gatsby-plugin-sitemap`,
    options: {
      output: `/hoge-sitemap.xml`,
      exclude: [`/path/to/page`]
    }
  }
]
```

これでビルド時のサイトマップのファイル名は`hoge-sitemap.xml`となります。  
また、`/path/to/page`というurlがサイトマップから除外されます。

## 感想
サイトマップの作成が予想以上に簡単に出来ました。  
GatsbyJSではプラグインが豊富に用意されています。  
気を配るべきサイトのデザインや記事の作成に集中できるので、非常に嬉しいですね。
