/* ============================================================
   MICROLEARN PWA – app.js
   ============================================================ */

'use strict';

// ===================== DATA =====================

const LESSONS_DATA = [
  {
    id: 'js-closures',
    title: 'Domknięcia w JavaScript',
    category: 'Programowanie',
    emoji: '🔒',
    color: '#f59e0b',
    duration: '5 min',
    difficulty: 'Średni',
    tags: ['JavaScript', 'Funkcje'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">🔒</span>
        <h1>Domknięcia w JavaScript</h1>
        <p class="lesson-hero-meta">📚 Programowanie · ⏱ 5 min · 🎯 Średni</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">JavaScript</span>
          <span class="lesson-hero-tag">Funkcje</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>Czym jest domknięcie?</h2>
        <p>
          <strong>Domknięcie (closure)</strong> to funkcja, która „zapamiętuje" środowisko,
          w którym została utworzona — nawet po tym, gdy to środowisko już nie istnieje.
        </p>
        <div class="callout"><p>💡 Prościej: funkcja wewnętrzna ma dostęp do zmiennych funkcji zewnętrznej.</p></div>
        <h2>Przykład</h2>
        <p>Wyobraź sobie licznik:</p>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>function createCounter() {
  let count = 0;          // zmienna "zamknięta"
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3</code></pre>
        <p>Funkcja wewnętrzna przechowuje referencję do <strong>count</strong> — to właśnie domknięcie.</p>
        <h2>Gdzie są używane?</h2>
        <ul>
          <li>Prywatne zmienne i metody</li>
          <li>Callbacki i obsługa zdarzeń</li>
          <li>Currying i partial application</li>
          <li>Memoizacja wyników</li>
        </ul>
        <div class="lesson-video-wrap">
          <div class="lesson-video-placeholder">
            <span>▶️</span>
            <p>Wideo: Closures w 2 minuty</p>
          </div>
        </div>
        <h2>Pułapka – pętla + closure</h2>
        <p>Klasyczny błąd:</p>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>// BŁĄD – wydrukuje 3, 3, 3
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// POPRAWNIE – użyj let lub IIFE
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2
}</code></pre>
        <div class="callout"><p>🎓 Rozwiązanie: używaj <strong>let</strong> zamiast <strong>var</strong> w pętlach.</p></div>
      </div>
    `,
    quiz: [
      {
        q: 'Co to jest domknięcie (closure) w JavaScript?',
        options: ['Funkcja, która nie przyjmuje argumentów', 'Funkcja, która pamięta swoje środowisko leksykalne', 'Metoda zatrzymująca wykonanie kodu', 'Typ danych w JavaScript'],
        correct: 1,
        explanation: 'Domknięcie to funkcja, która zachowuje dostęp do zmiennych ze swojego zewnętrznego zakresu, nawet po zakończeniu funkcji zewnętrznej.'
      },
      {
        q: 'Co wydrukuje pętla z "var" i setTimeout?',
        options: ['0, 1, 2', '1, 2, 3', 'Trzy razy ostatnią wartość i', 'undefined'],
        correct: 2,
        explanation: 'Z "var" wszystkie callbacki współdzielą tę samą zmienną i. Po zakończeniu pętli i=3, więc wszystkie drukują 3.'
      },
      {
        q: 'Jak naprawić pułapkę pętli z closure?',
        options: ['Użyć "var" zamiast "let"', 'Użyć "let" lub IIFE w pętli', 'Dodać try/catch', 'Użyć == zamiast ==='],
        correct: 1,
        explanation: '"let" tworzy nowy zakres dla każdej iteracji pętli, więc każdy callback ma własną kopię zmiennej i.'
      }
    ]
  },
  {
    id: 'css-grid',
    title: 'CSS Grid – Podstawy',
    category: 'Web Design',
    emoji: '🎨',
    color: '#8b5cf6',
    duration: '5 min',
    difficulty: 'Łatwy',
    tags: ['CSS', 'Layout'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">🎨</span>
        <h1>CSS Grid – Podstawy</h1>
        <p class="lesson-hero-meta">🎨 Web Design · ⏱ 5 min · 🟢 Łatwy</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">CSS</span>
          <span class="lesson-hero-tag">Layout</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>CSS Grid — siatka dwuwymiarowa</h2>
        <p><strong>CSS Grid</strong> to potężny system layoutu, który działa w dwóch wymiarach: <strong>wierszach i kolumnach</strong>.</p>
        <div class="callout"><p>💡 Flexbox = 1D (oś), Grid = 2D (oś X + Y)</p></div>
        <h2>Podstawowa składnia</h2>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 kolumny */
  grid-template-rows: auto;
  gap: 16px;
}</code></pre>
        <h2>Jednostka fr</h2>
        <p>Jednostka <strong>fr</strong> (fraction) dzieli dostępną przestrzeń proporcjonalnie:</p>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>grid-template-columns: 1fr 2fr 1fr;
/* Środkowa kolumna 2x szersza */

grid-template-columns: repeat(4, 1fr);
/* 4 równe kolumny – skrót */</code></pre>
        <h2>Rozciąganie elementów</h2>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>.item {
  grid-column: 1 / 3;   /* od linii 1 do 3 */
  grid-row: 2 / 4;      /* od linii 2 do 4 */
}</code></pre>
        <ul>
          <li><strong>grid-column: 1 / -1</strong> = pełna szerokość</li>
          <li><strong>span 2</strong> = zajmij 2 komórki</li>
        </ul>
        <div class="lesson-video-wrap">
          <div class="lesson-video-placeholder">
            <span>▶️</span>
            <p>Wideo: CSS Grid w praktyce</p>
          </div>
        </div>
      </div>
    `,
    quiz: [
      {
        q: 'Co oznacza "display: grid" w CSS?',
        options: ['Tworzy siatkę tylko w jednym wymiarze', 'Tworzy dwuwymiarowy system layoutu', 'To samo co display: flex', 'Wyświetla element jako tabelę'],
        correct: 1,
        explanation: 'display: grid aktywuje CSS Grid – dwuwymiarowy system layoutu działający w poziomie (kolumny) i pionie (wiersze) jednocześnie.'
      },
      {
        q: 'Co oznacza "1fr" w CSS Grid?',
        options: ['1 piksel', '1 fragment (ułamek wolnej przestrzeni)', '1% szerokości', '1 rem'],
        correct: 1,
        explanation: '"fr" (fraction) to jednostka reprezentująca ułamek dostępnej przestrzeni. "1fr 2fr" daje stosunek 1:2.'
      }
    ]
  },
  {
    id: 'brain-neuroplasticity',
    title: 'Neuroplastyczność mózgu',
    category: 'Nauka',
    emoji: '🧠',
    color: '#ec4899',
    duration: '5 min',
    difficulty: 'Łatwy',
    tags: ['Nauki ścisłe', 'Biologia'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">🧠</span>
        <h1>Neuroplastyczność mózgu</h1>
        <p class="lesson-hero-meta">🔬 Nauka · ⏱ 5 min · 🟢 Łatwy</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">Nauki ścisłe</span>
          <span class="lesson-hero-tag">Biologia</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>Mózg może się zmieniać</h2>
        <p>Przez długi czas uważano, że dorosły mózg jest niezmienny. Współczesna nauka obaliła ten mit — mózg posiada zdolność do <strong>neuroplastyczności</strong>.</p>
        <div class="callout"><p>💡 Neuroplastyczność = zdolność mózgu do tworzenia nowych połączeń nerwowych przez całe życie.</p></div>
        <h2>Jak to działa?</h2>
        <p>Kiedy uczysz się czegoś nowego, neurony tworzą nowe synapsy. Im częściej powtarzasz, tym <strong>silniejsze i szybsze</strong> staje się połączenie.</p>
        <ul>
          <li>Nowe umiejętności tworzą nowe ścieżki neuronowe</li>
          <li>Brak ćwiczeń osłabia połączenia (use it or lose it)</li>
          <li>Sen konsoliduje pamięć – ważny w nauce</li>
        </ul>
        <div class="lesson-video-wrap">
          <div class="lesson-video-placeholder">
            <span>▶️</span>
            <p>Wideo: Jak działa neuroplastyczność?</p>
          </div>
        </div>
        <h2>Praktyczne zastosowanie</h2>
        <p>Aby wykorzystać neuroplastyczność:</p>
        <ul>
          <li><strong>Powtarzaj</strong> materiał w regularnych odstępach</li>
          <li><strong>Śpij</strong> co najmniej 7–8 godzin</li>
          <li><strong>Ćwicz fizycznie</strong> — zwiększa BDNF (czynnik wzrostu neuronów)</li>
          <li><strong>Ucz się aktywnie</strong>, nie pasywnie</li>
        </ul>
        <div class="callout"><p>🎓 Ta aplikacja jest zaprojektowana zgodnie z zasadami neuroplastyczności — krótkie, regularne lekcje są najskuteczniejsze!</p></div>
      </div>
    `,
    quiz: [
      {
        q: 'Czym jest neuroplastyczność?',
        options: ['Zdolność mózgu do zmiany rozmiaru', 'Zdolność tworzenia nowych połączeń nerwowych', 'Choroba układu nerwowego', 'Szybkość reakcji neuronów'],
        correct: 1,
        explanation: 'Neuroplastyczność to zdolność mózgu do reorganizacji przez tworzenie nowych połączeń nerwowych w odpowiedzi na naukę i doświadczenie.'
      },
      {
        q: 'Co wzmacnia nowe ścieżki neuronowe?',
        options: ['Jednorazowe silne skupienie', 'Brak snu po nauce', 'Regularne powtarzanie', 'Unikanie stresu'],
        correct: 2,
        explanation: 'Regularne powtarzanie wzmacnia i przyspiesza połączenia synaptyczne. To podstawa skutecznej nauki.'
      }
    ]
  },
  {
    id: 'productivity-pomodoro',
    title: 'Technika Pomodoro',
    category: 'Produktywność',
    emoji: '🍅',
    color: '#ef4444',
    duration: '5 min',
    difficulty: 'Łatwy',
    tags: ['Czas', 'Skupienie'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">🍅</span>
        <h1>Technika Pomodoro</h1>
        <p class="lesson-hero-meta">⚡ Produktywność · ⏱ 5 min · 🟢 Łatwy</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">Czas</span>
          <span class="lesson-hero-tag">Skupienie</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>Czym jest Pomodoro?</h2>
        <p>Technika Pomodoro to metoda zarządzania czasem opracowana przez Francesco Cirillo w końcu lat 80. Nazwa pochodzi od minutnika kuchennego w kształcie pomidora.</p>
        <h2>Jak działa?</h2>
        <ul>
          <li>⏱ Pracuj przez <strong>25 minut</strong> bez przerwy</li>
          <li>☕ Rób <strong>5-minutową przerwę</strong></li>
          <li>🔄 Powtarzaj cykl <strong>4 razy</strong></li>
          <li>🛋️ Po 4 cyklach — długa przerwa <strong>15–30 minut</strong></li>
        </ul>
        <div class="callout"><p>💡 1 cykl 25 min = 1 "pomodoro". Zliczaj je, aby mierzyć produktywność.</p></div>
        <h2>Dlaczego działa?</h2>
        <p>Technika działa z kilku powodów:</p>
        <ul>
          <li><strong>Efekt Zeigarnika</strong> — nasz mózg pamięta niedokończone zadania</li>
          <li>Krótkie sesje zmniejszają odwlekanie (prokrastynację)</li>
          <li>Regularne przerwy poprawiają skupienie i zapobiegają wypaleniu</li>
        </ul>
        <div class="lesson-video-wrap">
          <div class="lesson-video-placeholder">
            <span>▶️</span>
            <p>Wideo: Pomodoro w praktyce</p>
          </div>
        </div>
        <div class="callout"><p>🎓 Badania pokazują, że technika Pomodoro może zwiększyć produktywność nawet o 25%.</p></div>
      </div>
    `,
    quiz: [
      {
        q: 'Ile minut trwa standardowa sesja Pomodoro?',
        options: ['15 minut', '20 minut', '25 minut', '30 minut'],
        correct: 2,
        explanation: 'Standardowa sesja Pomodoro trwa 25 minut skupionej pracy, po której następuje 5-minutowa przerwa.'
      },
      {
        q: 'Co robisz po 4 cyklach Pomodoro?',
        options: ['Zaczynasz od nowa bez przerwy', 'Robisz długą przerwę 15–30 min', 'Kończysz pracę na dzień', 'Pracujesz 50 minut bez przerwy'],
        correct: 1,
        explanation: 'Po czterech cyklach pomodoro (4x 25 min + 4x 5 min przerwy) należy zrobić dłuższą przerwę trwającą 15–30 minut, aby zregenerować koncentrację.'
      }
    ]
  },
  {
    id: 'finance-compound',
    title: 'Procent składany',
    category: 'Finanse',
    emoji: '💰',
    color: '#10b981',
    duration: '5 min',
    difficulty: 'Średni',
    tags: ['Inwestycje', 'Matematyka'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">💰</span>
        <h1>Procent składany</h1>
        <p class="lesson-hero-meta">💰 Finanse · ⏱ 5 min · 🟡 Średni</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">Inwestycje</span>
          <span class="lesson-hero-tag">Matematyka</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>Ósmy cud świata</h2>
        <p>Albert Einstein podobno nazwał procent składany <strong>„ósmym cudem świata"</strong>. To matematyczna magia wzrostu wykładniczego.</p>
        <div class="callout"><p>💡 Procent składany = odsetki naliczane od kapitału + wcześniej naliczonych odsetek.</p></div>
        <h2>Wzór</h2>
        <pre style="background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:14px;font-size:.82rem;overflow-x:auto;margin-bottom:14px"><code>A = P × (1 + r/n)^(n×t)

A = końcowa kwota
P = kapitał początkowy
r = roczna stopa procentowa
n = liczba kapitalizacji/rok
t = czas w latach</code></pre>
        <h2>Przykład – reguła 72</h2>
        <p>Podziel <strong>72 przez stopę procentową</strong>, aby dowiedzieć się, po ilu latach podwoi się kapitał:</p>
        <ul>
          <li>Stopa 6% → 72/6 = <strong>12 lat</strong></li>
          <li>Stopa 8% → 72/8 = <strong>9 lat</strong></li>
          <li>Stopa 12% → 72/12 = <strong>6 lat</strong></li>
        </ul>
        <div class="callout"><p>🎓 1000 zł przy 8% przez 30 lat = <strong>10 063 zł</strong>. Bez reinwestycji tylko 3400 zł!</p></div>
        <h2>Kluczowe wnioski</h2>
        <ul>
          <li><strong>Czas</strong> jest ważniejszy niż kwota</li>
          <li>Zacznij inwestować jak najwcześniej</li>
          <li>Reinwestuj odsetki — nie wydawaj ich</li>
        </ul>
      </div>
    `,
    quiz: [
      {
        q: 'Czym różni się procent składany od prostego?',
        options: ['Prostszy w obliczeniu', 'Naliczany od kapitału + poprzednich odsetek', 'Wypłacany co miesiąc', 'Niższy od prostego'],
        correct: 1,
        explanation: 'W procencie składanym odsetki są doliczone do kapitału i też generują odsetki w kolejnym okresie – efekt kuli śniegowej.'
      },
      {
        q: 'Reguła 72 mówi, że przy 9% rocznie kapitał podwoi się po:',
        options: ['9 latach', '8 latach', '10 latach', '12 latach'],
        correct: 1,
        explanation: '72 / 9 = 8. Przy rocznej stopie 9% kapitał podwaja się w przybliżeniu co 8 lat.'
      }
    ]
  },
  {
    id: 'mindfulness-basics',
    title: 'Mindfulness – Pierwsze kroki',
    category: 'Psychologia',
    emoji: '🧘',
    color: '#06b6d4',
    duration: '5 min',
    difficulty: 'Łatwy',
    tags: ['Uważność', 'Stres'],
    content: `
      <div class="lesson-hero">
        <span class="lesson-hero-emoji">🧘</span>
        <h1>Mindfulness – Pierwsze kroki</h1>
        <p class="lesson-hero-meta">🧠 Psychologia · ⏱ 5 min · 🟢 Łatwy</p>
        <div class="lesson-hero-tags">
          <span class="lesson-hero-tag">Uważność</span>
          <span class="lesson-hero-tag">Stres</span>
        </div>
      </div>
      <div class="lesson-body">
        <h2>Czym jest mindfulness?</h2>
        <p><strong>Mindfulness</strong> (uważność) to celowe skupienie uwagi na chwili obecnej, bez oceniania. To stan pełnej świadomości tego, co dzieje się tu i teraz.</p>
        <div class="callout"><p>💡 Nie chodzi o „wyłączenie" myśli, ale o obserwowanie ich bez przywiązania.</p></div>
        <h2>Korzyści potwierdzone naukowo</h2>
        <ul>
          <li>Redukcja poziomu kortyzolu (hormonu stresu)</li>
          <li>Poprawa koncentracji i pamięci roboczej</li>
          <li>Zmniejszenie objawów depresji i lęku</li>
          <li>Lepsza jakość snu</li>
        </ul>
        <h2>Ćwiczenie 4-7-8</h2>
        <p>Prosta technika oddechowa redukująca stres:</p>
        <ul>
          <li>Wdychaj przez <strong>4 sekundy</strong></li>
          <li>Zatrzymaj oddech przez <strong>7 sekund</strong></li>
          <li>Wydychaj przez <strong>8 sekund</strong></li>
        </ul>
        <div class="callout"><p>🎓 Już 10 minut medytacji dziennie przez 8 tygodni zmienia strukturę mózgu (MBSR).</p></div>
        <h2>Zacznij od body scan</h2>
        <p>Połóż się, zamknij oczy i powoli przenoś uwagę od stóp do głowy, notując każde odczucie ciała.</p>
      </div>
    `,
    quiz: [
      {
        q: 'Czym jest mindfulness?',
        options: ['Techniką szybkiego zasypiania', 'Celowym skupieniem uwagi na chwili obecnej', 'Rodzajem jogi', 'Metodą zarządzania czasem'],
        correct: 1,
        explanation: 'Mindfulness to świadome, celowe skupienie uwagi na chwili obecnej – bez oceniania tego, co się dzieje w myślach i ciele.'
      },
      {
        q: 'Jaką rolę pełni kortyzol?',
        options: ['Hormon wzrostu', 'Hormon stresu', 'Hormon snu', 'Hormon szczęścia'],
        correct: 1,
        explanation: 'Kortyzol to hormon stresu wydzielany przez nadnercza. Chroniczne wysoki poziom kortyzolu negatywnie wpływa na zdrowie.'
      }
    ]
  }
];

const CATEGORIES = [
  { name: 'Programowanie', emoji: '💻', color: '#f59e0b' },
  { name: 'Web Design', emoji: '🎨', color: '#8b5cf6' },
  { name: 'Nauka', emoji: '🔬', color: '#ec4899' },
  { name: 'Produktywność', emoji: '⚡', color: '#ef4444' },
  { name: 'Finanse', emoji: '💰', color: '#10b981' },
  { name: 'Psychologia', emoji: '🧠', color: '#06b6d4' }
];

const MOCK_RANKING = [
  { name: 'Aleksandra W.', avatar: '👩‍💻', points: 1240 },
  { name: 'Tomasz K.', avatar: '🧑‍🎓', points: 1180 },
  { name: 'Marta N.', avatar: '👩‍🔬', points: 1050 },
  { name: 'Piotr R.', avatar: '🧑‍💼', points: 920 },
  { name: 'Karolina M.', avatar: '👩‍🎨', points: 870 }
];

const ACHIEVEMENTS = [
  { id: 'first', icon: '🎯', name: 'Pierwsza lekcja', condition: s => s.completedLessons >= 1 },
  { id: 'streak3', icon: '🔥', name: '3-dniowy streak', condition: s => s.streak >= 3 },
  { id: 'five', icon: '🏅', name: '5 lekcji', condition: s => s.completedLessons >= 5 },
  { id: 'quiz100', icon: '💯', name: 'Perfekcyjny quiz', condition: s => s.perfectQuizzes >= 1 },
  { id: 'allcat', icon: '🌟', name: 'Wszystkie kategorie', condition: s => s.categories >= 6 },
  { id: 'week', icon: '📅', name: 'Tydzień streak', condition: s => s.streak >= 7 },
  { id: 'scholar', icon: '🎓', name: 'Uczony', condition: s => s.completedLessons >= LESSONS_DATA.length },
  { id: 'earlybird', icon: '🌅', name: 'Ranny ptaszek', condition: s => s.earlyBird }
];

// ===================== STATE =====================

let state = {
  completedLessons: [],
  streak: 0,
  lastLearned: null,
  points: 0,
  perfectQuizzes: 0,
  categories: 0,
  earlyBird: false,
  darkMode: true,
  notificationsEnabled: false,
  joinedDate: new Date().toISOString()
};

let currentLesson = null;
let currentQuizIndex = 0;
let quizAnswers = [];
let lessonTimerInterval = null;
let lessonSeconds = 300;

// ===================== STORAGE =====================

function saveState() {
  localStorage.setItem('microlearn_state', JSON.stringify(state));
}
function loadState() {
  const saved = localStorage.getItem('microlearn_state');
  if (saved) {
    try { state = { ...state, ...JSON.parse(saved) }; } catch(e) {}
  }
  checkStreak();
  if (new Date().getHours() < 8) state.earlyBird = true;
}
function checkStreak() {
  if (!state.lastLearned) return;
  const last = new Date(state.lastLearned);
  const today = new Date();
  const diff = Math.floor((today - last) / (1000*60*60*24));
  if (diff > 1) state.streak = 0;
}

// ===================== NAV =====================

function navigateTo(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const view = document.getElementById(`view-${viewName}`);
  if (view) view.classList.add('active');
  const navItem = document.querySelector(`[data-view="${viewName}"]`);
  if (navItem) navItem.classList.add('active');
  if (lessonTimerInterval && viewName !== 'lesson-detail') {
    clearInterval(lessonTimerInterval);
    lessonTimerInterval = null;
  }
}

// ===================== DASHBOARD =====================

function renderDashboard() {
  const hour = new Date().getHours();
  const greetings = ['Dobranoc! 🌙', 'Dobry wieczór! 🌆', 'Dzień dobry! 👋', 'Cześć! ☀️', 'Dobry wieczór! 🌆'];
  const gi = hour < 6 ? 0 : hour < 12 ? 2 : hour < 18 ? 3 : 4;
  document.getElementById('heroGreeting').textContent = greetings[gi];

  const total = LESSONS_DATA.length;
  const done = state.completedLessons.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  document.getElementById('statCompleted').textContent = done;
  document.getElementById('statStreak').textContent = state.streak + '🔥';
  document.getElementById('statPercent').textContent = pct + '%';
  document.getElementById('streakCount').textContent = state.streak;
  document.getElementById('progressPct').textContent = pct + '%';
  document.getElementById('progressDesc').textContent = done === 0
    ? 'Zacznij pierwszą lekcję, aby zobaczyć postęp!'
    : `Ukończyłeś ${done} z ${total} lekcji. ${done === total ? '🎉 Wszystkie lekcje zaliczone!' : 'Tak trzymaj!'}`;
  document.getElementById('pStatLessons').textContent = done;
  document.getElementById('pStatStreak').textContent = state.streak;
  document.getElementById('pStatPoints').textContent = state.points;

  // Ring
  const circumference = 2 * Math.PI * 50;
  const offset = circumference - (pct / 100) * circumference;
  document.getElementById('ringFill').style.strokeDashoffset = offset;

  // Daily lesson
  const todayIndex = new Date().getDay();
  const daily = LESSONS_DATA[todayIndex % LESSONS_DATA.length];
  document.getElementById('dailyTitle').textContent = daily.title;
  document.getElementById('dailyMeta').textContent = `${daily.emoji} ${daily.category} · ${daily.duration} · ${daily.difficulty}`;
  document.getElementById('startDailyBtn').onclick = () => openLesson(daily.id);

  // Week calendar
  renderWeekCalendar();
  // Categories
  renderCategoriesGrid();
}

function renderWeekCalendar() {
  const days = ['Nd', 'Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'So'];
  const today = new Date().getDay();
  const el = document.getElementById('weekCalendar');
  el.innerHTML = '';
  for (let i = 0; i < 7; i++) {
    const d = document.createElement('div');
    const date = new Date(); date.setDate(date.getDate() - today + i);
    const dateStr = date.toDateString();
    const isDone = state.completedLessons.some(l => new Date(l.date).toDateString() === dateStr);
    const isToday = i === today;
    d.className = `week-day${isDone ? ' done' : ''}${isToday ? ' today' : ''}`;
    d.innerHTML = `<span class="week-day-name">${days[i]}</span><div class="week-day-dot"></div><span class="week-day-num">${date.getDate()}</span>`;
    el.appendChild(d);
  }
}

function renderCategoriesGrid() {
  const el = document.getElementById('categoriesGrid');
  el.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const lessons = LESSONS_DATA.filter(l => l.category === cat.name);
    const done = lessons.filter(l => state.completedLessons.some(c => c.id === l.id)).length;
    const pct = lessons.length ? (done / lessons.length) * 100 : 0;
    const d = document.createElement('div');
    d.className = 'category-card';
    d.innerHTML = `
      <span class="category-emoji">${cat.emoji}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-count">${done}/${lessons.length} lekcji</div>
      <div class="category-bar"><div class="category-bar-fill" style="width:${pct}%;background:${cat.color}"></div></div>
    `;
    d.onclick = () => { navigateTo('lessons'); filterLessons(cat.name); };
    el.appendChild(d);
  });
}

// ===================== LESSONS LIST =====================

let currentFilter = 'Wszystkie';

function renderLessons() {
  const tabs = document.getElementById('filterTabs');
  tabs.innerHTML = '';
  const filters = ['Wszystkie', ...CATEGORIES.map(c => c.name)];
  filters.forEach(f => {
    const btn = document.createElement('button');
    btn.className = `filter-tab${f === currentFilter ? ' active' : ''}`;
    btn.textContent = f;
    btn.onclick = () => filterLessons(f);
    tabs.appendChild(btn);
  });
  renderLessonsList();
}

function filterLessons(filter) {
  currentFilter = filter;
  renderLessons();
}

function renderLessonsList() {
  const el = document.getElementById('lessonsList');
  el.innerHTML = '';
  const filtered = currentFilter === 'Wszystkie'
    ? LESSONS_DATA
    : LESSONS_DATA.filter(l => l.category === currentFilter);
  filtered.forEach(lesson => {
    const done = state.completedLessons.some(c => c.id === lesson.id);
    const d = document.createElement('div');
    d.className = `lesson-card${done ? ' completed' : ''}`;
    d.innerHTML = `
      <div class="lesson-icon" style="background:${lesson.color}22;border:1px solid ${lesson.color}44">${lesson.emoji}</div>
      <div class="lesson-info">
        <div class="lesson-title">${lesson.title}</div>
        <div class="lesson-category">${lesson.category}</div>
        <div class="lesson-meta">
          ${lesson.tags.map(t => `<span class="lesson-tag">${t}</span>`).join('')}
          <span class="lesson-tag">⏱ ${lesson.duration}</span>
        </div>
      </div>
      <div class="lesson-check">${done ? '✅' : '→'}</div>
    `;
    d.onclick = () => openLesson(lesson.id);
    el.appendChild(d);
  });
}

// ===================== LESSON DETAIL =====================

function openLesson(id) {
  currentLesson = LESSONS_DATA.find(l => l.id === id);
  if (!currentLesson) return;
  navigateTo('lesson-detail');
  document.getElementById('lessonContent').innerHTML = currentLesson.content + `<button class="lesson-start-quiz" id="quizStartBtn">🎯 Rozpocznij Quiz</button>`;
  document.getElementById('quizStartBtn').onclick = startQuiz;
  document.getElementById('lessonProgressFill').style.width = '0%';
  startLessonTimer();
}

function startLessonTimer() {
  if (lessonTimerInterval) clearInterval(lessonTimerInterval);
  lessonSeconds = 300;
  updateTimerDisplay();
  lessonTimerInterval = setInterval(() => {
    lessonSeconds--;
    if (lessonSeconds <= 0) { lessonSeconds = 0; clearInterval(lessonTimerInterval); }
    updateTimerDisplay();
    const pct = ((300 - lessonSeconds) / 300) * 100;
    document.getElementById('lessonProgressFill').style.width = pct + '%';
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(lessonSeconds / 60);
  const s = lessonSeconds % 60;
  document.getElementById('lessonTimer').textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

// ===================== QUIZ =====================

function startQuiz() {
  if (!currentLesson) return;
  clearInterval(lessonTimerInterval);
  currentQuizIndex = 0;
  quizAnswers = [];
  navigateTo('quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = currentLesson.quiz[currentQuizIndex];
  const total = currentLesson.quiz.length;
  document.getElementById('quizQNum').textContent = `${currentQuizIndex + 1}/${total}`;
  const el = document.getElementById('quizContent');
  el.innerHTML = `
    <div class="quiz-question-card">
      <div class="quiz-q-num">Pytanie ${currentQuizIndex + 1} z ${total}</div>
      <div class="quiz-q-text">${q.q}</div>
      <div class="quiz-options" id="quizOptions">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-idx="${i}">
            <span class="quiz-opt-letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.onclick = () => selectAnswer(parseInt(btn.dataset.idx));
  });
}

function selectAnswer(idx) {
  const q = currentLesson.quiz[currentQuizIndex];
  const isCorrect = idx === q.correct;
  quizAnswers.push({ q: q.q, selected: idx, correct: q.correct, isCorrect });

  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.correct) btn.classList.add('correct');
    if (i === idx && !isCorrect) btn.classList.add('wrong');
  });

  const feedback = document.createElement('div');
  feedback.className = `quiz-feedback ${isCorrect ? 'correct' : 'wrong'}`;
  feedback.innerHTML = `
    <span class="quiz-feedback-icon">${isCorrect ? '✅' : '❌'}</span>
    <strong>${isCorrect ? 'Dobrze!' : 'Nie tym razem!'}</strong>
    <p>${q.explanation}</p>
  `;
  document.getElementById('quizContent').appendChild(feedback);

  const nextBtn = document.createElement('button');
  nextBtn.className = 'quiz-next-btn';
  const isLast = currentQuizIndex === currentLesson.quiz.length - 1;
  nextBtn.textContent = isLast ? '🏁 Zobacz wyniki' : 'Następne pytanie →';
  nextBtn.onclick = isLast ? showResult : nextQuestion;
  document.getElementById('quizContent').appendChild(nextBtn);
}

