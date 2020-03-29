---
title: "GatsbyでGistのコードを読み込む"
date: "2019/5/26"
slug: install-gist-gatsby
tags: [Gatsby,JavaScript, Gist,Gatsby-plugin]
description: Gatsby TypeScript Gist Gatsby-plugin 
---
## 何をしたか
Gistに書いているコードをGatsbyで読み込みを行うように変更しました。

記事内でソースコードを記載する場合、今までmarkdown内にソースコードを書いていました。
そのままだとソースコードの変更があった場合に変更が面倒なので、Gistにコードを移したという経緯です。

プラグインがあるため、簡単でした。
## インストールと設定
[gatsby-remark-embed-gist](https://www.gatsbyjs.org/packages/gatsby-remark-embed-gist/)というプラグインを使います。
以下のコマンドで導入しましょう。

`yarn add gatsby-remark-embed-gist`

インストール出来たら、gatsby-config.jsに追記します。
```json
{
  resolve: "gatsby-transformer-remark",
  options: {
    plugins: [
      {
        resolve: "gatsby-remark-embed-gist",
        options: {
          username: 'weirdpattern',
          includeDefaultCss: true
        }
      }
    ]
  }
}
```

`username`にはGistのアカウント名を記載します。
`includeDefaultCss`はGistのCSSを有効にするかの設定です。
## 使い方

以下のように記載することで、Gistに書いたソースコードが展開出来ます。
```
`gist:[<username>/]<gist_id>[?file=<gist_file>&highlights=<number|ranges>]`
```

例えば、以下を読み込む場合
```
https://gist.github.com/NakanoMakoto/d65c753d56fbb68df93789273b3b79ff
```

埋め込みしたいmarkdown内で以下のように記載すると展開出来ます。
```
`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=main.ts&highlights=8`
```
`file`には読み込みしたいファイル名を


`highlights`にはハイライトしたい行数を指定します。


`highlights`の値は`1,3`のようにカンマ区切りで指定でき、この場合1行目と3行目がハイライトされます。


また、`1-3`のようにも指定でき、この場合は1行目から3行目までがハイライトされます。

試しに以下のように記載してみましょう
```
gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=main.ts&highlights=1,3,5-7
```

ソースコードが以下のように展開されます。
`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=main.ts&highlights=1,3,5-7`

1行目と3行目、5行目から7行目がハイライトされていますね。

## 注意事項
`gatsby-remark-prismjs`と併用する場合、注意が必要です。

gatsby-config.jsでは`gatsby-remark-prismjs`より上に`gatsby-remark-embed-gist`の設定を記載してください。

競合が起きて上手く動かなくなると公式からアナウンスされています。
## まとめ
今回の記事のまとめとしては以下です。

1. yarn add gatsby-remark-embed-gistでインストール
2. gatsby-configに設定を記載
3. fileにはファイル名を記載
4. highlightsではハイライトしたい行を設定できる。複数行も可

Gistを使うとソースコードの変更履歴も管理できるので、非常に運用が楽になると思いました。

これからも技術系の記事を書く場合は積極的に利用していきたいと思います！