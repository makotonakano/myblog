---
title: "TailwindをReactで使ってみた "
date: "2019/7/3"
slug: try-tailwind-react
tags: [React, tailwindcss, TypeScript, JavaScript ]
description: React, tailwindcss, TypeScript, JavaScript
---
## はじめに
reactにtailwind導入しました。

今回扱う内容は、環境構築時点～reactでtailwindが使えるようになるまでです。

(記事を書いてみて、**reactでなくても試すことのできそうな内容**に仕上がってることに気づきました......)

reactの環境構築は `create-react-app`を使いました。

バージョンは2.1.5です。

## プロジェクトの作成
`create-react-app`でプロジェクトの作成を行います。

```
create-react-app <project name> --typescript
```

作成したプロジェクトに移動します。

```
cd <project name>
```

## Tailwindとその他必要なものをインストール
```
yarn add -D tailwindcss postcss-cli autoprefixer
```

## 設定ファイルを作成

```
# filenameを省略するとtailwind.jsがデフォルトで作成されます。
yarn tailwind init <filename>
```

## postcss.config.jsを作成

中身は以下のようにします。

```javascript:title=gatsby-config.js
const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    tailwindcss('./tailwind.js'),
    require('autoprefixer')
  ]
}
```
## postcssでtailwindを変換するためのファイルを作成

postcssを使って、tailwindを有効なcssファイルにするためにstyle.cssを作成して、以下のように記載します。

ちなみにファイル名はお好みで。

```css:title=style.css
@tailwind preflight;
@tailwind components;
@tailwind utilities;
```

## ビルド設定
以下のスクリプトをpackage.jsonのscriptsに追記します。

スクリプト名はお好みで。

```json:title=package.json
"watch:tailwind": "postcss ./src/styles.css -o ./src/tailwind.css -w",
```
このスクリプトを実行すると、`tailwind.css`がsrc配下に出来上がっているはずです。

あとは読み込みたいファイルで読み込みを行ってあげればtailwindが利用できるようになっています。

```
import './tailwind.css';
```


## まとめ
少し手順は複雑ですが、意外と簡単に出来ると思います。

冒頭でも述べた通り、react以外でも応用の効く内容だと思います。

tailwind使いやすいので、ぜひ使ってみてください！

## 参考

- [ドキュメント](https://tailwindcss.com/docs/what-is-tailwind/)
- [Steps to setup Tailwind with React using POSTCSS](https://medium.com/@ajitid/steps-to-setup-tailwind-with-react-using-postcss-66147b93f5f4)
- [LaravelにTailwind CSSを導入してwebpackでビルドする](https://qiita.com/Panda_Program/items/fb9266cffaa2b28a5a7f)
