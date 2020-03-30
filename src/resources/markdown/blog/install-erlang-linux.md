---
title: "Linux MintでElixirがインストール出来なかった（解決）"
date: "2020/3/29"
slug: install-erlang-linux
tags: [Linux,Elixir, Erlang]
description: Linux Elixir Erlang
---
## 概要
自宅の古いPCをLinux Mintに切り替え早速Elixirを導入しようとした。

[公式のガイド](https://elixir-lang.org/install.html#unix-and-unix-like)どおり、Erlangをインストールしようとしたところ、以下のエラーが発生して困ったので、解決方法を記載する

```
$ sudo apt-get install esl-erlang
パッケージリストを読み込んでいます... 完了
依存関係ツリーを作成しています                
状態情報を読み取っています... 完了
パッケージ esl-erlang は使用できませんが、別のパッケージから参照されます。
これは、パッケージが欠落しているか、廃止されたか、または別のソース
からのみ利用可能であることを意味します。
```

## 解決方法

下記ファイルを適当なエディタで開き
`/etc/apt/sources.list.d/erlang-solutions.list`

以下のように記載されている箇所を
```
deb http://binaries.erlang-solutions.com/debian 12 tina contrib
```

以下のように変更する
```
deb http://binaries.erlang-solutions.com/debian 12 bionic contrib
```

保存したあと、再度コマンド実行すると、インストール出来る
```
$ sudo apt-get install esl-erlang
```

### 参考
- https://elixirforum.com/t/problem-install-erlang-in-linux-mint-19-2/26376/4

