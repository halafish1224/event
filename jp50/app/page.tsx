const vowelColumns = [
  { label: "あ段", vowel: "a", mouth: "口自然打開" },
  { label: "い段", vowel: "i", mouth: "嘴角微拉平" },
  { label: "う段", vowel: "u", mouth: "唇略收、不要圓太多" },
  { label: "え段", vowel: "e", mouth: "介於 e / eh，舌位放鬆" },
  { label: "お段", vowel: "o", mouth: "短而穩，不拖長" },
];

const gojuonRows = [
  {
    label: "あ行",
    keySound: "母音骨架",
    note: "先把 a i u e o 固定，後面每一行都只是替換前面的子音。",
    cells: [
      ["あ", "ア", "a", "啊，開口定位"],
      ["い", "イ", "i", "像衣的短音"],
      ["う", "ウ", "u", "唇收但不嘟"],
      ["え", "エ", "e", "像欸但更短"],
      ["お", "オ", "o", "喔的短拍"],
    ],
  },
  {
    label: "か行",
    keySound: "k + 母音",
    note: "用 ka ki ku ke ko 直向掃讀，後續濁音會變成 ga gi gu ge go。",
    cells: [
      ["か", "カ", "ka", "像卡片的 ka"],
      ["き", "キ", "ki", "兩筆像鑰匙齒"],
      ["く", "ク", "ku", "轉角像咕嚕入口"],
      ["け", "ケ", "ke", "像提著水壺"],
      ["こ", "コ", "ko", "兩橫框住 ko"],
    ],
  },
  {
    label: "さ行",
    keySound: "s + 母音",
    note: "し不是 si，讀 shi；教學時把例外字用不同顏色先標出。",
    cells: [
      ["さ", "サ", "sa", "像沙漏斜線"],
      ["し", "シ", "shi", "魚鉤形，例外音"],
      ["す", "ス", "su", "旋轉收尾"],
      ["せ", "セ", "se", "像設下橫線"],
      ["そ", "ソ", "so", "單筆收束"],
    ],
  },
  {
    label: "た行",
    keySound: "t + 母音",
    note: "ち讀 chi、つ讀 tsu；這一行最適合做例外音聽辨。",
    cells: [
      ["た", "タ", "ta", "像拿叉吃 taco"],
      ["ち", "チ", "chi", "例外音，像微笑線"],
      ["つ", "ツ", "tsu", "像海浪或氣流"],
      ["て", "テ", "te", "像手持工具"],
      ["と", "ト", "to", "停在直線旁"],
    ],
  },
  {
    label: "な行",
    keySound: "n + 母音",
    note: "なにぬねの可接生活詞，快速建立識字成就感。",
    cells: [
      ["な", "ナ", "na", "像打結的線"],
      ["に", "ニ", "ni", "兩橫像二"],
      ["ぬ", "ヌ", "nu", "尾巴多一圈"],
      ["ね", "ネ", "ne", "像貓尾彎起"],
      ["の", "ノ", "no", "一圈像 no 的 O"],
    ],
  },
  {
    label: "は行",
    keySound: "h + 母音",
    note: "ふ讀 fu，不是 hu；此行加兩點變 b，加小圈變 p。",
    cells: [
      ["は", "ハ", "ha", "像兩片葉子"],
      ["ひ", "ヒ", "hi", "像笑開的嘴角"],
      ["ふ", "フ", "fu", "輕吹，例外音"],
      ["へ", "ヘ", "he", "山形上揚"],
      ["ほ", "ホ", "ho", "比 は 多一筆"],
    ],
  },
  {
    label: "ま行",
    keySound: "m + 母音",
    note: "嘴唇閉合後放開，適合搭配拍手練習一拍一音。",
    cells: [
      ["ま", "マ", "ma", "像媽媽抱住線"],
      ["み", "ミ", "mi", "三筆像米粒"],
      ["む", "ム", "mu", "尾端像鉤住"],
      ["め", "メ", "me", "像交叉的目光"],
      ["も", "モ", "mo", "兩橫加彎鉤"],
    ],
  },
  {
    label: "や行",
    keySound: "y + 母音",
    note: "只有 ya yu yo；空格不是漏背，而是表本來就沒有。",
    cells: [
      ["や", "ヤ", "ya", "箭頭展開"],
      null,
      ["ゆ", "ユ", "yu", "像悠閒繞圈"],
      null,
      ["よ", "ヨ", "yo", "像右轉三橫"],
    ],
  },
  {
    label: "ら行",
    keySound: "r + 母音",
    note: "日文 r 介於 l / r，舌尖輕彈一次，不要捲舌。",
    cells: [
      ["ら", "ラ", "ra", "像拉開布簾"],
      ["り", "リ", "ri", "兩線快速落下"],
      ["る", "ル", "ru", "尾巴收圓"],
      ["れ", "レ", "re", "像折線轉身"],
      ["ろ", "ロ", "ro", "方框穩住"],
    ],
  },
  {
    label: "わ行",
    keySound: "w + 母音",
    note: "現代常用 わ、を；を作助詞時通常讀 o。",
    cells: [
      ["わ", "ワ", "wa", "像彎起的線"],
      null,
      null,
      null,
      ["を", "ヲ", "o", "助詞常讀 o"],
    ],
  },
];

