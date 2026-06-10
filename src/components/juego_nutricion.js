export default {
  name: 'JuegoNutricion',
  template: `
    <section class="space-y-4 rounded-2xl bg-slate-900 p-4 text-white shadow-2xl">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 class="text-xl font-bold text-emerald-200">Memorama de Frutas</h3>
          <p class="text-sm text-slate-200">Encuentra las parejas de alimentos saludables.</p>
        </div>
        <div class="rounded-xl bg-white/10 px-3 py-2 text-sm font-semibold text-emerald-100">
          Movimientos: {{ moves }}
        </div>
      </div>

      <div class="grid grid-cols-5 gap-3 sm:grid-cols-6 md:grid-cols-7">
        <button
          v-for="(card, index) in cards"
          :key="index"
          type="button"
          class="card h-16 rounded-xl border border-white/10 bg-slate-800 text-2xl shadow transition hover:-translate-y-0.5 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          :class="{
            'bg-blue-600': !card.flipped && !card.matched,
            'bg-white text-slate-900': card.flipped || card.matched,
            'opacity-70 cursor-default': card.matched
          }"
          :disabled="card.matched || lockBoard || card.flipped"
          @click="flipCard(index)"
        >
          {{ card.flipped || card.matched ? card.value : '?' }}
        </button>
      </div>

      <div class="flex items-center justify-between gap-3">
        <p class="text-xs text-slate-300">Encuentra todas las parejas para ganar.</p>
        <button
          type="button"
          class="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-400"
          @click="resetGame"
        >
          Reiniciar juego
        </button>
      </div>
    </section>
  `,
  data() {
    return {
      fruits: [
        '🍎', '🍏', '🍐', '🍑', '🍒', '🍓', '🍇', '🍉', '🍈',
        '🍊', '🍋', '🍋‍🟩', '🍌', '🍍', '🥭', '🥝', '🥥', '🪾', '🍅'
      ],
      cards: [],
      flippedIndexes: [],
      lockBoard: false,
      moves: 0,
      matchedPairs: 0
    };
  },
  mounted() {
    this.createBoard();
  },
  methods: {
    shuffle(array) {
      const copy = [...array];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
    createBoard() {
      const deck = [...this.fruits, ...this.fruits];
      this.cards = this.shuffle(deck).map((value) => ({
        value,
        flipped: false,
        matched: false
      }));
      this.flippedIndexes = [];
      this.lockBoard = false;
      this.moves = 0;
      this.matchedPairs = 0;
    },
    flipCard(index) {
      const card = this.cards[index];
      if (this.lockBoard || card.flipped || card.matched || this.flippedIndexes.length === 2) {
        return;
      }

      card.flipped = true;
      this.flippedIndexes.push(index);

      if (this.flippedIndexes.length === 2) {
        this.moves += 1;
        this.checkForMatch();
      }
    },
    checkForMatch() {
      const [firstIndex, secondIndex] = this.flippedIndexes;
      const firstCard = this.cards[firstIndex];
      const secondCard = this.cards[secondIndex];

      if (firstCard.value === secondCard.value) {
        firstCard.matched = true;
        secondCard.matched = true;
        this.matchedPairs += 1;
        this.flippedIndexes = [];
        this.lockBoard = false;

        if (this.matchedPairs === this.fruits.length) {
          setTimeout(() => {
            alert(`¡Felicidades! Ganaste el juego en ${this.moves} movimientos.`);
          }, 300);
        }
      } else {
        this.lockBoard = true;
        setTimeout(() => {
          firstCard.flipped = false;
          secondCard.flipped = false;
          this.flippedIndexes = [];
          this.lockBoard = false;
        }, 900);
      }
    },
    resetGame() {
      this.createBoard();
    }
  }
};
