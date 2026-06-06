# メール一斉配信ウェブアプリ「mailsSender」

Firestoreに登録されたメールアドレスへ、一斉にメールを配信するためのウェブアプリケーションです。

管理画面からHTMLメールおよびプレーンテキストメールを作成し、配信対象者へ送信できます。


# Feature

```text
・メール一斉配信
・HTMLメール作成
・プレーンテキストメール作成
・Firestoreによる配信先管理
・Firebase Authenticationによる認証
・Firebase App Checkによる不正利用対策
・GCP Secret Managerによるシークレット管理
```


# Setup
## システム構成

```text
・フロントエンド　：Nuxt 4
・バックエンド　　：Firebase Cloud Functions
・データベース　　：Cloud Firestore
・認証　　　　　　：Firebase Authentication
・セキュリティ　　：Firebase App Check
・ホスティング　　：Firebase App Hosting
・シークレット管理：GCP Secret Manager
・リッチエディタ　：Nuxt UI Editor（Tiptap）
```


## Firestore構成

```text
コレクション名：mailto
ドキュメント　：送信先メールアドレス
フィールド　　：
{
  "subscribe": true
}
```


## 必要なFirebaseプロダクト

本プロジェクトでは以下のFirebaseプロダクトを利用します。

```text
・Cloud Functions（Cloud Run）
・Cloud Firestore
・App Hosting
・Firebase Authentication
・Firebase App Check
```


## SMTPサーバー設定

本システムはSMTPサーバー設定は、GCP Secret Managerで管理する仕様といています。

```javascript
host: SMTP_HOST,
port: SMTP_PORT,
secure: SMTP_SECURE
```

メールサービスに応じ、GCP Secret Managerでシークレット管理してください。
その他認証情報も同様に、GCP Secret Managerで管理する仕様です。

```text
SMTP_USER
SMTP_PASS
```


## Secret Manager

シークレット管理には、Google Cloud Platformのシークレットマネージャーを用いることを想定しています。apphosting.yamlを適宜書き換えてください。

```text
NUXT_PUBLIC_FIREBASE_API_KEY
NUXT_PUBLIC_FIREBASE_APP_ID
NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NUXT_PUBLIC_FIREBASE_PROJECT_ID
NUXT_PUBLIC_RECAPTCHA_SITE_KEY
SMTP_USER
SMTP_PASS
SMTP_HOST
SMTP_PORT
SMTP_SECURE
MAIL_FROM
```

## その他

ログイン権限者の登録、送信先アドレスの登録は、Firebase Consoleで直接作成してください。


# License

MIT License