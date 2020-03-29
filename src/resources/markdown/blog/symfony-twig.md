---
title: "SymfonyとTwigを連携する"
date: "2019/10/1"
slug: symfony-twig
tags: [PHP,Symfony,Twig]
description: PHP Symfony Twig
---
[Twig](https://twig.symfony.com/)とはPHP製のテンプレートエンジンです。

公式サイトによると、Twigは**Fast、Secure、Flexible**といった特徴を持つようです。

少し見てみただけですが、直感的かつ柔軟に組めそうな印象を受けました。

SymfonyではテンプレートエンジンとしてTwigを採用しています。

今回はSymfonyとTwigの連携方法について学んだので紹介していきます。

Symfonyのバージョンは4.3です。

## Twigの準備

まずは`Twig`を使用するために以下のコマンドを実行してください

```
composer require twig
```

無事コマンドが成功すると、`templates`ディレクトリと`config\packages\twig.yaml`が作成されているのがわかると思います。

`templates`ディレクトリにはTwigファイルを置きます。

`config\packages\twig.yaml`はTwigの基本的な設定値が記述されています。

```yaml:title=twig.yaml
twig:
    default_path: '%kernel.project_dir%/templates'
    debug: '%kernel.debug%'
    strict_variables: '%kernel.debug%'
```

yaml内にある`default_path`の値を変更することで、Twigファイルを置くディレクトリ構成を変更することが出来ます。


## ControllerとTwigの連携を行う
[Symfonyルーティングの仕組み](symfony-routing)で触れた通り、リクエストを受けレスポンスを返すControllerのコードは以下のようになります。

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

これをTwigと連携させてみましょう。

Twigと連携するために、`AbstractController`を継承してください。

`AbstractController`を継承することによって、`$this->render();`という、Twigを表示するためのメソッドが利用できるようになります。

また、今回は表示するためのTwigファイルは`templates\views\test.html.twig`とし、Controllerから`test`という値を受け取って表示するようにします。

```php:title=TestController.php
<?php
namespace App\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
class TestController extends AbstractController
{
    /**
     * @Route("/")
     */
    public function test()
    {
        return $this->render('views/test.html.twig', [
            'test' => 'これはテストです',
        ]);
    }
}
```
```php:title=test.html.twig
<h1>{{ test }}</h1>
```

ここまで出来たらサーバを起動し、画面が以下の表示されることが確認できると思います。

![テストページ表示](/../../images/blog/symfony-twig/view.png)

このように簡単にSymfonyからTwigを利用できるようになっているので、是非トライしてみてください。