function nextQuestion() {
  currentQuizIndex++;
  renderQuestion();
}

function showResult() {
  const total = currentLesson.quiz.length;
  const correct = quizAnswers.filter(a => a.isCorrect).length;
  const pct = Math.round((correct / total) * 100);
  const earned = correct * 10;

  // Save progress
  const alreadyDone = state.completedLessons.some(c => c.id === currentLesson.id);
  if (!alreadyDone) {
    state.completedLessons.push({ id: currentLesson.id, date: new Date().toISOString() });
    state.points += earned + 20;
    const today = new Date().toDateString();
    const lastDate = state.lastLearned ? new Date(state.lastLearned).toDateString() : null;
    if (lastDate !== today) {
      const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
      if (lastDate === yesterday.toDateString()) state.streak++;
      else if (!lastDate) state.streak = 1;
      else state.streak = 1;
    }
    state.lastLearned = new Date().toISOString();
    const catsDone = new Set(state.completedLessons.map(c => LESSONS_DATA.find(l => l.id === c.id)?.category).filter(Boolean));
    state.categories = catsDone.size;
    if (pct === 100) state.perfectQuizzes++;
    saveState();
  }

  const emojis = pct === 100 ? '🎉' : pct >= 66 ? '😊' : pct >= 33 ? '🤔' : '💪';
  const msgs = pct === 100 ? ['Perfekcyjnie!', 'Masz pełną wiedzę z tej lekcji!'] :
               pct >= 66 ? ['Świetna robota!', 'Masz solidne podstawy!'] :
               pct >= 33 ? ['Nieźle!', 'Warto powtórzyć materiał.'] :
               ['Nie poddawaj się!', 'Przeczytaj lekcję jeszcze raz.'];

  navigateTo('quiz-result');
  document.getElementById('quizResultContent').innerHTML = `
    <div class="result-card">
      <span class="result-emoji">${emojis}</span>
      <div class="result-score">${correct}/${total}</div>
      <div class="result-score-label">poprawnych odpowiedzi (${pct}%)</div>
      <div class="result-message">${msgs[0]}</div>
      <p class="result-sub">${msgs[1]}</p>
      <div class="result-points">
        <span class="result-points-icon">⭐</span>
        +${earned + (alreadyDone ? 0 : 20)} punktów zdobytych
      </div>
      <div class="result-answers">
        ${quizAnswers.map(a => `
          <div class="result-answer-item">
            <span class="result-ans-icon">${a.isCorrect ? '✅' : '❌'}</span>
            <div>
              <div class="result-ans-q">${a.q}</div>
              <div class="result-ans-a">Twoja: ${currentLesson.quiz[quizAnswers.indexOf(a)].options[a.selected]}</div>
            </div>
          </div>
        `).join('')}
      </div>
      <div class="result-btns">
        <button class="btn-primary" style="background:var(--accent)" id="resultHome">🏠 Wróć do dashboard</button>
        <button class="btn-secondary" id="resultLessons">📚 Więcej lekcji</button>
      </div>
    </div>
  `;
  document.getElementById('resultHome').onclick = () => { navigateTo('dashboard'); renderDashboard(); };
  document.getElementById('resultLessons').onclick = () => { navigateTo('lessons'); renderLessons(); };
  renderAchievements();
}

