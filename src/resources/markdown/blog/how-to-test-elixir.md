---
title: "Elixirでのテストコード実装方法"
date: "2019/6/7"
slug: how-to-test-elixir
tags: [Elixir, ExUnit, テストコード]
description: Elixir, テストコード, ユニットテスト, ExUnit
---
Elixirでのテストコードの書き方と実行方法が分からなかったので調べてみました。

難しい設定が必要なく、簡単に試せたので是非お試しください。

今回はElixirのテストについての概要と実装方法、実行方法まで書いています。

## ExUnit
ElixirにはExUnitというテストフレームワークが標準で組み込まれています。

既にPHPやRubyなどのテストフレームワークを試されたことのある方は特に違和感なく導入出来る印象です。

Elixirはプロジェクトを新規作成した時点で、テストコードを記載してくれています。

```
defmodule ElSandboxTest do
  use ExUnit.Case

  test "greets the world" do
    assert ElSandbox.hello() == :world
  end
end
```

`test "greets the world"`と書いてある箇所がテストケースです。

対して実コードが以下のようになっているとします。

```
defmodule ElSandbox do
  def hello do
    :world
  end
end
```

`mix test`でテストを実行出来るので走らせてみましょう。

以下のような結果になっていると思います。
```shell
Compiling 1 file (.ex)
.

Finished in 0.06 seconds
1 test, 0 failures
```

テストが１つ実行され、成功したと書いていますね。

では次に実コードを書き換え、テストを失敗させてみましょう。

```
defmodule ElSandbox do
  def hello do
    :hogehoge
  end
end
```

この時点で実行した場合は以下のような表示になります。

```shell
Compiling 1 file (.ex)


  1) test greets the world (ElSandboxTest)
     test/el_sandbox_test.exs:5
     Assertion with == failed
     code:  assert ElSandbox.hello() == :world
     left:  :hogehoge
     right: :world
     stacktrace:
       test/el_sandbox_test.exs:6: (test)



Finished in 0.07 seconds
1 test, 1 failure
```

エラーの表示がとても見やすく、素敵ですね！

以上がExUnitの基本的な動かし方です。

１つ注意点があって、EXUnitでテストを起動する前には`ExUnit.start()`を実行している必要があります。

ただし通常は`test/test_helper.exs`で宣言されていることもあり、特に意識する必要はないと思います。

## doctest
ExUnitに加え、doctestというものが存在します。

pythonの[doctest](https://docs.python.org/2/library/doctest.html)から影響を受けたものです。

docテストの追加方法は簡単です。

まず実コードの`@doc`内に、iexで実行した結果をそのまま貼り付けます。

```
@doc """
  Hello world.

    iex> ElSandbox.hello()
    :world
  """
  def hello do
    :world
  end
```

そして、テストコード内で以下のように書き、docTestでテストするモジュールを指定します。

```
defmodule ElSandboxTest do
  use ExUnit.Case
  doctest ElSandbox
end
```

`mix test`の結果は以下のようになると思います。
```
Compiling 1 file (.ex)
.

Finished in 0.05 seconds
1 doctest, 0 failures
```

失敗した結果は以下です。

```
Compiling 1 file (.ex)


  1) doctest ElSandbox.hello/0 (1) (ElSandboxTest)
     test/el_sandbox_test.exs:3
     Doctest failed
     code:  ElSandbox.hello() === :world
     left:  :hogehoge
     right: :world
     stacktrace:
       lib/el_sandbox.ex:11: ElSandbox (module)

Finished in 0.06 seconds
1 doctest, 1 failure
```
ExUnitと同じく、エラーの原因がわかりやすいですね！

doctestは実コード上にテストと結果が書けるのでinput/outputの期待動作が分かりやすいです。

初めてコードを見る場合でもinput/outputがわかるだけでコードの理解が深まります。

ただ、全てのケースに適している訳ではなく、iexで簡単に動作確認出来る程度の単純なケースに向くのかなと思います。

あまりにも複雑すぎると何をテストしているのかを追うのが大変そうです。

単純なケース: doctest

複雑なケース: ExUnit

のようにうまく使い分けする事が必要なんだと感じました。

doctestについての考え方は[Doctest大好きマンによる布教](https://qiita.com/ymtszw/items/f22c3644afc2e8ca9f84)がとても参考になりました。

## まとめ
今回のまとめとしては以下の通りです。

1. Elixirにはテストツールが標準で組み込まれている。
2. ExUnitとdoctestの２つがそれに該当する。
3. ExUnitは複雑なテストケースに向く。
4. doctestはiex上で試せる程度のケースが向く。
5. どちらかだけではなく、上手く使い分ける姿勢が大事。

今までPHPやJavaScriptなどやってきて、テストフレームワークの選定に迷ったこともあるので、言語として組み込んでくれているのは非常にありがたいです。

言語のバージョンが上がったけどテストフレームワークが追従していない！なんてケースにはまずならないでしょうし、とても好印象です。

簡単に導入出来るので是非試してみてください！

## 参考にしたもの
- [テスト](https://elixirschool.com/ja/lessons/basics/testing/)
- [ExUnit.DocTest](https://hexdocs.pm/ex_unit/ExUnit.DocTest.html)
- [Elixirのdoctest書き方まとめ](https://qiita.com/ma2ge/items/b6b26335ecc1b2181897)