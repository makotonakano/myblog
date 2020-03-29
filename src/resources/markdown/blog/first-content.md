---
title: "GatsbyJSでブログを作成しました"
date: "2019/5/5"
slug: first-post
tags: [Gatsby,JavaScript, Blog]
description: Gatsby TypeScript Blog
---
GWで時間が有り余っていたので、学習がてらGatsbyJSでブログを作成してみました。  
wordpressでのブログは書き味が馴染めなくて完全に放置していたのでちょうど良い機会でした。

### GatsbyJSってなに？
静的サイトジェネレータです。  
Reactがベースになっていて、表示速度を早める為に色々な工夫がされているらしいです。  

内部実装についてはまだ勉強中ですが、遷移がサクサクなのはかなり気分が良いです。  
速さは正義ですね。

### なぜGatsbyJSにしたか
ブログを作り直すにあたり、以下のことを実現したいなと思い、技術選定を行なっていました

1. 表示速度が早い
2. gitで管理できる
3. ローカルでの開発がしやすい
4. 拡張しやすい

要はストレスなく記事が書けて、拡張したかったらガリガリコードを書いて拡張できるというのが理想でした。  
色々と技術選定を行い、[HUGO](https://gohugo.io/)なども選択肢としてはあったのですが、最終的に慣れたJavaScriptで書けるGatsbyJSを選定しました。

### 作ってみてどうか
とりあえずなにも考えずに作ってみて、LightHouseで計測してみました。  
まだまだ描画に関して改善の余地はありますが、中々良いパフォーマンスが出ているのではないかと思います。

![パフォーマンス](/../../images/blog/first-content/performance.png)

記事へ飛ぶ際のロードが非常に早く、ローカル開発中はついついホーム画面と記事の詳細画面を行ったり来たりしちゃいました。

npmコマンドを打つだけでローカルの開発環境が立つのでいちいち本番環境・検証環境と立てる必要がなく、色々試しながら記事が書けるのが楽です。  
markdown記法で記事が書けるのも嬉しいポイントの１つ。　　

また、ホスティングサービスはNetlifyを使用しており、gitにpushされたタイミングで自動ビルドしてくれます。  
本番へ上げるストレスが皆無です。（ここら辺は他の静的サイトジェネレータでも可能ですが）

まだ書き始めたばかりですが、非常に満足しています。
もっと早く始めれば良かったなって思います。

### ここからやりたいこと
1. 自己紹介ページの作成
2. 記事検索機能を作る
3. 記事のタグ付けができるように
4. パフォーマンスをあげたい

ぐらいが暫定的な目標です。
ゆるりと調べながら、より良いものにしていければいいなって思ってます。

### ブログを作る際に参考にしたもの
最後に、ブログを作るにあたりいくつか参考にしたページを乗っけておきます。  
- [公式サイト（英語）](https://www.gatsbyjs.org/)
- [Reactベース静的サイトジェネレータGatsbyの真の力をお見せします](https://qiita.com/uehaj/items/1b7f0a86596353587466)
- [WordpressブログをGatsby+Netlifyでリプレースした話。](https://ver-1-0.net/2019/01/10/blog-renewal-by-gatsby)