// ===================== RANKING =====================

function renderRanking() {
  const myPoints = state.points;
  const allPlayers = [...MOCK_RANKING, { name: 'Ty 👤', avatar: '⭐', points: myPoints, isMe: true }]
    .sort((a, b) => b.points - a.points);
  const myRank = allPlayers.findIndex(p => p.isMe) + 1;

  const el = document.getElementById('rankingList');
  el.innerHTML = '';
  allPlayers.forEach((player, i) => {
    const d = document.createElement('div');
    const medals = ['🥇','🥈','🥉'];
    d.className = `rank-item${i < 3 ? ' top'+(i+1) : ''}${player.isMe ? ' active' : ''}`;
    if (player.isMe) d.style.borderColor = 'var(--accent)';
    d.innerHTML = `
      <span class="rank-pos">${i < 3 ? medals[i] : '#'+(i+1)}</span>
      <span class="rank-avatar">${player.avatar}</span>
      <span class="rank-name">${player.name}${player.isMe ? ' (Ty)' : ''}</span>
      <span class="rank-points">${player.points} pkt</span>
    `;
    el.appendChild(d);
  });

  document.getElementById('yourRankCard').innerHTML = `
    <div class="your-rank-label">Twoja pozycja</div>
    <div class="your-rank-pos">#${myRank}</div>
    <div style="color:var(--text2);font-size:.8rem">z ${allPlayers.length} graczy · ${myPoints} punktów</div>
  `;
}

