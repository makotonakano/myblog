---
title: "PHPUnitでテストを書きながらfizzbuzzを実装する"
date: "2019/7/24"
slug: php-fizzbuzz
tags: [PHP, PHPUnit, UnitTest]
description: PHP, PHPUnit, phpunit, php, UnitTest, test
---
## はじめに

PHPのテストツールであるPHPUnitの環境構築を行ったので、テストファーストでプログラムを組んでみたくなりました。

そこで今回はPHPUnitでテストを実装しながら実コードを書き、変更のしやすいプログラムを組むまでの一連の流れを記事にしてみます。

トライ＆エラーを繰り返しながらfizzbuzzを実装していきます。

この記事は

- PHPUnitの使い方を学びたい人
- テストファーストで実装してみたい人

が対象となることを想定しています。

環境構築に関しては[PHPUnitでテストコードを書いて実行するまで](try-phpunit)を参考にしてください。  

### テストコードを書く前に仕様の整理
テストコードを実装していく前に、今回実装するプログラムの仕様を整理しておきます。

今回実装するプログラムは以下の仕様を満たすことが出来れば、完成とします。
```
1. 1 ~ 100までの数字が与えられる
2. 与えられた数字が3で割り切れる場合は`fizz`を返す
3. 与えられた数字が5で割り切れる場合は`buzz`を返す
4. 与えられた数字が3と5で割り切れる場合は`fizzbuzz`を返す
5. それ以外の場合は与えられた数字をそのまま返す
```

上記に加えて、以下の制限を課します。
- 1 ~ 100以外の値が与えられることはないものとする。
- 値が渡されないといったパターンは存在しないものとする。

では、やっていきます。
## phpunitと実コードの実装
今回実装するプログラムのディレクトリ構造は以下のようにしました。

```
root/
　├ src/
　│　　└　FizzBuzz.php
　├ test/
　│　　└　FizzBuzzTest.php
　├ vendor/
　└ composer.json
```

またこの段階では、`FizzBuzz.php`と`FizzBuzzTest.php`の中身は以下のように何も書いていない状態です。
```php:title=FizzBuzz.php
<?php
declare(strict_types=1);
namespace App;

class FizzBuzz
{
}
```
```php:title=FizzBuzzTest.php
<?php

use PHPUnit\Framework\TestCase;
use App\FizzBuzz;

class FizzBuzzTest extends TestCase
{
}
```

また、通常は
> プログラムを実装 -> テストを書く

の順で実装していくと思うのですが、今回はテストファーストなので
> テストを書く -> プログラムを書く

の順番で実装していきたいと思います。
### 数字を返す
順番が前後しますが、まずは
> 5. それ以外の場合は与えられた数字をそのまま返す
をやっていきます。

数字が3でも5でも割り切れない場合なので、例えば1を与えられたら1を返すことが確認出来たら良さそうです。

テストコードは以下のようにします。
```php:title=FizzBuzzTest.php
public function testReturnOne()
{
    $fizzbuzz = new FizzBuzz();
    $result = $fizzbuzz->answer();

    $this->assertEquals(1, $result);
}
```

上記テストを実行してみると失敗すると思います。
> $ vendor/bin/phpunit
> E                                                                   1 / 1 (100%)
> 
> Time: 837 ms, Memory: 4.00 MB
> 
> There was 1 error:
> 
> 1) FizzBuzzTest::testReturnOne
> Error: Call to undefined method App\FizzBuzz::answer()
> 
> php-fizzbuzz\test\FizzBuzzTest.php:11

answerメソッドを実装していないのが原因ですね。

早速実装しましょう！

以下のように1を返すメソッドを実装しても良いですが
```php:title=FizzBuzz.php
public function answer() {
    return 1;
}
```
他の数字が渡されるパターンに対応できません。  
そのため以下のように引数をそのまま返すメソッドを実装することにします。
```php:title=FizzBuzz.php
public function answer($number) {
    return $number;
}
```

テストも引数を渡すように修正します。
```php:title=FizzBuzzTest.php
public function testReturnOne()
{
    $fizzbuzz = new FizzBuzz();
    $result = $fizzbuzz->answer(1);

    $this->assertEquals(1, $result);
}
```
テストを実行すると無事通ります。
> OK (1 tests, 1 assertions)

この実装の場合、数字の2が渡された場合のテストも通ります。
```php:title=FizzBuzzTest.php
public function testReturnTwo()
{
    $fizzbuzz = new FizzBuzz();
    $result = $fizzbuzz->answer(2);

    $this->assertEquals(2, $result);
}
```

