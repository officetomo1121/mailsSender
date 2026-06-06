# メール一斉配信ウェブアプリ「mailsSender」

Firestoreに登録されたメールアドレスへ、一斉にメールを配信するためのウェブアプリケーションです。

管理画面からHTMLメールおよびプレーンテキストメールを作成し、配信対象者へ送信できます。

## Feature

・メール一斉配信
・HTMLメール作成
・プレーンテキストメール作成
・Firestoreによる配信先管理
・配信対象者の購読状態（subscribe）の管理
・Google Workspace SMTPによるメール送信
・Firebase Authenticationによる認証
・Firebase App Checkによる不正利用対策

## Setup

# システム構成
フロントエンド：Nuxt 4
バックエンド：Firebase Cloud Functions
データベース：Cloud Firestore
認証：Firebase Authentication
セキュリティ：Firebase App Check
ホスティング：Firebase App Hosting
リッチエディタ：Nuxt UI Editor（Tiptap）

# Firestore構成
コレクション名：mailto
ドキュメント　：送信先メールアドレス
フィールド　　：
{
  "subscribe": true
}

# 必要なFirebaseプロダクト

本プロジェクトでは以下のFirebaseプロダクトを利用します。

・Cloud Functions（Cloud Run）
・Cloud Firestore
・App Hosting
・Firebase Authentication
・Firebase App Check

# SMTPサーバー設定

本システムは初期状態では Gmail SMTP を利用する設定になっています。

```javascript
host: 'smtp.gmail.com',
port: 587,
secure: false
```

他のメールサービスを利用する場合は、Cloud Functions 内の SMTP 設定を環境に合わせて変更してください。

例：

```javascript
host: 'smtp.office365.com',
port: 587,
secure: false
```

```javascript
host: 'mail.example.com',
port: 587,
secure: false
```

認証情報は Google Cloud Secret Manager で管理することを推奨します。

```text
SMTP_USER
SMTP_PASS
```

# Secret Manager

シークレット管理には、Google Cloud Platformのシークレットマネージャーを用いることを想定しています。apphosting.yamlを適宜書き換えてください。

# その他

ログイン権限者の登録、送信先アドレスの登録は、Firebase Consoleで直接作成してください。

## License

MIT License