# Game Programmer Portfolio

GitHub Pages 用のビルド不要な、1ページ完結型の静的ポートフォリオです。`index.html` の縦スクロール内に作品一覧・経歴・研究活動を掲載します。

## 公開方法

1. このフォルダを GitHub リポジトリに push します。
2. GitHub の **Settings → Pages** を開きます。
3. **Build and deployment** で `Deploy from a branch`、Branch に `main`、Folder に `/(root)` を指定して保存します。
4. 表示された URL で公開を確認します。

## 公開前の差し替え箇所

- `index.html` の自己紹介、作品名、担当、期間、チーム人数、動画・リンク、経歴、研究テーマ・成果

## 作品の追加・削除

作品は `projects.js` の `projects` 配列で管理しています。配列内の1ブロックを複製・編集すれば追加、削除すれば一覧・カテゴリ絞り込み・動画ポップアップ・詳細ポップアップから同時に消えます。

- `category`：`game` / `design` / `web`
- `visual`：`visual-game` / `visual-system` / `visual-web` / `visual-design`
- `thumbnails`：スクリーンショット画像の配列。動画がない場合は1枚目をカードへ表示し、メディアビューでは順送りで閲覧できます
- `video`：MP4 のパス、または YouTube の通常URL・短縮URL・埋め込みURL。設定時は動画をカードに優先表示します
- `focus`：詳細ポップアップの「こだわり・課題解決」。`commitment` にこだわり、`challenge` に課題・解決を設定します。どちらか片方だけでも表示できます
- `future`：詳細ポップアップの「今後の取り組み」。`null` または空欄なら表示されません
- `production`：`individual` または `team`。一覧と詳細で「個人制作／チーム制作」を表示します
- `teamContribution`：チーム制作の場合のみ、Summary の直下に表示する自分の担当箇所
- 各詳細項目の `image`：画像パス。設定すると、画像と本文を2列で表示します


動画は、該当作品の `video` に `assets/videos/作品名.mp4` または `https://www.youtube.com/watch?v=動画ID` を設定すると、カードをタップしたときのメディアビューで再生されます。YouTube URLを設定した作品は、カード上部にもYouTubeサムネイルと再生表示が自動で出ます。

`thumbnails` は以下のように設定します。動画と画像が複数あるときだけ、メディアビューに送りボタンが表示されます。

```js
thumbnails: [
  'assets/images/project-01.jpg',
  'assets/images/project-02.jpg'
],
```
