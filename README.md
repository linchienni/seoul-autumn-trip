# 鶯歌姐妹團 🍁 首爾賞楓變美之旅

這是為 **GitHub Pages** 準備的單頁旅遊行程網站（2026/11/12–11/16）。採用純 HTML / CSS / JavaScript，不需要安裝套件或額外架設伺服器。

## 配色（沿用韓系秋日五色）

依照提供的韓系秋日五色參考圖調整：

- Seal brown `#6B2717` — 主要按鈕、強調文字
- Satin sheen gold `#CC9E4C` — 金色重點、地圖按鈕與裝飾
- Dun `#E0D0B6` — 網站底色、行程區塊
- Cadet gray `#8B9EA5` — 地圖資訊區、封面插畫天空
- Bistre `#442C1B` — 主要文字、選中的日期按鈕

## 共用 Naver Map 連結

已在首頁和「景點地圖」區塊加上 `https://naver.me/GEdGFSLw`，訪客點擊後會在新分頁開啟。每筆行程原有的 Naver Map 搜尋按鈕仍保留，兩者用途不同。


## 直接預覽

用瀏覽器開啟 `index.html`，或在 GitHub Pages 發布後使用網站網址開啟。手機上可點選 DAY 01–05 切換行程；每個景點的按鈕會開啟 Naver Map 搜尋，也能從首頁進入共用的 Naver Map 連結。

## 如何用 GitHub Pages 發布

1. 登入 GitHub，建立一個新的 **Public repository**（例如 `seoul-autumn-trip`）。
2. 將 `index.html`、`.nojekyll`、`README.md` 上傳到該 repository 的根目錄，commit 到 `main` branch。
3. 打開 **Settings → Pages**，在 **Build and deployment / Source** 選擇 **Deploy from a branch**。
4. 選擇 `main`、`/(root)`，儲存。
5. 等待部署完成，網站網址通常為 `https://<你的GitHub帳號>.github.io/seoul-autumn-trip/`。

官方參考：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 內容更新（2026/11/05）

- 已按 Google Sheets「第二屆」目前最新版本更新 DAY 1–DAY 5，全程時間與地點皆重新同步。
- DAY 2 已改為南山天空森林步道 → 聖水 → 首爾林；DAY 3 加入 A 案全天包車／B 案 Lalamove 行李配送、廣藏市場、明洞與首爾站樂天超市；DAY 4 新增弘大夜間散步。
- 旅行備忘錄新增「記得買網卡或 eSIM」。
- 應同行者要求，公開顯示目前已提供的 **11/12–11/14 漢城大韓屋完整地址**：`서울특별시 성북구 성북로5길 29-12`，並提供 Naver Map 導航；合井 Airbnb 目前只有站點範圍，未杜撰詳細地址。
- GitHub Pages 的 Public repository 一般是**公開可見**的，包含住宿地址。若僅希望旅伴看到，請確認是否願意將完整門牌公開。
- 更新 Google Sheets **不會自動同步到網站**；要重新部署請把新版檔案 commit 到 GitHub。

## 更新資料

行程內容寫在 `index.html` 尾段 JavaScript 裡的 `const DAYS = [...]`。可以修改該段，commit 後網站就會發布新版。