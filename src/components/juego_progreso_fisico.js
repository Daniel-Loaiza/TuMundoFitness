/* Juego de Progreso Físico - Button Mashing Challenge */

export default {
    template: `
        <div class="game-container p-4 md:p-8 text-white bg-slate-900 rounded-2xl shadow-inner">
            <div class="text-center mb-6">
                <h2 class="text-2xl font-black text-rose-500 uppercase tracking-tighter">¡Machaca la Barra Espaciadora!</h2>
                <p class="text-slate-400 text-sm">Presiona ESPACIO o haz clic abajo rápidamente</p>
            </div>

            <div class="flex flex-col md:flex-row gap-8 items-start justify-center">
                <div class="flex-1 w-full flex flex-col items-center">
                    <div class="flex gap-4 w-full mb-6">
                        <div class="flex-1 bg-slate-800 border-2 border-slate-700 p-3 text-center rounded-xl">
                            <p class="text-xs text-slate-400 uppercase">Tiempo</p>
                            <span class="text-2xl font-mono font-bold">{{ timeLeft }}s</span>
                        </div>
                        <div class="flex-1 bg-slate-800 border-2 border-slate-700 p-3 text-center rounded-xl">
                            <p class="text-xs text-slate-400 uppercase">Pulsaciones</p>
                            <span class="text-2xl font-mono font-bold">{{ score }}</span>
                        </div>
                    </div>

                    <div class="h-48 w-full flex items-center justify-center mb-8 bg-slate-950/40 rounded-xl border border-slate-800/50">
                        <div class="vue-balloon" :style="balloonStyles"></div>
                    </div>

                    <button 
                        @click="handleAction"
                        :disabled="isButtonDisabled"
                        class="w-full max-w-xs py-4 px-8 rounded-xl font-black text-xl transition-all duration-75 active:scale-95 shadow-lg"
                        :class="gameActive ? 'bg-rose-600 hover:bg-rose-500 animate-pulse' : 'bg-emerald-600 hover:bg-emerald-500'"
                    >
                        {{ btnText }}
                    </button>
                </div>

                <div class="w-full md:w-64 bg-slate-800/50 border-2 border-slate-700 rounded-xl p-4">
                    <h3 class="text-emerald-400 font-bold border-b border-slate-700 pb-2 mb-4 text-center">🏆 TOP 5 RÉCORDS</h3>
                    <ul class="space-y-3">
                        <li v-for="(record, index) in leaderboard" :key="index" class="text-sm flex justify-between items-center">
                            <div class="flex flex-col">
                                <span class="font-bold">{{ record.name }}</span>
                                <span class="text-[10px] text-slate-500">{{ record.date }}</span>
                            </div>
                            <span class="text-yellow-400 font-mono font-bold text-lg">{{ record.score }}</span>
                        </li>
                        <li v-if="leaderboard.length === 0" class="text-slate-500 italic text-center py-4">Sin récords</li>
                    </ul>
                    <button 
                        @click="clearScores"
                        class="w-full mt-6 text-[10px] uppercase tracking-widest text-rose-400 hover:text-rose-300 transition"
                    >
                        Borrar Historial
                    </button>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            score: 0,
            timeLeft: 10,
            gameActive: false,
            canStart: true,
            timerInterval: null,
            scale: 1,
            leaderboard: [],
            isButtonDisabled: false
        };
    },
    computed: {
        btnText() {
            if (this.gameActive) return '¡MACHACA!';
            if (this.timeLeft === 0 && !this.canStart) return '¡FIN!';
            return '¡EMPEZAR!';
        },
        balloonStyles() {
            let color = "#ff4757";
            if (this.score > 60) color = "#ff6b6b";
            else if (this.score > 30) color = "#ffa502";
            
            return {
                width: '55px',
                height: '65px',
                borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%',
                position: 'relative',
                boxShadow: 'inset -10px -10px 15px rgba(0,0,0,0.3)',
                transition: 'transform 0.05s, background-color 0.2s',
                transform: `scale(${this.scale})`,
                backgroundColor: color,
                opacity: this.scale === 0 ? 0 : 1,
                // Recreamos el nudo del globo de manera programática para no depender de pseudoelementos ::after problemáticos en inline styles
                borderBottom: `6px solid ${color}` 
            };
        }
    },
    methods: {
        handleAction() {
            if (this.canStart) {
                this.startGame();
            } else {
                this.handleMash();
            }
        },
        startGame() {
            this.canStart = false;
            this.score = 0;
            this.timeLeft = 10;
            this.scale = 1;
            this.gameActive = true;

            this.timerInterval = setInterval(() => {
                this.timeLeft--;
                if (this.timeLeft <= 0) this.endGame();
            }, 1000);
        },
        handleMash() {
            if (!this.gameActive) return;
            this.score++;
            this.scale += 0.04;
        },
        endGame() {
            this.gameActive = false;
            clearInterval(this.timerInterval);
            this.isButtonDisabled = true;

            setTimeout(() => {
                if (this.score >= 80) {
                    this.scale = 0;
                    alert(`¡BOOM! Globo explotado con ${this.score} pulsaciones.`);
                } else {
                    alert(`¡Tiempo fuera! Conseguiste ${this.score} pulsaciones.`);
                }
                this.saveScore(this.score);
                
                this.isButtonDisabled = false;
                this.canStart = true;
            }, 100);
        },
        saveScore(newScore) {
            let scores = JSON.parse(localStorage.getItem('scores_mashing')) || [];
            if (scores.length < 5 || newScore > scores[scores.length - 1].score) {
                const name = prompt("¡Nuevo récord! Tu nombre:") || "Anónimo";
                scores.push({ 
                    name, 
                    score: newScore, 
                    date: new Date().toLocaleDateString() 
                });
                scores.sort((a, b) => b.score - a.score);
                this.leaderboard = scores.slice(0, 5);
                localStorage.setItem('scores_mashing', JSON.stringify(this.leaderboard));
            }
        },
        displayScores() {
            this.leaderboard = JSON.parse(localStorage.getItem('scores_mashing')) || [];
        },
        clearScores() {
            if (confirm("¿Borrar todos los récords?")) {
                localStorage.removeItem('scores_mashing');
                this.displayScores();
            }
        },
        handleKeydown(e) {
            if (e.code === 'Space') {
                e.preventDefault();
                this.handleAction();
            }
        }
    },
    mounted() {
        this.displayScores();
        window.addEventListener('keydown', this.handleKeydown);
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
        clearInterval(this.timerInterval);
    }
};