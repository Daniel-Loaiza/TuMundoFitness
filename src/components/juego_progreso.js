export default {
  name: 'JuegoProgreso',
  template: `
    <section class="w-full rounded-3xl border border-slate-800 bg-slate-950 p-4 text-white shadow-2xl">
      <div class="flex flex-col gap-4">
        <header class="space-y-1 text-center sm:text-left">
          <p class="text-xs uppercase tracking-[0.35em] text-emerald-200">Simulador de progreso</p>
          <h3 class="text-xl font-black text-cyan-200">Pixel Hurdles 🏃‍♂️</h3>
          <p class="text-sm text-slate-200">Presiona ESPACIO o haz clic en el juego para saltar las vallas.</p>
        </header>

        <div class="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-800 bg-slate-900/95 p-3 text-sm font-semibold shadow-inner">
          <div>Puntos: <span class="text-emerald-200">{{ score }}</span></div>
          <div>Record: <span class="text-amber-200">{{ highScore }}</span></div>
        </div>

        <div class="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-inner">
          <canvas
            ref="canvas"
            class="block w-full"
            :style="{ height: canvasHeight + 'px' }"
          ></canvas>

          <div
            v-if="!gameActive"
            class="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-3xl bg-slate-950/85 p-6 text-center"
          >
            <h4 class="mb-3 text-xl font-black text-cyan-100">{{ menuTitle }}</h4>
            <button
              type="button"
              class="rounded-xl bg-blue-500 px-5 py-3 text-base font-black text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
              @click="startGame"
            >
              {{ menuButtonLabel }}
            </button>
          </div>
        </div>

        <p class="text-center text-xs text-slate-300">Presiona <b>ESPACIO</b>, haz clic en el juego o toca la pantalla para saltar.</p>
      </div>
    </section>
  `,
  data() {
    return {
      score: 0,
      highScore: Number(localStorage.getItem('runner_highscore') || 0),
      gameActive: false,
      menuTitle: '¿Listo para correr?',
      menuButtonLabel: 'EMPEZAR',
      canvasHeight: 220,
      canvasWidth: 600,
      animationFrameId: null,
      gameSpeed: 5,
      frameCount: 0,
      player: {
        x: 50,
        y: 110,
        width: 25,
        height: 40,
        velocityY: 0,
        gravity: 0.6,
        jumpForce: -11,
        isJumping: false
      },
      hurdles: [],
      ctx: null,
      canvas: null,
      resizeObserver: null
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resizeCanvas());
      this.resizeObserver.observe(this.$el);
    }

    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('keydown', this.handleKeyDown);
    this.canvas.addEventListener('click', this.jump);
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    window.removeEventListener('resize', this.resizeCanvas);
    window.removeEventListener('keydown', this.handleKeyDown);
    if (this.canvas) {
      this.canvas.removeEventListener('click', this.jump);
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  },
  methods: {
    resizeCanvas() {
      if (!this.canvas) return;

      const rect = this.$el.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(180, Math.min(260, Math.floor(rect.width * 0.42)));

      this.canvasWidth = width;
      this.canvasHeight = height;
      this.canvas.width = width;
      this.canvas.height = height;
      this.ctx = this.canvas.getContext('2d');

      this.player.y = height - 90;
      this.player.x = Math.max(30, width * 0.08);
    },
    startGame() {
      this.score = 0;
      this.gameSpeed = 5;
      this.frameCount = 0;
      this.hurdles = [];
      this.player.y = this.canvasHeight - 90;
      this.player.velocityY = 0;
      this.player.isJumping = false;

      this.menuTitle = '¡A correr!';
      this.menuButtonLabel = 'Reiniciar';
      this.gameActive = true;

      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
      }

      this.update();
    },
    jump() {
      if (!this.gameActive) return;
      if (!this.player.isJumping) {
        this.player.velocityY = this.player.jumpForce;
        this.player.isJumping = true;
      }
    },
    gameOver() {
      this.gameActive = false;
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }

      if (this.score > this.highScore) {
        this.highScore = this.score;
        localStorage.setItem('runner_highscore', String(this.highScore));
        this.menuTitle = `🏆 ¡NUEVO RÉCORD!\nPuntuación: ${this.score}`;
      } else {
        this.menuTitle = `¡Fin del juego!\nPuntuación: ${this.score}`;
      }

      this.menuButtonLabel = 'EMPEZAR';
    },
    spawnHurdle() {
      const lastHurdle = this.hurdles[this.hurdles.length - 1];
      if (!lastHurdle || this.canvasWidth - lastHurdle.x > Math.random() * 200 + 180) {
        this.hurdles.push({
          x: this.canvasWidth,
          y: this.canvasHeight - 75,
          width: 15,
          height: 25,
          passed: false
        });
      }
    },
    update() {
      if (!this.gameActive) return;

      this.frameCount += 1;
      this.player.velocityY += this.player.gravity;
      this.player.y += this.player.velocityY;

      if (this.player.y >= this.canvasHeight - 90) {
        this.player.y = this.canvasHeight - 90;
        this.player.velocityY = 0;
        this.player.isJumping = false;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = '#16a34a';
      this.ctx.fillRect(0, this.canvasHeight - 60, this.canvas.width, 60);
      this.ctx.fillStyle = '#e2e8f0';
      this.ctx.fillRect(0, this.canvasHeight - 60, this.canvas.width, 4);

      this.ctx.fillStyle = '#3b82f6';
      this.ctx.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
      this.ctx.fillStyle = '#fdba74';
      this.ctx.fillRect(this.player.x + 5, this.player.y - 12, 15, 12);

      this.spawnHurdle();

      for (let i = this.hurdles.length - 1; i >= 0; i--) {
        const hurdle = this.hurdles[i];
        hurdle.x -= this.gameSpeed;

        this.ctx.fillStyle = '#ef4444';
        this.ctx.fillRect(hurdle.x, hurdle.y, hurdle.width, hurdle.height);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillRect(hurdle.x, hurdle.y + 4, hurdle.width, 5);

        if (
          this.player.x < hurdle.x + hurdle.width &&
          this.player.x + this.player.width > hurdle.x &&
          this.player.y < hurdle.y + hurdle.height &&
          this.player.y + this.player.height > hurdle.y
        ) {
          this.gameOver();
          return;
        }

        if (hurdle.x + hurdle.width < this.player.x && !hurdle.passed) {
          hurdle.passed = true;
          this.score += 1;
          if (this.score % 4 === 0) {
            this.gameSpeed += 0.6;
          }
        }

        if (hurdle.x + hurdle.width < 0) {
          this.hurdles.splice(i, 1);
        }
      }

      this.animationFrameId = requestAnimationFrame(this.update.bind(this));
    },
    handleKeyDown(event) {
      if (event.code === 'Space') {
        event.preventDefault();
        this.jump();
      }
    }
  }
};
