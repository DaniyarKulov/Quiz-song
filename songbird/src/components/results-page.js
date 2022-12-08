import Control from '../control/control';
import {inner} from './innerMain';
import './result-style.scss';

export class ResultMain extends Control {
  constructor(parentNode) {
    super(parentNode, 'main', 'start-main');
    const start = new Control(this.node, 'div', 'app');
    start.node.innerHTML = inner;
    const result = new Control(this.node, 'div', 'text');
    const congrats = new Control(
      result.node,
      'div',
      'chrome shine',
      'Поздравляем!',
      'data-text',
      'Поздравляем!'
    );
    const resultScore = new Control(
      result.node,
      'div',
      'chrome shine font-shine',
      `Вы прошли викторину и набрали ${localStorage.getItem('score')} из 30 возможных баллов!`
    );
    this.button = new Control(
      result.node,
      'div',
      'chrome shine',
      'Restart',
      'data-text',
      'Restart'
    );
    this.button.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'quiz';
    });
  }
}
