import Control from '../control/control';
import logos from '../assets/img/libresong.png';
import feather from '../assets/img/feather.png';
import './style.scss';

export class Header extends Control {
  startPage;
  quizPage;
  resultPage;
  constructor(parentNode) {
    super(parentNode, 'header', 'header');
    const contentHeader = new Control(this.node, 'div', 'header__content');
    const logo = new Control(contentHeader.node, 'img', 'logo');
    logo.node.src = logos;
    const blockScore = new Control(contentHeader.node, 'div', 'block-score');
    const image = new Control(blockScore.node, 'img', 'img-score', '', 'src', feather);
    const pages = new Control(this.node, 'div', 'header__pages');
    this.startPage = new Control(pages.node, 'button', 'header__pages-start', 'PLAY');
    this.quizPage = new Control(pages.node, 'button', 'header__pages-quiz', 'QUIZ');
    this.resultPage = new Control(pages.node, 'button', 'header__pages-result', 'RESULT');
    this.galleryPage = new Control(pages.node, 'button', 'header__pages-gallery', 'GALLERY');
    this.setOnStart();
    this.setOnQuiz();
    this.setOnResult();
    this.setOnGallery();
  }
  setOnStart() {
    this.startPage.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'start';
    });
  }
  setOnQuiz() {
    this.quizPage.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'quiz';
    });
  }
  setOnResult() {
    this.resultPage.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'result';
    });
  }
  setOnGallery() {
    this.galleryPage.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'gallery';
    });
  }
}