// ===================== PROFILE & ACHIEVEMENTS =====================

function renderProfile() {
  const joined = new Date(state.joinedDate);
  const days = Math.floor((new Date() - joined) / (1000*60*60*24));
  document.getElementById('profileJoined').textContent = `Dołączył/a ${days === 0 ? 'dzisiaj' : days+' dni temu'}`;
  document.getElementById('pStatLessons').textContent = state.completedLessons.length;
  document.getElementById('pStatStreak').textContent = state.streak;
  document.getElementById('pStatPoints').textContent = state.points;
  renderAchievements();
  const dm = document.getElementById('darkModeToggle');
  dm.className = `toggle${state.darkMode ? ' on' : ''}`;
  const nt = document.getElementById('notifsToggle');
  nt.className = `toggle${state.notificationsEnabled ? ' on' : ''}`;
}

function renderAchievements() {
  const el = document.getElementById('achievementsGrid');
  if (!el) return;
  el.innerHTML = '';
  ACHIEVEMENTS.forEach(a => {
    const unlocked = a.condition(state);
    const d = document.createElement('div');
    d.className = `achievement${unlocked ? ' unlocked' : ''}`;
    d.innerHTML = `<span class="achievement-icon">${a.icon}</span><span class="achievement-name">${a.name}</span>`;
    d.title = unlocked ? 'Odblokowano!' : 'Zablokowane';
    el.appendChild(d);
  });
}

