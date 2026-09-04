未來如何新增歌曲連結？
往後要增加歌曲或連結時，不需要動到任何程式碼，只需登入 GitHub 點開 data.json，按下編輯（✏️），在陣列後方貼上新的 JSON 區塊即可：

JSON
  {
    "id": "new-song",
    "title": "新歌歌名",
    "subtitle": "中文歌名或備註",
    "url": "http://go.itigre.com/your-link",
    "tags": ["文法解析", "動詞變化"],
    "sticker": "🎸",
    "color": "#9b59b6"
  }
