---
title: "Vue.jsでSPA"
date: "2019/5/21"
slug: vue-spa
tags: [SPA, Vue.js]
description: SPA, vue-router, Vue.js
---
Vue.jsでSPAやってみたので、備忘録です。


## 何するの？
最近流行りのSPAを、**Vue.js**と**vue-router**を使って実装してみました。  
今回は環境構築までを行います。  
環境構築は**vue-cli**を使いました。

バージョンは以下の通りです。
* Vue.js : 3.7.0

## SPAってなんぞや
まず、初めにSPAについて軽く説明しておきます。  
Wikipediaさん曰く
>　シングルページアプリケーション（英: single-page application、SPA）とは、単一のWebページのみから構成することで、デスクトップアプリケーションのようなユーザ体験を提供するWebアプリケーションまたはWebサイトである。  
必要なコード（HTML、JavaScript、CSS）は最初にまとめて読み込むか[1]、ユーザの操作などに応じて動的にサーバと通信し、必要なものだけ読み込みを行う。  
出典: [シングルページアプリケーション](https://ja.wikipedia.org/wiki/%E3%82%B7%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%9A%E3%83%BC%E3%82%B8%E3%82%A2%E3%83%97%E3%83%AA%E3%82%B1%E3%83%BC%E3%82%B7%E3%83%A7%E3%83%B3)

とあります。

なんだか良くわかったような、よくわからないような。。。  

個人的な解釈としては、SPAでサービス開発を行うことにより、従来のwebサービスでは

1. **ユーザーが何らかのアクションを実行**
2. **サーバーへリクエストを飛ばす**
3. **サーバー側で処理を行い、結果を生成して返却**
4. **クライアント側でまるっと描写**

といった流れだったものを

1. **ユーザーが何らかのアクションを実行**
2. **アクションに対応するデータ処理のみをサーバーへ要求**
3. **返却したデータをクライアント側で処理**
4. **差分を描写**

とすることができるものとして理解しています。

差分のみ描写するので、ページをまるっと置き換えた場合に比べてパフォーマンスの向上が見込めます。  
また、ページ描画までの待ち時間が減少することにより、ユーザーのストレスが減少も期待できます。    
まだまだ勉強中の身ですが、非常に興味深いですね。  

SPAに関しては以下の記事が参考になりました。  
[SPA(Single Page Application)の基本](https://qiita.com/takanorip/items/82f0c70ebc81e9246c7a)

## 環境構築
初めに**Vue.js**と**vue-router**を扱うための環境を構築します。  
CLIツールである[vue-cli](https://cli.vuejs.org/)をインストールします。

```
yarn global add @vue/cli
```

以下のコマンド打って、表示がされるか確認して下さい。

```
vue --version
```

バージョンが表示されたら準備完了です！

早速プロジェクトを作りましょう！
```
vue create <プロジェクト名>
```

cliツールが立ち上がるので、表示される選択肢の中から任意の構成を選んでいきます。

```
Vue CLI v3.7.0
? Please pick a preset: (Use arrow keys)
　default (babel, eslint)
>  Manually select features
```

プロジェクト構成です。

ここでは`Manually...`を選択します。  
Vue CLI v3.0.0から関連モジュールがインストールできるようになりました。  
vue-routerも導入できるので、`default`ではなく、こちらを選択します。

```
Check the features needed for your project:
>(*) Babel
 (*) TypeScript
 ( ) Progressive Web App (PWA) Support
 (*) Router
 ( ) Vuex
 ( ) CSS Pre-processors
 (*) Linter / Formatter
 ( ) Unit Testing
 ( ) E2E Testing
```
インストールするものを選択します。  
spaceキーで選択肢のオンオフが出来るらしいので、好きなものを選択していきます。  
自分は上記の構成にしました。

あとは選んだオプションに応じて色々質問があり、全てに回答するとインストールが開始されます。

完了後、作成されたプロジェクトに移動して、起動コマンドを入力しましょう！
```
yarn serve
```
画面の読み込みが始まります。

`http://localhost:8080/`で以下の画面が確認できます。   
vue-routerも導入されているので、環境構築は完了です。

![環境構築完了](/../../images/blog/vue-spa-1/vue-welcome.png)

## 実際に動かしてみる

実際に挙動を少し確認しましょう。

まずはsrc直下にある`main.ts`を開きます。

`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=main.ts&highlights=8`

`router`の読み込みを行なっているのが分かりますね！

ではそのrotuerはどのように書かれているかを見てみましょう！

`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=router-default.ts&highlights=12-14,17-22`

なんとなく雰囲気で分かるかも知れません。

上記のページは以下のように動きます。

- `/`へアクセスした場合、`./views/Home.vue`の表示を行う
- `/about`へアクセスした場合、`./views/About.vue`の表示を行う。

では試しに`./views/`直下に`Page2.vue`を作ってみましょう

`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=Page2.vue`

これを読み込むように設定してみたいと思います。

aboutを読み込みしている部分を`page2`に変更してください。
`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=router-after.ts&highlights=17-19`

あとは遷移したいページで下記の記載をすればOKです。

App.vueに以下の記述を追加しましょう
```
<router-link to="/page2">Page2</router-link>
```

こんな感じになると思います。
`gist:NakanoMakoto/d65c753d56fbb68df93789273b3b79ff?file=App.vue&highlights=5`

あとはファイルを保存し、ページ遷移するだけです。

SPAの雰囲気が掴めたかと思います。

## まとめ
おおまかに、vueでSPAを体験するためには

1. vue-cliでプロジェクト作成は簡単
2. SPAにはvue-routerを使う
3. router.tsにルーティングの設定を記載
4. router-linkタグでどこに遷移できるかが記述できる

とやればOKです。

色々公式が用意していくれているおかげで、簡単に導入することが出来ました。

