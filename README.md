# 利息・源泉税 逆算ツール

通帳の入金額（手取り額）から、利息総額（額面）と源泉徴収税額計（所得税15%・復興特別所得税0.315%の合算）を逆算するWebツールです。
画面のどこをタップしてもすぐに入力でき、瞬時に計算結果が表示されます。

---

## 🚀 GitHub Pages への公開方法

本プロジェクトは GitHub Pages に即座に公開できるよう設定済みです（`vite.config.ts` で `base: './'` の相対パス設定済み、自動ビルド用 GitHub Actions ワークフロー完備）。

### 手順

1. **GitHubリポジトリにプッシュ**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<あなたのユーザー名>/<リポジトリ名>.git
   git push -u origin main
   ```

2. **GitHub Pages の設定を「GitHub Actions」にする**
   - GitHubのリポジトリページで **[Settings]** タブを開きます。
   - 左側メニューの **[Pages]** を選択します。
   - **[Build and deployment]** > **[Source]** で **「GitHub Actions」** を選択します。

3. **公開完了**
   - push されると自動でビルド＆デプロイが実行され、`https://<あなたのユーザー名>.github.io/<リポジトリ名>/` で公開されます。

---

## 💻 ローカル実行方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動 (http://localhost:3000)
npm run dev

# プロダクションビルド
npm run build
```
