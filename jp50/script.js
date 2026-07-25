let currentType = 'hiragana';

// 初始化渲染網頁
document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

// 切換平假名與片假名
function switchType(type) {
  currentType = type;
  document.getElementById('btn-hiragana').classList.toggle('active', type === 'hiragana');
  document.getElementById('btn-katakana').classList.toggle('active', type === 'katakana');
  renderCards();
}

// 動態渲染卡片
function renderCards() {
  const grid = document.getElementById('card-grid');
  grid.innerHTML = '';

  gojuonData.forEach((item) => {
    const char = currentType === 'hiragana' ? item.hiragana : item.katakana;
    
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    cardContainer.innerHTML = `
      <div class="card" onclick="flipCard(this)">
        <!-- 卡片正面 -->
        <div class="card-front">
          <div class="kana-char">${char}</div>
          <div class="romaji">${item.romaji}</div>
          <button class="audio-btn" onclick="playAudio(event, '${char}')">🔊</button>
        </div>
        <!-- 卡片反面 (印象記憶法與單字) -->
        <div class="card-back">
          <span class="mnemonic-title">💡 記憶口訣</span>
          <p class="mnemonic-text">${item.mnemonic}</p>
          <div class="word-box">
            <div class="word-japanese">${item.vocab.jp}</div>
            <div class="word-meaning">${item.vocab.meaning}</div>
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(cardContainer);
  });
}

// 翻牌效果處理
function flipCard(cardElement) {
  cardElement.classList.toggle('flipped');
}

// 語音發音 (Web Speech API)
function playAudio(event, text) {
  // 阻止冒泡事件，避免播放發音時同時翻轉卡片
  event.stopPropagation();
  
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP'; // 設定為日文語系
    utterance.rate = 0.8;    // 稍微放慢語速以利聽清
    window.speechSynthesis.speak(utterance);
  } else {
    alert("您的瀏覽器不支援語音合成功能。");
  }
}
