---
title: "Symfonyの勉強を始めたので概要をまとめてみる"
date: "2019/5/31"
slug: new-to-symfony
tags: [PHP,Symfony]
description: PHP Symfony reference
---
Symfonyを習得しなきゃいけなくなったので、勉強始めました。

APIサーバとして使う予定なので、viewテンプレートについては一旦置いておいて、基本的な内部構造について学びました。

今回学び始めるにあたり、公式のリファレンスが出ていたのでそちらを参考にしました。  
下記にリンクを置いておきます。

[quick_tour](https://symfony.com/doc/current/quick_tour/the_big_picture.html)

バージョンはSymfony3.4です。  

## Symfonyって何？

PHPのフレームワークです。

今流行りの[laravel](http://laravel.jp/)はSymfonyのコンポーネントが多数使われているらしいです。

ざっと見た限り、Laravelと文法が似ているところが多く、過去にLaravelやられていた方は理解しやすいのではないでしょうか。

個人的な意見ですが、Laravelは構成が単純で分かりやすく、Symfonyは構成が重厚な印象を受けました。

規約がしっかりしているのでSymfonyは大規模開発に向くかな？と思いました。


## 用語説明

### Controller
まずは基本のControllerから

Controllerはエントリポイントに使われるPHPファイルです。

ここでユーザーからのリクエストを受け取り、加工してデータを返します。

ControllerというSuffixがクラス名につきます。

こんな感じです。
```
class DefaultController extends Controller
```

### Action
Controller内に定義されるメソッドはActionと呼ばれます。

[MVC](https://ja.wikipedia.org/wiki/Model_View_Controller)の定義通り、Actionは入力を受け取って結果を返すだけなので原則とても短いコードになります。

`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=DefaultController.php&highlights=6-8`

### Routing

Actionの上に **@Route** というアノテーションがあり、これがルーティング定義です。

この場合、ルート("/")にアクセスした場合に実行されるActionという意味ですね！

通常のコメントとは異なり、`\**`から始まっていることが特徴です。

nameはoptionalですが、ページのリンクなどで使われます。

ハイライトしてる部分がそれに該当します。
`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=DefaultController.php&highlights=3-5`

URLリクエストから値を受け取る場合は以下のように設定します。
`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=routing.php&highlights=3-5`

例えば`localhost:8000/hello/nakano`というリクエストがされた場合、`nakano`が$nameに詰められviewへ送られます。

viewファイルでは以下のように展開します。
`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=hello.html.twig&highlights=4`

下記のようにすればリダイレクトすることができます。
`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=Redirect.php&highlights=7`

第一引数に"hello"を指定していますが、これがRouteのname部分です。

第二引数に定義した値がリダイレクト先のページに渡されます。

### error

**404エラー**の場合
```
throw $this->createNotFoundException();
```

**500エラー**の場合
```
throw new \Exception("something going on!!!);
```

### request

リクエストから値を取得するには以下のようにします。

`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=getFromRequest.php&highlights=8,11,14`

セッションに値を詰めるには
```
$session->set("foo", "bar");
```

セッションから値を取り出すには
```
$session->get("foo");
```

第二引数を指定すると、値が存在しなかった場合の挙動が定義出来ます。
```
$session->get("foo", "default");
```

フラッシュメッセージ(次のリクエストの間まで一時的に保存する値)の追加方法は以下です。
```
$this->addFlash("notice", "this will be erased soon");
```

これを取り出すには以下のようにします。
`gist:NakanoMakoto/52b5dfd184caaf206a20f438f1e51605?file=flash-message.php`


### env
開発環境や本番環境など、アプリケーションを動かす際に異なる環境で動かすことは多いと思います。

Symfonyは開発用（`dev`）と本番用（`prod`）で環境ごとに異なる設定を定義することが出来ます。

開発用の設定は`config_dev.yml`に、本番用は`config_prod.yml`を使います。

開発用と本番用で環境情報を共通にしたいものがある場合は`config.yml`を使うと共通の設定を定義することが出来ます。

上書きしたい設定がある場合は、下記のように各ファイルでoverrideします。

```
# config_dev.yml
imports:
    - {resource: config.yml} 
hogehoge:
    hoge: true
```

上記の場合、`config.yml`の`hogehoge`の定義を上書きしています。

## まとめ

だいぶ長くなりましたが、ざっくり概要について纏めました。

ファイル構成などは長くなったのでスキップしました。  
別記事に纏めたいと思います！  
DBとの連携なども纏めていきたいですね。

また、今回はバージョン3.4用のリファレンスで学んだのですが、最新は4系らしいのでそちらとの差異も確かめていきたいところです。

今回はここまで。