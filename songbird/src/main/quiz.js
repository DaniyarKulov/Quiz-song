import Control from '../control/control';
import './main.scss';
import {State} from '../control/state';
import right from '../assets/music/right.mp3';
import wrong from '../assets/music/wrong.mp3';
import {Player} from './player';

export class Quiz extends Control {
  list;
  answers;
  block;
  content;

  bird;
  name;
  audioPlayerSource;
  winCallBack;
  score;
  constructor(parentNode) {
    super(parentNode, 'div', 'block-main');
    this.player = new Player(this.node);

    this.score = new Control(this.node, 'p', 'score', 'score: 0');

    this.blockQuiz = new Control(this.node, 'div', 'block-quiz');
    this.blockInfo = new Control(this.blockQuiz.node, 'div', 'block-quiz__info');
    this.block = new Control(
      this.blockInfo.node,
      'div',
      'block-quiz__info-block',
      'Послушай плеер. Выберите птицу из списка. Нажмите Next Level'
    );

    this.answers = new Control(this.blockQuiz.node, 'div', 'block-quiz__answers');
    this.list = new Control(this.answers.node, 'ul');
  }

  renderAnswers(data, id) {
    this.list.destroy();
    this.answers.destroy();
    this.state = new State(5);
    this.answers = new Control(this.blockQuiz.node, 'div', 'block-quiz__answers');
    this.list = new Control(this.answers.node, 'ul');
    data.forEach((el) => {
      const listLi = new Control(this.list.node, 'li', 'block-quiz__answers-list', `${el.name}`);
      listLi.setOnClick(() => {
        this.block.destroy();
        this.block = new Control(this.blockInfo.node, 'div', 'block-quiz__info-block');
        this.img = new Control(
          this.block.node,
          'img',
          'block-quiz__info-block-img',
          '',
          'src',
          `${el.image}`
        );
        this.blockText = new Control(this.block.node, 'div', 'block-quiz__info-text');
        this.name = new Control(
          this.blockText.node,
          'p',
          'block-quiz__info-text-name',
          `${el.name}`
        );
        this.species = new Control(
          this.blockText.node,
          'p',
          'block-quiz__info-text-species',
          `${el.species}`
        );
        this.player.renderInfoAudioPlayer(this.blockText.node, el.audio);
        this.description = new Control(
          this.block.node,
          'p',
          'block-quiz__info-block-description',
          `${el.description}
        `
        );
        if (id === el.id) {
          this.player.showBird(el.name, el.image);
          this.player.pauseAudio();
          listLi.node.classList.add('right');
          const audio = new Audio(right);
          audio.load();
          audio.play();
          this.score.node.textContent = `score: ${
            +this.score.node.textContent.slice(7) + this.state.getContent()
          }`;
          localStorage.setItem('score', `${this.score.node.textContent.slice(7)}`);
          if (this.winCallBack) {
            this.winCallBack();
          }
        } else {
          listLi.node.classList.add('wrong');
          this.state.setContent();
          if (this.loseCallBack) {
            this.loseCallBack();
          }
          const audio = new Audio(wrong);
          audio.load();
          audio.play();
        }
      });
    });
  }

  setOnWin(callBack) {
    this.winCallBack = callBack;
  }
  setOnLose(callBack) {
    this.loseCallBack = callBack;
  }
  renderAudio(bird, block) {
    this.player.renderAudioPlayer(bird.audio, block);
  }
  destroyBird() {
    this.player.hideBird();
  }
}