### 3の倍数の時
では3の倍数の場合のテストを書いていきましょう。

```php:title=FizzBuzzTest.php
public function testReturnFizz()
{
    $fizzbuzz = new FizzBuzz();
    $result1 = $fizzbuzz->answer(3);

    $this->assertEquals("fizz", $result1);

    $result2 = $fizzbuzz->answer(6);

    $this->assertEquals("fizz", $result2);
}
```

3の倍数、3と6が渡された場合にfizzを返すようなテストを書きました。

`$this->assertEquals` を一つのテストケースに複数書くのは駄目というところもあります。  
（どの箇所でテストが失敗したか分かりにくくなるため）  
今回はわかりやすさ重視でテストを分けるといったことはしませんが、プロジェクトの方針によって決めてください。

単純にこの仕様を満たすテストを書く場合

```php:title=FizzBuzz.php
public function answer($number) {
    return "fizz";
}
```

こんな感じのテストで良さそうですが、これでは
> 5. それ以外の場合は与えられた数字をそのまま返す

を満たせなくなります。

なので、3の倍数であるかの判定を追加する必要がありそうです。
```php:title=FizzBuzz.php
public function answer($number) {
    if ($number%3 === 0) {
        return "fizz";
    }
    return $number;
}
```

これで追加したテストも含め、テストが成功することが確認できます。
### 5の倍数の時
3の場合と同様に考えます。

```php:title=FizzBuzzTest.php
public function testReturnBuzz()
{
    $fizzbuzz = new FizzBuzz();
    $result1 = $fizzbuzz->answer(5);

    $this->assertEquals("buzz", $result1);

    $result2 = $fizzbuzz->answer(10);

    $this->assertEquals("buzz", $result2);
}
```

実装は以下のようにします。

```php:title=FizzBuzz.php
public function answer($number) {
    if ($number%3 === 0) {
        return "fizz";
    }
    if ($number%5 === 0) {
        return "buzz";
    }
    return $number;
}
```

似たパターンをやっていたので簡単ですね。
### 3でも5でも割り切れる時
今度は3でも5でも割り切れる場合なので、テストは以下のようにします。
```php:title=FizzBuzzTest.php
public function testReturnFizzBuzz()
{
    $fizzbuzz = new FizzBuzz();
    $result1 = $fizzbuzz->answer(15);

    $this->assertEquals("fizzbuzz", $result1);

    $result2 = $fizzbuzz->answer(30);

    $this->assertEquals("fizzbuzz", $result2);
}
```

実装も3の場合や５の場合と同様にやっていけば良いだけなのですが、
```php:title=FizzBuzz.php
public function answer($number) {
    if (($number%3 === 0) && ($number%5 === 0)) {
        return "fizzbuzz";
    }
    if ($number%3 === 0) {
        return "fizz";
    }
    if ($number%5 === 0) {
        return "buzz";
    }
    return $number;
}
```

これでは数字を返す時に数字を3で割る処理と5で割る処理がそれぞれ2回ずつ走ることになっちゃいます。  
なので少しリファクタしましょう。

```php:title=FizzBuzz.php
public function answer($number)
{
    $is_multiple_of_three = $number%3 === 0;
    $is_multiple_of_five = $number%5 === 0;
    if ($is_multiple_of_three && $is_multiple_of_five) {
        return "fizzbuzz";
    }
    if ($is_multiple_of_three) {
        return "fizz";
    }
    if ($is_multiple_of_five) {
        return "buzz";
    }
    return $number;
}
```

結構大胆に変更しましたが、テストを実行すると全件パスすることが確認できたので、デグレを起こしていないことが分かります。

安心感を持ちつつコードを実装でき、リファクタもスムーズに完了しました。
## 実装後に要件が変わった時

悲しいですが要件はよく変わります。

ですがテストをしっかり書いていると変更にも強いです。

例として、要件が
>  ~~与えられた数字が3で割り切れる場合は`fizz`を返す~~

>  与えられた数字が3で割り切れる場合は`aho`を返す

に変わったとしましょう。（懐かしのナベアツですね）

まずテストを改修します。  
3で割ったときなので

```php:title=FizzBuzzTest.php
public function testReturnFizz()
{
    $fizzbuzz = new FizzBuzz();
    $result1 = $fizzbuzz->answer(3);

    $this->assertEquals("fizz", $result1);

    $result2 = $fizzbuzz->answer(6);

    $this->assertEquals("fizz", $result2);
}
```
これを
```php:title=FizzBuzzTest.php
public function testReturnAho()
{
    $fizzbuzz = new FizzBuzz();
    $result1 = $fizzbuzz->answer(3);

    $this->assertEquals("aho", $result1);

    $result2 = $fizzbuzz->answer(6);

    $this->assertEquals("aho", $result2);
}
```

