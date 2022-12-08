import Control from '../control/control';
import './main.scss';

export class btnSelectors extends Control {
  warmUp;
  sparrows;
  forest;
  choristers;
  predatory;
  maritime;
  constructor(parentNode) {
    super(parentNode, 'div', 'btn-section');
    this.warmUp = new Control(this.node, 'button', 'warm-up', 'Разминка');
    this.sparrows = new Control(this.node, 'button', 'sparrows', 'Воробьинные');
    this.forest = new Control(this.node, 'button', 'forest', 'Лесные птицы');
    this.choristers = new Control(this.node, 'button', 'choristers', 'Певчие птицы');
    this.predatory = new Control(this.node, 'button', 'predatory', 'Хищные птицы');
    this.maritime = new Control(this.node, 'button', 'maritime', 'Морские птицы');
  }
  changeColor(number) {
    if (number === 0) {
      this.maritime.node.classList.remove('btn-select');
      this.warmUp.node.classList.add('btn-select');
    } else if (number === 1) {
      this.warmUp.node.classList.remove('btn-select');
      this.sparrows.node.classList.add('btn-select');
    } else if (number === 2) {
      this.sparrows.node.classList.remove('btn-select');
      this.forest.node.classList.add('btn-select');
    } else if (number === 3) {
      this.forest.node.classList.remove('btn-select');
      this.choristers.node.classList.add('btn-select');
    } else if (number === 4) {
      this.choristers.node.classList.remove('btn-select');
      this.predatory.node.classList.add('btn-select');
    } else if (number === 5) {
      this.predatory.node.classList.remove('btn-select');
      this.maritime.node.classList.add('btn-select');
    }
  }
}