const specialTile = ["ん", "ン", "n", "唯一單獨子音；依後面音改變鼻音位置"];

const memoryMethods = [
  {
    title: "五段先行",
    tag: "發音定位",
    summary:
      "先練 あ・い・う・え・お 的口型與一拍長度，再把每行視為子音替換。這能讓初學者不是背 46 個符號，而是背 5 個母音座標。",
    classroom: "開場 3 分鐘只做母音口型：看鏡子、拍一拍、讀一拍。",
  },
  {
    title: "行順口訣",
    tag: "表格骨架",
    summary:
      "あ、か、さ、た、な、は、ま、や、ら、わ、ん 先背成路線，空格照表保留。學生知道位置後，遇到新字能用座標回想。",
    classroom: "每次練習都從行首往右，再從同段往下掃讀。",
  },
  {
    title: "圖像聯想",
    tag: "識字記憶",
    summary:
      "把假名形狀連到圖像、聲音或生活物件；這是 Tofugu、圖像記憶教材與許多線上五十音教學都常用的方式。",
    classroom: "每個字只留一個最有感的畫面，避免一字多故事造成混亂。",
  },
  {
    title: "節奏歌曲",
    tag: "順序保持",
    summary:
      "把整張表唱成固定節奏，幫助保留十行順序；再把唱誦拆回看字快讀，避免只會唱、不會認。",
    classroom: "唱一次、遮表讀一次、隨機抽卡一次，三輪才算完成。",
  },
  {
    title: "主動回想",
    tag: "長期記憶",
    summary:
      "比反覆看表更有效的是遮住、填空、聽寫、混合測驗。熱門教材通常都會搭配 worksheet、quiz 或 assessment。",
    classroom: "每 10 分鐘做一次低壓小測，錯字進入苦手清單。",
  },
];

const soundRules = [
  {
    title: "清音到濁音",
    rule: "か行 K 變 G、さ行 S 變 Z、た行 T 變 D、は行 H 變 B；は行加小圈變 P。",
    example: "かき kaki 是柿，かぎ kagi 是鑰匙；一個濁點會改變意思。",
  },
  {
    title: "拗音",
    rule: "い段假名接小 や・ゆ・よ，合成一拍：きゃ、しゅ、ちょ。",
    example: "きや 是兩拍，きゃ 是一拍；課堂要用拍手區分。",
  },
  {
    title: "促音",
    rule: "小 っ 不發完整音，而是在下一個子音前停一拍，羅馬字常寫成雙子音。",
    example: "きて kite 和 きって kitte，差別在中間的停頓。",
  },
  {
    title: "長音",
    rule: "母音拉長一拍會改變詞義；片假名多用 ー 表示長音。",
    example: "おばさん 是阿姨，おばあさん 是奶奶或老婆婆。",
  },
  {
    title: "撥音 ん",
    rule: "ん 是獨立一拍，會依後面的音變成接近 m、n 或 ng 的鼻音。",
    example: "さんぽ 的 ん 接 p，嘴唇會自然閉合。",
  },
];

const courseUnits = [
  {
    title: "單元 1：母音與表格座標",
    outcome: "學生能讀出五段，並說明五段十行如何運作。",
    steps: ["口型定位", "母音卡快讀", "同段直向掃讀", "填空五段表"],
    open: true,
  },
  {
    title: "單元 2：か・さ・た・な行",
    outcome: "學生能辨識前四組常用行，並記住 し、ち、つ。",
    steps: ["行順口訣", "例外音標色", "圖像聯想卡", "10 個短詞拼讀"],
    open: false,
  },
  {
    title: "單元 3：は・ま・や・ら・わ・ん",
    outcome: "學生完成清音主要表，能說明空格與 ん 的位置。",
    steps: ["ふ、ら行舌尖練習", "や行空格觀察", "を 助詞讀法", "清音總複習"],
    open: false,
  },
  {
    title: "單元 4：片假名遷移",
    outcome: "學生知道平假名與片假名同音不同用途，能配對常見外來語。",
    steps: ["平片配對", "外來語標籤", "名字與品牌讀法", "混合辨識"],
    open: false,
  },
  {
    title: "單元 5：濁音、半濁音、拗音",
    outcome: "學生能由清音推導變化音，而不是重新硬背一張表。",
    steps: ["K/S/T/H 變音表", "一拍拗音", "最小對比詞", "聽寫修正"],
    open: false,
  },
  {
    title: "單元 6：促音、長音與真實閱讀",
    outcome: "學生能把假名放進菜單、車站、問候語與短句閱讀。",
    steps: ["拍數練習", "長短音辨義", "生活字卡", "30 秒朗讀錄音"],
    open: false,
  },
];

