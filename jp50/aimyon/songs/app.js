document.addEventListener('DOMContentLoaded', () => {
  fetchDataAndRender();
  initCanvasEffect();
});

// 1. 從 JSON 動態載入連結資料
async function fetchDataAndRender() {
  const container = document.getElementById('cardsGrid');
  try {
    const response = await fetch('data.json');
    const data = await response.json();

    container.innerHTML = data.map(item => `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="card-item" data-tilt>
        <div>
          <div class="card-header">
            <span class="sticker-icon">${item.sticker || '🎵'}</span>
            <span style="font-size:0.9rem; font-weight:bold; color:${item.color || '#333'}">AIMYON LINK ↗</span>
          </div>
          <h2 class="song-title">${item.title}</h2>
          <p class="song-subtitle">${item.subtitle}</p>
        </div>
        <div class="tags">
          ${item.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
        </div>
      </a>
    `).join('');

    init3DTilt();
  } catch (err) {
    container.innerHTML = '<p>資料讀取失敗，請確認 data.json 檔案。</p>';
  }
}

// 2. 酷炫 3D 視差傾斜特效 (Tilt Effect)
function init3DTilt() {
  const cards = document.querySelectorAll('.card-item');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

// 3. Canvas 游標繪圖動態 (手繪塗鴉流星微粒)
function initCanvasEffect() {
  const canvas = document.getElementById('doodleCanvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  let particles = [];

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push({
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 6 + 2,
        color: ['#ffde59', '#ff5757', '#3498db', '#e67e22'][Math.floor(Math.random() * 4)],
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1
      });
    }
  });

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 0.02;

      if (p.life <= 0) {
        particles.splice(index, 1);
      } else {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    });

    requestAnimationFrame(animate);
  }
  animate();
}
