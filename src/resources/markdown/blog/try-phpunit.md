---
title: "PHPUnitでテストコードを書いて実行するまで"
date: "2019/7/17"
slug: try-phpunit
tags: [PHP, PHPUnit, UnitTest]
description: PHP, PHPUnit, phpunit, php, UnitTest, test
---

## はじめに
PHPのテストツールであるPHPUnitを使ってテストコードを書いて実行するまで試します。

composerでインストールする～実際にテストを動かしてみるまでを扱います。

composer自体のインストール方法については下記を参考にしてみてください。

- [Composer を Windows にインストールする手順](https://weblabo.oscasierra.net/php-composer-windows-install/)
- [macOS に composer をインストールする](https://qiita.com/tomk79/items/e6e1db94ea8b661b1e86)

そもそもcomposerって何？って方は↓
- [公式サイト](https://getcomposer.org/)
- [composerとは](https://qiita.com/atwata/items/d6f1cf95ce96ebe58010)
  
## PHPUnitとは
PHPのテストツールです。

システム開発において、テストは欠かせません。

変更した箇所がきちんと要件を満たしており、既存の機能に影響を与えていないかを都度都度テストする必要があります。

テストは修正の規模に関係なく、どんなに小規模の修正であっても必要です。

ただ、毎回人の手でテストするのでは骨が折れるし、ミスが発生する可能性がありますよね？

そこで単体テスト規模のテストをコードで書き、自動化するためのツールが開発されました。

そのうちの一つがPHPUnitです。

使いこなすことが出来ればプログラムの信頼性を高めることができ、変更が既存の機能に影響を与えていないと証明できるようになります。

安心して夜眠れるようになり、寝不足が解消され、結果として午前中のパフォーマンスが鰻登り！......かもしれません。

[公式サイト](https://phpunit.readthedocs.io/ja/latest/index.html)

## PHPUnitを試す
では早速PHPUnitの実行環境を整備しましょう！

今回はcomposerで導入していきます。

### PHPプロジェクトの作成
まずはプロジェクトを作成します。

任意のディレクトリにて以下のコマンドを実行します。
```
composer init
```

対話シェルで質問に答えていくと`composer.json`が作成されます。

次にphp-unitを導入します。

開発時にしか使用しないものなので`require-dev`に入れます。

```
composer require --dev phpunit/phpunit
```

`vendor`ディレクトリを見ると`vendor\bin\phpunit`が出来ているはずです。

### 実行ファイルとテストファイルの作成
次に実行ファイルとテストファイルを作成します。

今回のケースではディレクトリ構成を以下のようにします。

```
root/
　├ src/
　│　　└　Sample.php
　├ test/
　│　　└　SampleTest.php
　├ vendor/
　└ composer.json
```
`src`配下に実装を配置し、`test`配下にテストファイルを配置するようにします。

phpunitではテストファイルは**テストしたいファイル名Test.php**というファイル名を付けるのが一般的です。

今回はテストしたい対象が`Sample.php`なので、テストファイルは`SampleTest.php`としています。

### composer.jsonとphpunit.xmlの編集
作成した`Sample.php`をuse文で使えるようにするために、`composer.json`でautoloadの設定を行います。
```json:title=composer.json
"autoload": {
    "psr-4": { "App\\": "src" }
},
```
上記のように設定した後、`composer dump-autoload`してvendor配下に`autoload.php`が出来上がればOKです。

最後にphpunit.xmlを下記のように編集しましょう。
```xml:title=phpunit.xml
<?xml version="1.0" encoding="UTF-8" ?>
<phpunit colors="true"
         verbose="true"
         bootstrap="vendor/autoload.php">
    <testsuites>
        <testsuite name="Sample">
            <directory>test</directory>
        </testsuite>
    </testsuites>
</phpunit>
```
`<directory>`にはテストしたいディレクトリを設定します。

今回は`test`ディレクトリ配下なので`<directory>test</directory>`とします。

また、`bootstrap`に先ほど作成された`autoload.php`を指定することで、テストファイル内でuse文を使えるようになります。

ここまで出来たら環境構築は終了です。

実際にテストを書いてみましょう。

### 実装
`Sample.php`を以下のように実装したものとします。
```php:title=Sample.php
<?php
declare(strict_types=1);
namespace App;

class Sample
{
    public function hello() {
        return "Hello World";
    }
}
```

Sampleクラスのhelloメソッドを呼び出すと"Hello World"が返るようになっていますね。

これに対する`SampleTest.php`の実装は下記のようにします。

```php:title=SampleTest.php
<?php

use PHPUnit\Framework\TestCase;
use App\Sample;

class SampleTest extends TestCase
{
    public function testReturnHello()
    {
        $sample = new Sample();
        $result = $sample->hello();

        $this->assertEquals("Hello World", $result);
    }
}
```

解説は後述するので、何となく雰囲気でOKです。

この状態で`vendor/bin/phpunit`とするとテストが実行され、成功するのが確認出来ると思います。

### コードの解説
先ほど書いたテストコードの解説を行います。

テストをするには対象となるクラスを呼び出せるようにする必要があるため、`use`文を使います。  
PHPUnitでテストケースを書く殆どの場合はテストクラスが`PHPUnit\Framework\TestCase`を継承している必要があるので、これも呼び出します。
`extends TestCase`を忘れずに
```php
use PHPUnit\Framework\TestCase;　// これを継承する
use App\Sample; // テスト対象

class SampleTest extends TestCase
```

テストコードは下記のように記載します。  
メソッドはpublicで、**testテストしたい内容**とします。  
下記では、Sampleクラスのhelloメソッドを呼び出した結果を`$result`に入れています。  

PHPUnitでは、`$this->assertEquals(期待する値, テスト対象);`とすることでテストを行えます。  
今回はhelloメソッドの戻り値はHello Worldであることを期待しているので、下記のように記載しています。
```php
    public function testReturnHello()
    {
        // テスト対象の呼び出し
        $sample = new Sample();
        // メソッド実行
        $result = $sample->hello();

        $this->assertEquals("Hello World", $result);
    }
```
## まとめ
PHPUnitはPHPの単体レベルのテストツールです。

composerでインストールし、phpunit.xmlの設定を行えばすぐに使えるようになります。

テストファイル名は「テストしたいファイル名Test.php」テストメソッドは「testテストしたい内容」とします。

テストを書き（$this->assertEqualsなど）、vendor/bin/phpunitで実行します。

ガンガンテストを書いて、コードの品質を高めていきましょう！