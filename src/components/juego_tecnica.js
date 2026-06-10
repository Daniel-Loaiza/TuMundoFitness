export default {
  name: 'JuegoTecnica',
  template: `
    <section class="relative h-[420px] min-h-[420px] max-h-[70vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 text-white shadow-2xl sm:h-[460px] lg:h-[520px]" style="font-family: 'Segoe UI', sans-serif; user-select: none;">
      <div id="crosshair" class="pointer-events-none absolute left-1/2 top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2">
        <span class="absolute left-1/2 top-1/2 block h-[2px] w-10 -translate-x-1/2 -translate-y-1/2 rounded bg-cyan-300"></span>
        <span class="absolute left-1/2 top-1/2 block h-10 w-[2px] -translate-x-1/2 -translate-y-1/2 rounded bg-cyan-300"></span>
      </div>

      <div id="hud" class="pointer-events-none absolute left-4 right-4 top-4 z-10 flex items-center justify-between text-sm font-bold text-white drop-shadow-md sm:text-base">
        <div>Objetivos: <span id="score" class="text-cyan-300">{{ score }}</span></div>
        <div id="timer" :class="['text-cyan-300', { 'text-rose-400': timeLeft <= 10 }]">Tiempo: {{ timeLeft }}s</div>
      </div>

      <div
        id="blocker"
        class="absolute inset-0 z-20 flex cursor-pointer flex-col items-center justify-center bg-slate-950/95 p-6 text-center"
        @click="startGame"
        v-show="!gameActive && !isLocked"
      >
        <h1 id="menu-title" class="mb-3 rounded-md bg-cyan-300 px-4 py-2 text-xl font-black text-slate-950">ENTRENADOR DE PUNTERÍA 3D</h1>
        <p id="menu-instruction" class="text-slate-200">Haz clic aquí para comenzar a jugar</p>
        <p class="mt-2 text-xs text-cyan-100">(Mueve el mouse para apuntar, clic para disparar, ESC para salir)</p>
      </div>

      <canvas
        id="gameCanvas"
        ref="canvas"
        class="block h-full w-full"
      ></canvas>
    </section>
  `,
  data() {
    return {
      score: 0,
      timeLeft: 60,
      gameActive: false,
      isLocked: false,
      timerInterval: null,
      camYaw: 0,
      camPitch: 0,
      mouseSensitivity: 0.003,
      target3D: { x: 0, y: 0, z: 15, radius: 1.3, hitEffect: 0 },
      canvas: null,
      ctx: null,
      isEngineRunning: false,
      resizeObserver: null,
      baseRadius: 1.3,
      shrinkSpeed: 0.005
    };
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.resizeCanvas();
      });
      this.resizeObserver.observe(this.$el);
    }

    window.addEventListener('resize', this.resizeCanvas);
    window.addEventListener('click', this.handleShoot);
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('pointerlockchange', this.handlePointerLockChange);
  },
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    window.removeEventListener('resize', this.resizeCanvas);
    window.removeEventListener('click', this.handleShoot);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('pointerlockchange', this.handlePointerLockChange);
    clearInterval(this.timerInterval);
  },
  methods: {
    resizeCanvas() {
      if (!this.canvas) return;

      const rect = this.$el.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width));
      const height = Math.max(260, Math.floor(rect.height));

      if (this.canvas.width !== width || this.canvas.height !== height) {
        this.canvas.width = width;
        this.canvas.height = height;
      }

      this.ctx = this.canvas.getContext('2d');
      if (this.ctx) {
        this.ctx.imageSmoothingEnabled = true;
      }
    },
    startGame() {
      document.body.requestPointerLock();
    },
    handlePointerLockChange() {
      if (document.pointerLockElement === document.body) {
        this.isLocked = true;
        this.blocker = false;
        if (!this.gameActive) {
          this.resetAndStartGame();
        }
      } else {
        this.isLocked = false;
        if (this.gameActive) {
          clearInterval(this.timerInterval);
        }
      }
    },
    resetAndStartGame() {
      this.score = 0;
      this.timeLeft = 60;
      this.gameActive = true;
      this.spawnTarget();
      clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        this.timeLeft -= 1;
        if (this.timeLeft <= 10) {
          this.$forceUpdate();
        }
        if (this.timeLeft <= 0) {
          this.endGame();
        }
      }, 1000);
      if (!this.isEngineRunning) {
        this.isEngineRunning = true;
        this.animate();
      }
    },
    handleMouseMove(event) {
      if (document.pointerLockElement !== document.body || !this.gameActive) return;
      this.camYaw += event.movementX * this.mouseSensitivity;
      this.camPitch -= event.movementY * this.mouseSensitivity;
      this.camPitch = Math.max(-0.6, Math.min(0.6, this.camPitch));
    },
    spawnTarget() {
      this.target3D.x = (Math.random() - 0.5) * 12;
      this.target3D.y = (Math.random() - 0.4) * 6;
      this.target3D.z = Math.random() * 5 + 12;
      this.target3D.radius = this.baseRadius;
      this.target3D.hitEffect = 0;
    },
    handleShoot() {
      if (document.pointerLockElement !== document.body || !this.gameActive) return;
      const angleX = Math.atan2(this.target3D.x, this.target3D.z);
      const angleY = Math.atan2(this.target3D.y, this.target3D.z);
      const diffX = angleX - this.camYaw;
      const diffY = angleY - this.camPitch;
      const hitRadiusRad = this.target3D.radius / this.target3D.z;
      if (Math.sqrt(diffX * diffX + diffY * diffY) < hitRadiusRad) {
        this.score += 1;
        this.target3D.hitEffect = 6;
      }
    },
    endGame() {
      this.gameActive = false;
      clearInterval(this.timerInterval);
      document.exitPointerLock();
    },
    animate() {
      requestAnimationFrame(this.animate.bind(this));

      this.ctx.fillStyle = '#0b0c10';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      if (!this.gameActive) return;

      this.target3D.y += Math.sin(Date.now() * 0.003) * 0.015;

      if (this.target3D.hitEffect === 0) {
        this.target3D.radius -= this.shrinkSpeed;
        if (this.target3D.radius <= 0.1) {
          this.spawnTarget();
        }
      }

      const fov = this.canvas.width * 0.8;
      const relativeX = Math.atan2(this.target3D.x, this.target3D.z) - this.camYaw;
      const relativeY = Math.atan2(this.target3D.y, this.target3D.z) - this.camPitch;
      const screenX = this.canvas.width / 2 + (relativeX * fov);
      const screenY = this.canvas.height / 2 - (relativeY * fov);
      const screenRadius = (this.target3D.radius / this.target3D.z) * fov;

      this.ctx.strokeStyle = '#1f2833';
      this.ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        const lineX = this.canvas.width / 2 + ((i * 2 - this.camYaw) * fov * 0.1);
        this.ctx.beginPath();
        this.ctx.moveTo(lineX, 0);
        this.ctx.lineTo(lineX, this.canvas.height);
        this.ctx.stroke();
      }

      if (screenRadius > 0) {
        this.ctx.beginPath();
        this.ctx.arc(screenX, screenY, screenRadius, 0, Math.PI * 2);

        if (this.target3D.hitEffect > 0) {
          this.ctx.fillStyle = '#66fcf1';
          this.target3D.hitEffect -= 1;
          if (this.target3D.hitEffect === 0) this.spawnTarget();
        } else if (this.target3D.radius < this.baseRadius * 0.4) {
          this.ctx.fillStyle = '#e94560';
        } else {
          this.ctx.fillStyle = '#45a29e';
        }

        this.ctx.fill();
        this.ctx.strokeStyle = '#66fcf1';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
      }
    }
  }
};
