new Vue({
  el: '#app',
  data: {
    logs: [],
    running: false,
    playerLife: 100,
    monsterLife: 100,
    alreadyUsedCure: false
  },
  computed: {
    hasResult() {
      return this.playerLife == 0 || this.monsterLife == 0;
    }
  },
  methods: {
    startGame() {
      this.running = true;
      this.monsterLife = 100;
      this.playerLife = 100;
      this.logs = [];
    },
    attack(especial) {
      this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player');
      if (this.monsterLife > 0) {
        this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
      }
    },
    hurt(prop, min, max, especial, source, target, classCss) {
      const plus = especial ? 5 : 0;
      const hurt = this.getRandom(min + plus, max + plus);
      this[prop] = Math.max(this[prop] - hurt, 0);
      this.registerLog(`${source} atingiu ${target} com ${hurt}.`, classCss);
    },
    healAndHurt() {
      if (playerLife == 100) {
        return;
      }
      if (this.alreadyUsedCure == true) {
        this.registerLog('A cura só pode ser usada uma vez!');
        return;
      }
      this.heal(10, 15);
      this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster');
      this.alreadyUsedCure = true
    },
    heal(min, max) {
      const heal = this.getRandom(min, max);
      this.playerLife = Math.min(this.playerLife + heal, 100);
      this.registerLog(`Jogador ganhou força de ${heal}.`, 'player');
    },
    getRandom(min, max) {
      const value = Math.random() * (max, min) + min;
      return Math.round(value);
    },
    registerLog(text, classCss) {
      this.logs.unshift({ text, classCss });
    },
  },
  watch: {
    hasResult(value) {
      if (value) this.running = false;
    }
  }
});
