# Apple Notes Explorer (seek-an)

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.1.0-green.svg)

---

**Apple Notes Explorer** は、Mac標準の「メモアプリ (Apple Notes)」のデータをローカルで探索・閲覧するためのWeb UIツールです。
Next.js と SQLite を使用して、ローカルにある `NoteStore.sqlite` データベースから直接ノート情報を取得し、高速に一覧表示・検索を行うことができます。

## 特徴

*   **高速な閲覧**: ローカルデータベースを直接読み込むため、高速に動作します。
*   **検索機能**: タイトルや本文のスニペットからノートをリアルタイムに検索できます。
*   **モダンなUI**: Next.js + Tailwind CSS によるシンプルで見やすいインターフェース。

## 必要要件

*   macOS (Apple Notesがインストールされていること)
*   Node.js (v18以上推奨)
*   Apple Notesのデータベースファイル (`NoteStore.sqlite`) へのアクセス権

## セットアップと実行

セキュリティ制限（Full Disk Access）を回避するため、データベースファイルをプロジェクト内にコピーして使用する方式を採用しています。

1.  **リポジトリのクローン**
    ```bash
    git clone https://github.com/yourusername/seek-an.git
    cd seek-an
    ```

2.  **データベースの準備**
    以下のコマンドで、Apple Notesのデータベースをプロジェクトルートにコピーします。
    ```bash
    cp "/Users/$(whoami)/Library/Group Containers/group.com.apple.notes/NoteStore.sqlite" ./NoteStore.sqlite
    ```
    ※ エラーが出る場合は、Finderから手動でコピーしてください。

3.  **依存関係のインストール**
    ```bash
    npm install
    ```

4.  **ネイティブモジュールのビルド**
    ```bash
    npm rebuild better-sqlite3
    ```

5.  **アプリの起動**
    ```bash
    npm run dev
    ```
    ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてください。

## ライセンス

本ソフトウェアは [MIT License](LICENSE) の下で公開されています。

