---
layout: blog
featured_image: /assets/img/uploads/tanb.jpg
title: Angular + Scully + NetlifyCMSでブログの運用を始める
description: >-
  Angular + Scully + NetlifyCMSでブログの運用を始める。tanb.expressではAngular
  v10が出た頃からAngular+Scullyで静的サイトジェネレートをして配信するようになりました。そんな中、当サイトをホストしているNetlifyにHeadless
  CMSのサービスがあることを知り当サイトに導入することにしました。
published: true
publish_date: '2021-02-25T18:13:56+09:00'
---
# Angular + Scully + NetlifyCMSでブログの運用を始める

tanb.expressではAngular v10が出た頃からAngular+Scullyで静的サイトジェネレートをして配信するようになりました。

いくつかMarkdownで記事を生成しサイトに表示できるようにしてみましたが、記事を投稿するたびにcommitしてGitHubにpushするという事わざわざ繰り返したり、画像が必要になるたびにcommitしてパスを書いて...というのは正直面倒だなぁと感じていました。

そんな中、当サイトをホストしているNetlifyにHeadless CMSのサービスがあることを知り当サイトに導入することにしました。

# 必要な変更はたった3つ
(ただしScully blog supportが終わっている前提です)
- `src/admin`ディレクトリを作成しconfig.ymlとindex.htmlを配置
- angular.jsonでassetsとして配信するパスに`src/admin`を追加
- Netlifyのサイト詳細画面でIdentityを利用可能な状態にする

src/adminから管理画面の入り口をassets fileとして配信します。angular.jsonに設定が必要です。配信することに成功すれば`https://yoursite/admin`で管理画面にアクセスできるはずです。認証はNetlify Identityを介して行われますので後ほど設定が必要です。

こちらにindex.htmlに記載する内容とconfig.ymlの設定の仕方が書かれています
[https://www.netlifycms.org/docs/add-to-your-site/](https://www.netlifycms.org/docs/add-to-your-site/)

当サイトのconfig.ymlはこのような感じ

```yaml
backend:
  name: git-gateway
  branch: release

media_folder: 'src/assets/img/uploads' # Folder where user uploaded files should go
public_folder: 'assets/img/uploads'
publish_mode: editorial_workflow

collections: # A list of collections the CMS should be able to edit
  - name: 'blog' # Used in routes, e.g., /admin/collections/blog
    label: 'Blog' # Used in the UI
    folder: 'blog' # ここはScully blog記事の配置場所
    create: true # Allow users to create new documents in this collection
    fields: # The fields for each document, usually in front matter
      - {label: 'Layout', name: 'layout', widget: 'hidden', default: 'blog'}
      - {label: 'Featured Image', name: 'featured_image', widget: 'image', required: false}
      - {label: 'Title', name: 'title', widget: 'string', required: true}
      - {label: 'Description', name: 'description', widget: 'string', required: false}
      - {label: 'Publish', name: 'published', widget: 'boolean', required: true} # If you want to hide article after it pulished, set false on Netlify cms.
      - {label: 'Publish Date', name: 'publish_date', widget: 'datetime', required: false}
      - {label: 'Body', name: 'body', widget: 'markdown', required: true}

```

当面はBlogしか管理しないのでCollectionsには`blog`しかありません。fieldsには管理画面で入力可能な項目、種別、値などを定義します。これらの項目設定で管理画面が以下のようになります。

![admin console](/assets/img/uploads/screenshot2021-02-26.png)

急がないでください！次にIdentityの設定をして、管理アカウントを作成してはじめて管理画面にログインできるようになります！あともう少し！

## Identityの設定

Identityの設定を開始します。まずはNetlifyのサイト画面のナビゲーションバーにあるIdentityを選択。Identityの利用を開始します。

![admin console](/assets/img/uploads/identity-init.png)

次に`Site settings > Identity > Registration preferences`を確認してみましょう。
初期状態ではOpenなのでだれでもIdentityの登録を開始できます。自分しか使わないのであればInvite onlyにする必要があります。

続いて下の方へスクロールしてGit Gatewayの設定も必要です。NetligyCMSで記事を作成する際にブランチを作ったりPRを作ったりするためにGitHub APIが使用されます。Edit settingsを押して`Generate access token in GitHub`をクリックしaccess tokenをセットします。

ここまできたらコーヒーか何か飲み物を飲んで休憩しましょう。☕️

## 管理画面アカウントの作成
さきほどのIdentityの設定がすんでいれば、招待されたユーザーのみIdentityの登録を開始できるようになっているはずです。ナビゲーションバーにあるIdentityを開き、`Invite users`から自分宛にメールを送ってみましょう。管理画面へアクセスするためのIdentityの登録URLが送られてきます。パスワードを設定すれば完了です。

## 最終確認
サイトはデプロイされていますか？管理画面`src/admin`を設定したcommitがちゃんとpushされデプロイされているか確認してください。

`https://yoursite/admin`にアクセスするとNetlifyCMSのログイン画面が表示さるはずです。ログインだけができるようになっていますか？サインアップできるようになっていたら、`Registration preferences`を見直しましょう。

Git Gatewayの設定を見直すように注意されますか？config.ymlのbranchの項目をみてください。私のサイトではreleaseブランチですがあなたのサイトではmainブランチかもしれません。ブランチ名を確認してください。
