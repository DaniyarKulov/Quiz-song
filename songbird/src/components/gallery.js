import birdsData from '../birdsData';
import Control from '../control/control';
import {Player} from '../main/player';
import './gallery.scss';

export class GalleryPage extends Control {
  constructor(parentNode) {
    super(parentNode, 'div', 'gallery-container');

    const cards = birdsData.flat();
    cards.forEach((item) => {
      const blockCard = new Control(this.node, 'div', 'gallery-card');
      const text = new Control(blockCard.node, 'div', 'gallery-block');
      const name = new Control(text.node, 'h1', 'gallery-name', `${item.name}`);
      const img = new Control(text.node, 'img', 'gallery-image', '', 'src', `${item.image}`);
      const species = new Control(text.node, 'p', 'gallery-species', `${item.species}`);
      const player = new Player(blockCard.node);
      player.nodeDestroy();
      player.renderInfoAudioPlayer(blockCard.node, `${item.audio}`);
      const description = new Control(
        blockCard.node,
        'p',
        'gallery-description',
        `${item.description}`
      );
    });
  }
}
