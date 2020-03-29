---
title: "Symfonyルーティングの仕組み"
date: "2019/9/26"
slug: symfony-routing
tags: [PHP,Symfony]
description: PHP Symfony
---

Symfonyでルーティングの仕組みを調べました。

Symfonyにはルーティングの方法がいくつかあります。

その中で今回はyamlでルーティングを指定するやり方、annotationで指定するやり方の二つを紹介します。

なお、Symfonyのバージョンは4.3です。

## yamlで指定する
まずはyamlで指定する方法です。

symfonyのルーティングの中で最もポピュラーな方法かなと思います。

symfonyプロジェクトを開き、config\routes.yamlを開いてください。

デフォルトの状態だと以下のようになっているはずです。

```yaml:title=routes.yaml
#index:
#    path: /
#    controller: App\Controller\DefaultController::index
```

コメントアウトされていますが、`/`　（つまりホームページ！）にアクセスした場合、`DefaultController`の`index`メソッドを実行するということを表しています。

このyamlファイルを以下のように変更してみます。
```yaml:title=routes.yaml
index:
    path: /
    controller: App\Controller\TestController::test
```

Controllerは以下のように定義します。
```php:title=TestController.php
<?php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
class TestController
{
    public function test()
    {
        return new Response('testメソッドが実行されました');
    }
}
```

サーバを起動し、実際にアクセスしてみると以下のような表示になると思います。

![テストページ表示](/../../images/blog/symfony-routing/testpage.png)

### スラグを設定する
スラグの設定方法は実に簡単です。

まずは`routes.yaml`を以下のように変更します。
```yaml:title=routes.yaml
index:
    path: test/{slug}
    controller: App\Controller\TestController::test
```
次に`test`メソッドもスラグから渡ってきた値を受け取ることができるように修正します。
```php:title=TestController.php
    public function test($slug)
    {
        return new Response("${slug}がスラグに指定されました");
    }
```

この状態で`test/hoge`や`test/huga`などにアクセスすると、表示が変わることがわかると思います。

![スラグ対応ページ表示](/../../images/blog/symfony-routing/hoge.png)

## annotationで指定する
annotationで指定する方法も、基本的にはyamlで指定する方法と変わりません。

まずは追加で`annotations`をインストールします。
```
$ composer require annotations
```

annotationを使用するためには以下をuseした状態で
```php
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
```

呼び出したいメソッドの上部に、以下の記述を追加します。  
```php
/**
* @Route("/")
*/
```


ソースコードは以下のようになります。
```php:title=TestController.php
<?php
namespace App\Controller;
use Symfony\Component\HttpFoundation\Response;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
class TestController
{
    /**
     * @Route("/")
     */
    public function test()
    {
        return new Response("annotationを使用しました。");
    }
}
```

`/`にアクセスすると、無事表示されると思います。

スラグを設定したい場合は以下のようにします。
```php:title=TestController.php
    /**
     * @Route("/test/{slug}")
     */
    public function test($slug)
    {
        return new Response("${slug}がスラグに指定されました");
    }
```