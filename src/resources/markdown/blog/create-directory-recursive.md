---
title: "nodejsで再帰的にディレクトリを作成する"
date: "2019/6/24"
slug: create-directory-recursive
tags: [Node.js,tips]
description: Node.js ディレクトリ作成　再帰的 node Node javascript JavaScript JS 
---
## TL;DR
以下のコードで再帰的にディレクトリを作成することが出来ます。
`fs.mkdir("foo/bar", { recursive: true }, err => {}`

## 解説
nodeには`fs.mkdir`や`fs.mkdirSync`などのディレクトリを作成する関数が存在します。

これらの関数は`mkdir -p`のようにディレクトリを再帰的に作成する機能が備わっていなかったため、例えば以下のようなコードは動きませんでした。

```javascript
const directory = "src/resources/markdown/blog";
fs.mkdir(directory, err => {
    if(err) console.log(err);
});
```

以下のコードを実行すると`Error: ENOENT: no such file or directory`が出力されると思います。

そんな中でnode 10.12.0から以下のような変更が入りました。
```
fs
Added a `recursive` option to `fs.mkdir` and `fs.mkdirSync`. If this option
is set to true, non-existing parent folders will be automatically created. #21875

訳：
`fs.mkdir` and `fs.mkdirSync`関数に`recursive`オプションが加わりました。
`recursive`オプションをtrueにすることで、
存在しない親ディレクトリが自動的に作成されるようになります。
```

[https://github.com/nodejs/node/pull/21875](https://github.com/nodejs/node/pull/21875)

これにより、親ディレクトリが存在するかを再帰的に見る処理が不要になります。

先ほども書きましたが、以下のように書けば存在しない親ディレクトリが自動的に作成されるようになります。
```javascript
const directory = "src/resources/markdown/blog";
fs.mkdir(directory, { recursive: true }, err => {
    if(err) console.log(err);
});
```

あくまでもこれはnodeのバージョンが10以上の場合のみ有効です。

nodeのバージョンが10以下の場合は再帰的に親ディレクトリが存在するかを見てあげる必要があります。

## 参考
- [https://github.com/nodejs/node/pull/21875](https://github.com/nodejs/node/pull/21875)
- [https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V10.md#10.12.0](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V10.md#10.12.0)
- [Node.js で mkdir -p ができるようになった](http://var.blog.jp/archives/77266235.html)