const lessonRhythm = [
  ["00-05", "口型暖身", "母音五段，一拍一音，不拖尾。"],
  ["05-13", "表格掃讀", "橫讀一行、直讀一段，建立座標。"],
  ["13-25", "形狀聯想", "新字配一張圖像卡，立刻遮住回想。"],
  ["25-35", "發音對比", "例外音、濁音、長短音用最小對比練。"],
  ["35-45", "應用輸出", "讀真實詞、做小聽寫、更新苦手清單。"],
];

const applicationIdeas = [
  "菜單：すし、みそ、ラーメン，練清音與長音。",
  "交通：えき、きっぷ、バス，練促音與片假名。",
  "問候：おはよう、こんにちは，練長音與 は 的語境讀法。",
  "姓名：たなか、やまだ、サトウ，練行順與片假名遷移。",
];

const sources = [
  {
    name: "Tofugu Learn Hiragana",
    href: "https://www.tofugu.com/japanese/learn-hiragana/",
    use: "圖像聯想、分欄練習、遮表回想與 worksheet 思路。",
  },
  {
    name: "Tofugu Japanese Pronunciation",
    href: "https://www.tofugu.com/japanese/japanese-pronunciation/",
    use: "長短音、促音與日語發音應用整理。",
  },
  {
    name: "JapanesePod101 Pronunciation Curriculum",
    href: "https://www.japanesepod101.com/japanesepod101-pronunciation-curriculum/",
    use: "由基本音、濁音、拗音、促音、長音漸進的課程順序。",
  },
  {
    name: "Iku老師五十音完全入門",
    href: "https://jp.ikuchannel.com/articles/hiragana-katakana-master",
    use: "繁中學習者視角的背誦順序、兩套假名用途與發音規則。",
  },
  {
    name: "永漢日語進階發音整理",
    href: "https://www.eikan.com.tw/e_news.php?id=1270",
    use: "濁音、半濁音、拗音、促音、長音分類與例字設計。",
  },
  {
    name: "Cocolong 五十音記憶法",
    href: "https://www.cocolong.com.tw/zh-tw/japanese/article.php?act=view&id=78",
    use: "圖像、音樂、分組與多感官記憶法的熱門做法整理。",
  },
];

