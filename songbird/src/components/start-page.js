import Control from '../control/control';
import '../components/style.scss';
import {inner} from './innerMain';

export class StartMain extends Control {
  playPage;
  constructor(parentNode) {
    super(parentNode, 'main', 'start-main');
    const start = new Control(this.node, 'div', 'app');
    start.node.innerHTML = inner;

    const welcome = new Control(this.node, 'div', 'text');

    const welcomePage = new Control(
      welcome.node,
      'div',
      'chrome shine',
      'Welcome!',
      'data-text',
      'Welcome!'
    );
    this.playPage = new Control(welcome.node, 'div', 'chrome shine', 'Play', 'data-text', 'Play');
    this.playPage.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'quiz';
    });
  }
}
