import Control from '../control/control';
import {btnSelectors} from './btnSelectors';
import './main.scss';
import {Quiz} from './quiz';
import birdsData from '../birdsData';
import {Model} from '../control/count';
import {random} from '../control/random';
import {StateId} from '../control/stateId';
import {State} from '../control/state';

export class Main extends Control {
  btnSelector;
  constructor(parentNode) {
    super(parentNode, 'main', 'main');
    this.btnSelector = new btnSelectors(this.node);
    this.state = new State(5);
    const quiz = new Quiz(this.node);

    const randoma = random();
    const model = new Model(0);

    const stateId = new StateId(randoma);

    quiz.renderAnswers(birdsData[model.getData()], stateId.getData());
    quiz.renderAudio(birdsData[0][randoma]);
    this.btnSelector.changeColor(model.getData());
    this.button = new Control(this.node, 'button', 'button', 'Next Level');
    this.button.node.disabled = true;
    this.button.setOnClick(() => {
      quiz.destroyBird();
      this.button.node.disabled = true;
      this.button.node.style.background = '#FF6B57';
      birdsData[model.setData()];
      if (model.getData() === 6) {
        window.location.hash = '';
        window.location.hash = 'result';
      }
      const a = birdsData[model.getData()];

      const b = a[random()];
      console.log(b);
      stateId.setData(b.id);
      quiz.renderAnswers(birdsData[model.getData()], stateId.getData());
      quiz.renderAudio(b);
      this.btnSelector.changeColor(model.getData());
    });
    quiz.setOnWin(() => {
      this.button.node.disabled = false;
      this.button.node.style.background = '#fff';
      this.state.getContent();
    });
    quiz.setOnLose(() => {
      this.state.setContent();
    });
  }
  getLocalStorage() {
    return this.state.getContent();
  }
}
