 // CSS для анимации
const style = document.createElement('style');
style.textContent = `
  #flash-container {
    position: relative;
    pointer-events: none;
    width: 100%;
    height: 0;
    overflow: visible;
  }

  .heart {
    position: absolute;
    top: 0;
    width: 20px;
    height: 20px;
    background-color: red;
    clip-path: polygon(
      50% 0%,
      61% 12%,
      75% 12%,
      87% 25%,
      87% 38%,
      75% 50%,
      50% 75%,
      25% 50%,
      13% 38%,
      13% 25%,
      25% 12%,
      39% 12%
    );
    opacity: 0.9;
    transform: translateX(-50%) scale(1);
    animation: floatUp 1s ease-out forwards;
    pointer-events: none;
    z-index: 10;
  }

  @keyframes floatUp {
    0% {
      transform: translateX(-50%) translateY(0) scale(1);
      opacity: 0.9;
    }
    100% {
      transform: translateX(-50%) translateY(-100px) scale(1.5);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// JS логика
document.addEventListener('DOMContentLoaded', () => {
  const likeButton = document.getElementById('likeButton');
  const likeCount = document.getElementById('likeCount');
  const flashContainer = document.getElementById('flash-container');

  const scriptURL = "https://script.google.com/macros/s/AKfycbwvsH0jw9GqBg3bHdwNE6FyYggeIR5M_hI58gHLv8h7I-CkA8wF5hjU29-9RhWlW6Cm/exec";

  // Получаем количество лайков
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      if (data && data.count !== undefined) {
        likeCount.textContent = data.count;
      }
    });

  likeButton.addEventListener('click', () => {
    fetch(scriptURL, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data && data.count !== undefined) {
          likeCount.textContent = data.count;
          createHeart();
        }
      });
  });

  function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    const offset = Math.random() * 60 - 30;
    heart.style.left = calc(50% + ${offset}px);
    flashContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
});