// 0. Список гостей: код в ссылке → обращение и имя
const guests = {
  marinaegor: { greet: 'Дорогие', name: 'Егор и Марина' },
  masha:   { greet: 'Дорогая', name: 'Маша' },
  petrov:  { greet: 'Дорогой', name: 'Пётр Иванович' }
};

const code = new URLSearchParams(location.search).get('g');
const guest = guests[code];

if (guest) {
  document.getElementById('greeting').textContent = `${guest.greet} ${guest.name}!`;
  const nameInput = document.getElementById('guestName');
  nameInput.value = guest.name;   // имя уйдёт вместе с анкетой
  nameInput.type = 'hidden';      // поле прячем
}

// 1. Блоки плавно появляются при прокрутке
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// 2. Обратный отсчёт до свадьбы
const weddingDate = new Date('2027-07-16T15:00:00');
function tick() {
  const diff = weddingDate - new Date();
  const box = document.getElementById('countdown');
  if (diff <= 0) { box.textContent = 'Сегодня наш день!'; return; }
  const d = Math.floor(diff / 864e5);
  const h = Math.floor(diff / 36e5) % 24;
  const m = Math.floor(diff / 6e4) % 60;
  const s = Math.floor(diff / 1e3) % 60;
  box.textContent = `До свадьбы: ${d} дн. ${h} ч. ${m} мин. ${s} сек.`;
}
tick();
setInterval(tick, 1000);

// 3. Падающие листики
setInterval(() => {
  const leaf = document.createElement('div');
  leaf.className = 'heart';
  leaf.textContent = '🍃';
  leaf.style.left = Math.random() * 100 + 'vw';
  leaf.style.fontSize = 10 + Math.random() * 20 + 'px';
  leaf.style.animationDuration = 4 + Math.random() * 4 + 's';
  document.body.appendChild(leaf);
  setTimeout(() => leaf.remove(), 8000);
}, 600);

// 4. Отправка анкеты без перезагрузки страницы
const form = document.getElementById('rsvp');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const res = await fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: { Accept: 'application/json' }
  });
  if (res.ok) {
    form.classList.add('hidden');
    document.getElementById('thanks').classList.remove('hidden');
  } else {
    alert('Не удалось отправить, попробуйте ещё раз');
  }
});