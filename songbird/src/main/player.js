import Control from '../control/control';
import './main.scss';
import bird from '../assets/img/Group.png';
import birdsData from '../birdsData';
import play from '../assets/svg/play.svg';
import pause from '../assets/svg/pause.svg';
import {Model} from '../control/count';
import {random} from '../control/random';
import volume from '../assets/svg/volume.svg';

export class Player extends Control {
  playerBird;
  playPause;
  blockLine;
  line;
  timerBlock;
  content;
  timeEnd;
  timeStart;
  constructor(parentNode) {
    super(parentNode, 'div', 'block-player');

    this.content = new Control(this.node, 'div', 'content-player');

    this.playerBird = new Control(this.content.node, 'img', 'player-bird', '', 'src', `${bird}`);
    this.playPause = new Control(this.content.node, 'img', 'play-pause', '', 'src', `${play}`);
    this.bird = new Control(this.content.node, 'p', 'player-text', '***');
    this.playerContainer = new Control(this.content.node, 'div', 'block-player__container');
    this.blockLine = new Control(this.playerContainer.node, 'div', 'block-player__content');
    this.timeStart = new Control(
      this.blockLine.node,
      'div',
      'block-player__content-timer-start',
      '00:00'
    );
    this.input = new Control(this.blockLine.node, 'input', 'block-player__content-slider');
    this.input.node.type = 'range';
    this.input.node.min = '1';
    this.input.node.max = '100';
    this.input.node.value = 1;
    this.timeEnd = new Control(
      this.blockLine.node,
      'div',
      'block-player__content-timer-end',
      '00:00'
    );
    this.blockLineVolume = new Control(
      this.playerContainer.node,
      'div',
      'block-player__content-vol'
    );
    this.volumeSvg = new Control(
      this.blockLineVolume.node,
      'img',
      'block-player__content-volume-svg',
      '',
      'src',
      `${volume}`
    );
    this.inputVol = new Control(this.blockLineVolume.node, 'input', 'block-player__content-volume');
    this.inputVol.node.type = 'range';
    this.inputVol.node.min = '1';
    this.inputVol.node.max = '100';
    this.inputVol.node.value = 99;
    this.inputVol.node.addEventListener('input', () => {
      this.audio.volume = this.inputVol.node.value / 100;
    });

    this.isPlaying = false;
  }
  renderAudioPlayer(modal) {
    this.audio = new Audio(`${modal}`);
    this.audio.load();

    this.audio.addEventListener('timeupdate', () => {
      let seekto = this.audio.currentTime * (100 / this.audio.duration);
      this.input.node.value = isNaN(seekto) ? 1 : seekto;
    });

    this.playPause.setOnClick(() => {
      if (!this.isPlaying) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    });
    this.setTime();
  }
  renderInfoAudioPlayer(parentNode, modal) {
    const playerContainer = new Control(
      parentNode,
      'div',
      'block-player__container info-block-player info-gallery-player'
    );
    const blockLine = new Control(playerContainer.node, 'div', 'block-player__content info-player');
    const playPause = new Control(
      blockLine.node,
      'img',
      'play-pause pause-play',
      '',
      'src',
      `${play}`
    );
    const audio = new Audio(`${modal}`);
    const timeStart = new Control(
      blockLine.node,
      'div',
      'block-player__content-timer-start',
      '00:00'
    );
    const input = new Control(
      blockLine.node,
      'input',
      'block-player__content-slider info-slider gallery-slider'
    );
    input.node.min = '1';
    input.node.max = '100';
    input.node.type = 'range';
    input.node.value = 1;
    const timeEnd = new Control(blockLine.node, 'div', 'block-player__content-timer-end', '00:00');
    const blockLineVolume = new Control(playerContainer.node, 'div', 'block-player__content-vol');
    const volumeSvg = new Control(
      blockLineVolume.node,
      'img',
      'block-player__content-volume-svg',
      '',
      'src',
      `${volume}`
    );
    const inputVol = new Control(
      blockLineVolume.node,
      'input',
      'block-player__content-volume info-vol gallery-vol'
    );
    inputVol.node.type = 'range';
    inputVol.node.min = '1';
    inputVol.node.max = '100';
    inputVol.node.value = 99;
    inputVol.node.addEventListener('input', () => {
      audio.volume = inputVol.node.value / 100;
    });

    audio.load();

    audio.addEventListener('timeupdate', () => {
      let seekto = audio.currentTime * (100 / audio.duration);
      input.node.value = isNaN(seekto) ? 1 : seekto;
    });
    let isPlaying = false;
    playPause.setOnClick(() => {
      if (!isPlaying) {
        audio.play().catch((e) => {
          if (e.name === 'AbortError') {
            return;
          }
          throw e;
        });
        isPlaying = true;
        playPause.node.src = pause;
      } else {
        audio.pause();
        isPlaying = false;
        playPause.node.src = play;
      }
    });
    let seekPosition = 0;
    setInterval(() => {
      if (!isNaN(audio.duration)) {
        seekPosition = audio.currentTime * (100 / audio.duration);

        let currentMinutes = Math.floor(audio.currentTime / 60);
        let currentSeconds = Math.floor(audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(audio.duration / 60);
        let durationSeconds = Math.floor(audio.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
          currentSeconds = '0' + currentSeconds;
        }
        if (durationSeconds < 10) {
          durationSeconds = '0' + durationSeconds;
        }
        if (currentMinutes < 10) {
          currentMinutes = '0' + currentMinutes;
        }
        if (durationMinutes < 10) {
          durationMinutes = '0' + durationMinutes;
        }
        if (seekPosition === 100) {
          isPlaying = false;

          playPause.node.src = play;
        }

        timeStart.node.textContent = currentMinutes + ':' + currentSeconds;
        timeEnd.node.textContent = durationMinutes + ':' + durationSeconds;
      }
    }, 1000);
  }
  playAudio() {
    this.audio.play().catch((e) => {
      if (e.name === 'AbortError') {
        return;
      }
      throw e;
    });
    this.isPlaying = true;
    this.playPause.node.src = pause;
  }

  pauseAudio() {
    this.audio.pause();
    this.isPlaying = false;
    this.playPause.node.src = play;
  }
  setTime() {
    setInterval(() => {
      let seekPosition = 0;
      if (!isNaN(this.audio.duration)) {
        seekPosition = this.audio.currentTime * (100 / this.audio.duration);

        let currentMinutes = Math.floor(this.audio.currentTime / 60);
        let currentSeconds = Math.floor(this.audio.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(this.audio.duration / 60);
        let durationSeconds = Math.floor(this.audio.duration - durationMinutes * 60);

        if (currentSeconds < 10) {
          currentSeconds = '0' + currentSeconds;
        }
        if (durationSeconds < 10) {
          durationSeconds = '0' + durationSeconds;
        }
        if (currentMinutes < 10) {
          currentMinutes = '0' + currentMinutes;
        }
        if (durationMinutes < 10) {
          durationMinutes = '0' + durationMinutes;
        }
        if (seekPosition === 100) {
          this.isPlaying = false;

          this.playPause.node.src = play;
        }

        this.timeStart.node.textContent = currentMinutes + ':' + currentSeconds;
        this.timeEnd.node.textContent = durationMinutes + ':' + durationSeconds;
      }
    }, 1000);
  }
  showBird(name, img) {
    this.bird.node.textContent = name;
    this.playerBird.node.src = img;
  }
  hideBird() {
    this.bird.node.textContent = '***';
    this.playerBird.node.src = bird;
  }
  nodeDestroy() {
    this.node.remove();
  }
}
