---
title: "Symfonyでプロジェクトを作成する"
date: "2019/9/23"
slug: create-symfony-prj
tags: [PHP,Symfony]
description: PHP Symfony
---

symfonyでプロジェクトの作成方法を纏めます。

依存性管理ツールはcomposerを使用するので、インストール方法も同時に記載します。
バージョンはsymfony4です。

## composerのインストール
composerはwindows、macでそれぞれインストール方法が微妙に違います。

- windowsの場合

基本的には以下のURLで記載してある通り、インストーラをダウンロードするか、コマンドラインでインストールします。
[https://getcomposer.org/download/](https://getcomposer.org/download/)

- macの場合
homebrewで一発です。
```shell
brew install composer
```

インストール出来たら、compsoerコマンドでインストール出来たかを確認します。
```shell
$ composer --version
Composer version 1.8.0 2018-12-03 10:31:16
```

バージョン情報が返ってきたら無事インストール成功です。
## symfonyプロジェクトの作成

では実際にプロジェクトを作成していきましょう。

先ほどインストールしたcomposerを使えば簡単に作成できます。
```shell
$ cd /your/working/directory
$ composer create-project symfony/skeleton prj_name
Installing symfony/skeleton (v4.3.99)
  - Installing symfony/skeleton (v4.3.99): Loading from cache
Created project in prj_name
Loading composer repositories with package information
Updating dependencies (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Installing symfony/flex (v1.4.6): Downloading (100%)
Symfony operations: 1 recipe (e7a201e1d57a8622b71770c902ba0c35)
  - Configuring symfony/flex (>=1.0): From github.com/symfony/recipes:master
Loading composer repositories with package information
Updating dependencies (including require-dev)
Restricting packages listed in "symfony/symfony" to "4.3.*"

Prefetching 17 packages
  - Downloading (100%)

Package operations: 26 installs, 0 updates, 0 removals
  - Installing psr/container (1.0.0): Loading from cache
  - Installing symfony/service-contracts (v1.1.6): Loading from cache
  - Installing symfony/polyfill-php73 (v1.12.0): Loading from cache
  - Installing symfony/polyfill-mbstring (v1.12.0): Loading from cache
  - Installing symfony/console (v4.3.4): Loading from cache
  - Installing symfony/dotenv (v4.3.4): Loading from cache
  - Installing symfony/routing (v4.3.4): Loading from cache
  - Installing symfony/finder (v4.3.4): Loading from cache
  - Installing symfony/filesystem (v4.3.4): Loading from cache
  - Installing psr/log (1.1.0): Loading from cache
  - Installing symfony/debug (v4.3.4): Loading from cache
  - Installing symfony/polyfill-php72 (v1.12.0): Loading from cache
  - Installing symfony/polyfill-intl-idn (v1.12.0): Loading from cache
  - Installing symfony/mime (v4.3.4): Loading from cache
  - Installing symfony/http-foundation (v4.3.4): Loading from cache
  - Installing symfony/event-dispatcher-contracts (v1.1.5): Loading from cache
  - Installing symfony/event-dispatcher (v4.3.4): Loading from cache
  - Installing symfony/http-kernel (v4.3.4): Loading from cache
  - Installing symfony/dependency-injection (v4.3.4): Loading from cache
  - Installing symfony/config (v4.3.4): Loading from cache
  - Installing symfony/var-exporter (v4.3.4): Loading from cache
  - Installing psr/cache (1.0.1): Loading from cache
  - Installing symfony/cache-contracts (v1.1.5): Loading from cache
  - Installing symfony/cache (v4.3.4): Loading from cache
  - Installing symfony/framework-bundle (v4.3.4): Loading from cache
  - Installing symfony/yaml (v4.3.4): Loading from cache
Writing lock file
Generating autoload files
Symfony operations: 3 recipes (e7a201e1d57a8622b71770c902ba0c35)
  - Configuring symfony/framework-bundle (>=4.2): From github.com/symfony/recipes:master
  - Configuring symfony/console (>=3.3): From github.com/symfony/recipes:master
  - Configuring symfony/routing (>=4.2): From github.com/symfony/recipes:master
Executing script cache:clear [OK]
Executing script assets:install public [OK]

Some files may have been created or updated to configure your new packages.
Please review, edit and commit them: these files are yours.

Some files may have been created or updated to configure your new packages.
Please review, edit and commit them: these files are yours.
```

しばし待っているとプロジェクトが作成されます。

うまく動くかを確認するために、サーバを起動してみましょう。

```
$ cd prj_name
$ php -S 127.0.0.1:8000 -t public
```

無事サーバが起動したらアクセスしてページが表示されるのを確認します。
![プロジェクト作成完了](/../../images/blog/create-symfony-project/success-symfony-prj.png)
上記画像のようなページが表示されたら成功です。