function KanaCell({ cell }: { cell: string[] | null }) {
  if (!cell) {
    return (
      <div className="kana-cell kana-empty" aria-label="此段無常用假名">
        <span>--</span>
      </div>
    );
  }

  const [hiragana, katakana, romaji, cue] = cell;
  return (
    <div className="kana-cell">
      <div className="kana-pair">
        <span>{hiragana}</span>
        <span>{katakana}</span>
      </div>
      <strong>{romaji}</strong>
      <small>{cue}</small>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" aria-label="五十音五段十行記憶課">
        <div className="hero-content">
          <p className="eyebrow">Japanese Gojuon Course Builder</p>
          <h1>五十音五段十行記憶課</h1>
          <p className="hero-copy">
            用「五段母音 × 十行子音」建立識字座標，再把熱門記憶法、發音規則與真實詞彙練習排成一套可教、可複習的課程。
          </p>
          <div className="hero-metrics" aria-label="課程重點">
            <div>
              <strong>5</strong>
              <span>母音段定位</span>
            </div>
            <div>
              <strong>10</strong>
              <span>行順路線</span>
            </div>
            <div>
              <strong>6</strong>
              <span>課程單元</span>
            </div>
          </div>
        </div>
      </section>

      <nav className="quick-nav" aria-label="頁面段落導覽">
        <a href="#chart">五段十行表</a>
        <a href="#methods">熱門記憶法</a>
        <a href="#pronunciation">發音應用</a>
        <a href="#course">課程編排</a>
        <a href="#sources">資料來源</a>
      </nav>

      <section className="intro-band">
        <div className="section-inner intro-grid">
          <div>
            <p className="section-kicker">核心設計</p>
            <h2>先學座標，再學符號。</h2>
          </div>
          <p>
            五十音不是隨機清單。五段代表固定母音 a・i・u・e・o，十行代表子音路線。課程先讓學生知道每個字住在哪個座標，再用圖像、節奏、手寫與聽辨把形音連起來。
          </p>
        </div>
      </section>

      <section id="chart" className="section-inner chart-section">
        <div className="section-heading">
          <p className="section-kicker">Recognition Map</p>
          <h2>五段十行識字表</h2>
          <p>
            每格同時顯示平假名、片假名、羅馬字與一句記憶提示。空格保留，讓學生理解表格規則，而不是誤以為漏背。
          </p>
        </div>

        <div className="vowel-strip" aria-label="五段母音口型提示">
          {vowelColumns.map((column) => (
            <div key={column.label}>
              <strong>{column.label}</strong>
              <span>{column.vowel}</span>
              <small>{column.mouth}</small>
            </div>
          ))}
        </div>

        <div className="kana-board" role="table" aria-label="五十音五段十行表">
          <div className="board-head" role="row">
            <span role="columnheader">行</span>
            {vowelColumns.map((column) => (
              <span key={column.label} role="columnheader">
                {column.label}
              </span>
            ))}
          </div>
          {gojuonRows.map((row) => (
            <div className="board-row" role="row" key={row.label}>
              <div className="row-label" role="rowheader">
                <strong>{row.label}</strong>
                <span>{row.keySound}</span>
                <small>{row.note}</small>
              </div>
              {row.cells.map((cell, index) => (
                <KanaCell cell={cell} key={`${row.label}-${index}`} />
              ))}
            </div>
          ))}
          <div className="special-row">
            <div className="row-label">
              <strong>撥音</strong>
              <span>單獨一拍</span>
              <small>放在清音表後練，避免和 な行混淆。</small>
            </div>
            <div className="kana-cell special-cell">
              <div className="kana-pair">
                <span>{specialTile[0]}</span>
                <span>{specialTile[1]}</span>
              </div>
              <strong>{specialTile[2]}</strong>
              <small>{specialTile[3]}</small>
            </div>
          </div>
        </div>
      </section>

      <section id="methods" className="method-band">
        <div className="section-inner">
          <div className="section-heading light-heading">
            <p className="section-kicker">Memory Methods</p>
            <h2>網路熱門記憶法整理</h2>
            <p>
              這些方法在常見線上教材、圖像記憶表、發音課程與自學文章中反覆出現。網站把它們整理成可直接放進課堂的活動。
            </p>
          </div>
          <div className="method-grid">
            {memoryMethods.map((method) => (
              <article className="method-card" key={method.title}>
                <span>{method.tag}</span>
                <h3>{method.title}</h3>
                <p>{method.summary}</p>
                <strong>{method.classroom}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pronunciation" className="section-inner pronunciation-section">
        <div className="section-heading">
          <p className="section-kicker">Pronunciation Lab</p>
          <h2>從識字走到發音應用</h2>
          <p>
            五十音學完後，真正的關卡是「拍數」與「變化音」。這裡把延伸規則包成五個可練的發音任務。
          </p>
        </div>
        <div className="rule-grid">
          {soundRules.map((item) => (
            <article className="rule-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.rule}</p>
              <small>{item.example}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="application-band">
        <div className="section-inner app-grid">
          <div>
            <p className="section-kicker">Applied Reading</p>
            <h2>把假名放回真實情境。</h2>
            <p>
              初學者最需要快速看到「我讀得出來」。課程可用菜單、交通、問候、姓名建立短詞任務，讓識字和發音同時發生。
            </p>
          </div>
          <div className="application-list">
            {applicationIdeas.map((idea) => (
              <div key={idea}>{idea}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="course" className="section-inner course-section">
        <div className="section-heading">
          <p className="section-kicker">Course Flow</p>
          <h2>六單元課程編排</h2>
          <p>
            由清音主表開始，逐步加入片假名、濁音、拗音、促音與長音。每單元都有明確輸出，不停在「看過」。
          </p>
        </div>
        <div className="course-list">
          {courseUnits.map((unit) => (
            <details className="unit-card" key={unit.title} open={unit.open}>
              <summary>
                <span>{unit.title}</span>
                <small>{unit.outcome}</small>
              </summary>
              <ul>
                {unit.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="section-inner rhythm-section">
        <div className="section-heading compact-heading">
          <p className="section-kicker">Class Script</p>
          <h2>45 分鐘練習節奏</h2>
        </div>
        <div className="rhythm-table" role="table" aria-label="45 分鐘課堂練習節奏">
          {lessonRhythm.map(([time, title, description]) => (
            <div className="rhythm-row" role="row" key={time}>
              <strong>{time}</strong>
              <span>{title}</span>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="sources" className="source-band">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Source Digest</p>
            <h2>資料來源與整理原則</h2>
            <p>
              內容以常見公開教學資源為基礎，整理成繁中課程設計語言；實際課堂可再依學生母語、年齡與學習目標調整例字。
            </p>
          </div>
          <div className="source-grid">
            {sources.map((source) => (
              <a href={source.href} target="_blank" rel="noreferrer" key={source.name}>
                <strong>{source.name}</strong>
                <span>{source.use}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
