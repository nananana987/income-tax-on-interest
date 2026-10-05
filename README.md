# 利息・源泉税 逆算ツール

通帳の入金額（手取り額）から、利息総額（額面）と源泉徴収税額計（所得税15%・復興特別所得税0.315%の合算）を逆算するWebツールです。
画面のどこをタップしてもすぐに入力でき、瞬時に計算結果が表示されます。

---

## 🚀 GitHub Pages への公開方法

以下の **【方法1（最も確実・設定変更のみ）】** または **【方法2（GitHub Actions自動ビルド）】** のいずれかで簡単に公開できます。

---

### 【方法1】 `docs` フォルダから公開（一番簡単・エラーなし）

ビルドエラーや権限設定の心配がなく、GitHubの設定を1箇所変えるだけで今すぐ確実に公開できます！

1. GitHubのリポジトリページを開きます。
2. 上部メニューの **[Settings]** をクリックします。
3. 左側メニューの **[Pages]** をクリックします。
4. **[Build and deployment]** で以下のように選択します：
   - **Source**: `Deploy from a branch`
   - **Branch**: `main`
   - **Folder**: `/docs`
5. **[Save]** ボタンを押します。
6. 数十秒で `https://<ユーザー名>.github.io/<リポジトリ名>/` にてツールが公開されます！

---

### 【方法2】 GitHub Actions で自動ビルドして公開する場合

1. GitHubリポジトリの **[Settings]** > **[Pages]** を開きます。
2. **[Build and deployment]** > **[Source]** のプルダウンで **「GitHub Actions」** を選択します。
   > ※ `exit code 1` が出る最大の原因は、ここが「GitHub Actions」になっていないことです。必ず「GitHub Actions」を選択してください。
3. コードを push すると、自動的にビルド＆公開されます。


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
