window.addEventListener('DOMContentLoaded', () => {
  const likeButton = document.getElementById('likeButton');
  const likeCountElement = document.getElementById('likeCount');
  const heart = document.getElementById('heart');
  const scriptURL = "https://script.google.com/macros/s/AKfycbwvsH0jw9GqBg3bHdwNE6FyYggeIR5M_hI58gHLv8h7I-CkA8wF5hjU29-9RhWlW6Cm/exec";

  // Получаем текущее количество лайков
  fetch(scriptURL)
    .then(res => res.json())
    .then(data => {
      if (data && data.count !== undefined) {
        likeCountElement.textContent = data.count;
      }
    });

  likeButton.addEventListener('click', () => {
    // Запуск анимации сердечка
    heart.classList.add('show');
    setTimeout(() => {
      heart.classList.remove('show');
    }, 600);

    // Отправка лайка
    fetch(scriptURL, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data && data.count !== undefined) {
          likeCountElement.textContent = data.count;
        }
      });
  });
});