// ===================== THEME =====================

function setTheme(dark) {
  state.darkMode = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  document.getElementById('themeToggle').textContent = dark ? '☀️' : '🌙';
  const dm = document.getElementById('darkModeToggle');
  if (dm) dm.className = `toggle${dark ? ' on' : ''}`;
  document.getElementById('theme-meta').content = dark ? '#0f0f1a' : '#f5f5ff';
  saveState();
}

// ===================== NOTIFICATIONS =====================

async function requestNotifications() {
  if (!('Notification' in window)) {
    alert('Twoja przeglądarka nie obsługuje powiadomień');
    return false;
  }
  if (Notification.permission === 'granted') return true;
  const perm = await Notification.requestPermission();
  return perm === 'granted';
}

function scheduleDailyReminder() {
  if (!state.notificationsEnabled || Notification.permission !== 'granted') return;
  // Show demo notification after 3s
  setTimeout(() => {
    new Notification('⚡ MicroLearn', {
      body: 'Czas na dzisiejszą 5-minutową lekcję! 🎯',
      icon: 'icons/icon-192.png',
      badge: 'icons/icon-72.png'
    });
  }, 3000);
}

// ===================== INSTALL PWA =====================

let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('installBanner');
  if (!localStorage.getItem('installDismissed')) {
    banner.classList.remove('hidden');
  }
});

