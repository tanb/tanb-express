---
layout: blog
featured_image: /assets/img/uploads/tanb.jpg
title: Netlify CMS + Angular + Scullyでブログを運用してみる.
description: Netlify CMSとAngular+Scullyでブログを運用してみる.
published: false
publish_date: '2021-02-25T18:13:56+09:00'
---
# Netlify CMS+Angular+Scullyでブログを運用してみる

Angular v10が出た頃から、当サイトではAngular+Scullyで静的サイトジェネレートができるようになりました。

いくつかMarkdownで記事を生成しサイトに表示できるようにしてみましたが、記事を投稿するたびにわざわざcommitしてGitHubにpushしてというのを繰り返したり、画像が必要になるたびにcommitしてパスを書いてというのは正直面倒あと感じていました。

そんな中当サイトをホストしているNetlifyにHeadless CMSのサービスがあることを知り当サイトに導入することにしました。

# 必要な変更はたった3つ
- `src/admin`ディレクトリを作成しconfig.ymlとindex.htmlを配置
- angular.jsonでassetsとして配信するパスに`src/admin`を追加
- Netlifyのサイト詳細画面でIdentityを利用可能な状態にする
