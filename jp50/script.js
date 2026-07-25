document.addEventListener("DOMContentLoaded", () => {
  renderCards();
});

function renderCards() {
  const grid = document.getElementById('card-grid');
  if (!grid) return;
  
  grid.innerHTML = '';

  gojuonData.forEach((item) => {
    const wordsHtml = item.words.map(w => `
      <div class="word-item" onclick="playAudio(event, '${w.jp.split(' ')[0]}')">
        <div class="word-jp">${w.jp} <span class="word-romaji">(${w.romaji})</span></div>
        <div class="word-meaning">${w.meaning}</div>
      </div>
    `).join('');

    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';
    
    cardContainer.innerHTML = `
      <div class="card" onclick="flipCard(this)">
        <div class="card-front">
          <div class="kana-pair">
            <span class="kana-hiragana" title="平假名">${item.hiragana}</span>
            <span class="kana-divider">|</span>
            <span class="kana-katakana" title="片假名">${item.katakana}</span>
          </div>
          <div class="romaji">${item.romaji}</div>
          <button class="audio-btn" onclick="playAudio(event, '${item.hiragana}')" title="播放發音">🔊</button>
        </div>
        
        <div class="card-back">
          <div class="hand-drawn-box">
            <div class="mnemonic-tag">📖 情境聯想</div>
            <div class="mnemonic-content">
              👁️ <span>字形：</span>${item.mnemonics.shape}<br>
              🎵 <span>諧音：</span>${item.mnemonics.sound}<br>
              🎬 <span>故事：</span>${item.mnemonics.story}
            </div>
          </div>

          <div class="word-list">
            <span class="word-list-title">📚 實用單字 (點擊發音)</span>
            ${wordsHtml}
          </div>
        </div>
      </div>
    `;
    
    grid.appendChild(cardContainer);
  });
}

function flipCard(cardElement) {
  cardElement.classList.toggle('flipped');
}

function playAudio(event, text) {
  event.stopPropagation();
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  } else {
    alert("您的瀏覽器不支援語音合成功能。");
  }
}