window.addEventListener('appinstalled', () => {
  document.getElementById('installBanner').classList.add('hidden');
  deferredPrompt = null;
});

// ===================== SERVICE WORKER =====================

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('SW registered:', reg.scope))
      .catch(err => console.log('SW error:', err));
  });
}

// ===================== INIT =====================

document.addEventListener('DOMContentLoaded', () => {
  loadState();

  // Hide splash after 2s
  setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    document.getElementById('splash').style.transition = 'opacity .5s';
    setTimeout(() => {
      document.getElementById('splash').classList.add('hidden');
      document.getElementById('app').classList.remove('hidden');
      setTheme(state.darkMode);
      renderDashboard();
      renderLessons();
      renderRanking();
      renderProfile();
      if (state.notificationsEnabled) scheduleDailyReminder();
    }, 500);
  }, 2000);

  // Navigation
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.onclick = () => {
      const view = btn.dataset.view;
      navigateTo(view);
      if (view === 'dashboard') renderDashboard();
      if (view === 'lessons') renderLessons();
      if (view === 'ranking') renderRanking();
      if (view === 'profile') renderProfile();
    };
  });

  // Theme toggle
  document.getElementById('themeToggle').onclick = () => setTheme(!state.darkMode);

  // Back buttons
  document.getElementById('backFromLesson').onclick = () => {
    clearInterval(lessonTimerInterval);
    navigateTo('lessons');
    renderLessons();
  };
  document.getElementById('backFromQuiz').onclick = () => {
    if (confirm('Opuścić quiz?')) navigateTo('lesson-detail');
  };

  // Notifications button
  document.getElementById('notifBtn').onclick = async () => {
    const granted = await requestNotifications();
    if (granted) {
      state.notificationsEnabled = true;
      saveState();
      scheduleDailyReminder();
    }
  };

  // Profile settings
  document.getElementById('darkModeToggle').onclick = () => setTheme(!state.darkMode);
  document.getElementById('notifsToggle').onclick = async () => {
    if (!state.notificationsEnabled) {
      const granted = await requestNotifications();
      if (granted) { state.notificationsEnabled = true; saveState(); }
    } else {
      state.notificationsEnabled = false; saveState();
    }
    renderProfile();
  };
  document.getElementById('resetBtn').onclick = () => {
    if (confirm('Czy na pewno chcesz zresetować cały postęp?')) {
      state.completedLessons = [];
      state.streak = 0;
      state.points = 0;
      state.perfectQuizzes = 0;
      state.categories = 0;
      state.lastLearned = null;
      saveState();
      renderDashboard();
      renderProfile();
      renderRanking();
      alert('Postęp zresetowany.');
    }
  };

  // Install banner
  document.getElementById('installAccept').onclick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') document.getElementById('installBanner').classList.add('hidden');
      deferredPrompt = null;
    }
  };
  document.getElementById('installDismiss').onclick = () => {
    document.getElementById('installBanner').classList.add('hidden');
    localStorage.setItem('installDismissed', '1');
  };
});
