import Control from '../control/control';
import './style.scss';

export class Footer extends Control {
  constructor(parentNode) {
    super(parentNode, 'footer', 'footer');
    const blockFooter = new Control(this.node, 'div', 'block-footer');
    const rssBlock = new Control(blockFooter.node, 'a', '', '', 'href', 'https://rs.school/js/');
    const rssLogo = new Control(
      rssBlock.node,
      'img',
      'rss',
      '',
      'src',
      'https://rs.school/images/rs_school_js.svg'
    );
    const year = new Control(blockFooter.node, 'p', 'text-year', '2022');
    const git = new Control(
      blockFooter.node,
      'a',
      'git',
      'GitHub',
      'href',
      'https://github.com/DaniyarKulov'
    );
  }
}
