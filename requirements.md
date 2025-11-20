# Apple Notes Explorer - 実用化ガイド

このツールを実際のApple Notesデータで使用するための要件と手順です。

## 必須要件

1.  **データベースファイル (`NoteStore.sqlite`)**
    *   Apple Notesのデータは `~/Library/Group Containers/group.com.apple.notes/NoteStore.sqlite` に保存されています。
    *   **注意**: macOSのセキュリティ制限（Full Disk Access）により、この場所から直接読み込むことは推奨されません（権限エラーが発生しやすいため）。
    *   **解決策**: このファイルをプロジェクトのルートディレクトリにコピーして使用します。

2.  **Node.js 環境**
    *   `better-sqlite3` ライブラリを使用しているため、ネイティブモジュールのビルドが必要です。
    *   Node.jsのバージョンが変わった場合は `npm rebuild` が必要になることがあります。

## セットアップ手順

### 1. データベースのコピー
ターミナルで以下のコマンドを実行し、本物のデータをプロジェクト内にコピーします。

```bash
# プロジェクトのルートディレクトリで実行
cp "/Users/watanabe3tipapa/Library/Group Containers/group.com.apple.notes/NoteStore.sqlite" ./NoteStore.sqlite
```

※ `Operation not permitted` エラーが出る場合は、ターミナルアプリに「フルディスクアクセス」権限を付与するか、Finderから手動でコピーしてください。

### 2. 依存関係のインストールとビルド
```bash
npm install
npm rebuild better-sqlite3
```

### 3. アプリケーションの起動
```bash
npm run dev
```

## トラブルシューティング

*   **エラー: `NoteStore.sqlite: No such file or directory`**
    *   手順1のコピーが成功しているか確認してください。`ls -l NoteStore.sqlite` でファイルサイズが0でないことを確認します。

*   **エラー: `was compiled against a different Node.js version`**
    *   `npm rebuild better-sqlite3` を実行して、現在のNode.jsバージョンに合わせてライブラリを再コンパイルしてください。

*   **データが表示されない / 検索できない**
    *   Apple Notesのデータベース構造はOSのバージョンによって異なる場合があります。このツールは一般的な構造（`ZICCLOUDSYNCINGOBJECT` テーブル）を想定しています。