とします。  
メソッド名も実態とそぐわなくなるので修正しておきましょう。

実装も以下のように修正します。

```php:title=FizzBuzz.php
public function answer($number)
{
    $is_multiple_of_three = $number%3 === 0;
    $is_multiple_of_five = $number%5 === 0;
    if ($is_multiple_of_three && $is_multiple_of_five) {
        return "fizzbuzz";
    }
    if ($is_multiple_of_three) {
        return "aho";
    }
    if ($is_multiple_of_five) {
        return "buzz";
    }
    return $number;
}
```

通常、要件変更などで既存のコードを修正する場合、影響調査が大変です。  
しかしながらテストを十分にしておけば既存の箇所に影響なく修正内容が期待値通りであるかが簡単に求められます。

結果としてデグレの発生しにくい、変更に強いプログラムができます。
## まとめ

テストファーストで実装する場合

1. テストから書く
2. そのテストに対する正しい答えを返せるように実装する
3. リファクタする

のサイクルでやっていくとスムーズに進みます。

ここら辺はTDD(テスト駆動開発)の思想にも繋がるところかなとは思います。  
TDDに関しては勉強不足なので本を読んでおきます。
<div class="booklink-box" style="text-align:left;padding-bottom:20px;font-size:small;zoom: 1;overflow: hidden;">
<div class="booklink-image" style="float:left;margin:0 15px 10px 0;">
<a href="//af.moshimo.com/af/c/click?a_id=1481242&p_id=56&pc_id=56&pl_id=637&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F14869144%2F" target="_blank" >
  <img src="https://thumbnail.image.rakuten.co.jp/@0_mall/book/cabinet/7883/9784274217883.jpg?_ex=64x64" style="border: none;" />
</a>
<img src="//i.moshimo.com/af/i/impression?a_id=1481242&p_id=56&pc_id=56&pl_id=637" width="1" height="1" style="border:none;">
</div>
<div class="booklink-info" style="line-height:120%;zoom: 1;overflow: hidden;">
<div class="booklink-name" style="margin-bottom:10px;line-height:120%">
<a href="//af.moshimo.com/af/c/click?a_id=1481242&p_id=56&pc_id=56&pl_id=637&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F14869144%2F" target="_blank" >テスト駆動開発</a>
<img src="//i.moshimo.com/af/i/impression?a_id=1481242&p_id=56&pc_id=56&pl_id=637" width="1" height="1" style="border:none;">
<div class="booklink-powered-date" style="font-size:8pt;margin-top:5px;font-family:verdana;line-height:120%">posted with 
<a href="https://yomereba.com" rel="nofollow" target="_blank">ヨメレバ</a>
</div>
</div>
<div class="booklink-detail" style="margin-bottom:5px;">Kent Beck/和田 卓人 株式会社オーム社 2017年10月14日 
</div>
<div class="booklink-link2" style="margin-top:10px;">
<div class="shoplinkrakuten" style="display:inline;margin-right:5px">
<a href="//af.moshimo.com/af/c/click?a_id=1481242&p_id=56&pc_id=56&pl_id=637&s_v=b5Rz2P0601xu&url=http%3A%2F%2Fbooks.rakuten.co.jp%2Frb%2F14869144%2F" target="_blank" >楽天ブックス</a>
<img src="//i.moshimo.com/af/i/impression?a_id=1481242&p_id=56&pc_id=56&pl_id=637" width="1" height="1" style="border:none;">
</div>
<div class="shoplinkamazon" style="display:inline;margin-right:5px">
<a href="//af.moshimo.com/af/c/click?a_id=1481244&p_id=170&pc_id=185&pl_id=4062&s_v=b5Rz2P0601xu&url=https%3A%2F%2Fwww.amazon.co.jp%2Fexec%2Fobidos%2FASIN%2F4274217884" target="_blank" >Amazon</a>
</div>
</div>
</div>
<div class="booklink-footer" style="clear: left">
</div>
</div>
</div>
</div>
<div class="booklink-footer" style="clear: left">
</div>
</div>

テストコードを書くのは正直つらいし面倒です。  
ですが一度書き慣れてしまうとテストコードがない状態でプログラムを書くのがとても怖くなります。

テストを書いて、変更しやすくバグの少ない世界に飛び込んでみませんか？