import {State} from './control/state';
import {Footer} from './footer/footer';
import {Header} from './header/header';
import {Main} from './main/main';
import {StartMain} from './components/start-page';
import {ResultMain} from './components/results-page';
import AppRoute from './components/app-routes';

export class App {
  currentPage;
  constructor(parentNode) {
    const header = new Header(parentNode);
    const start = new StartMain(parentNode);
    const footer = new Footer(parentNode);
    this.currentPage = start;

    this.onHacheHandler = () => {
      const path = window.location.hash.slice(1);
      const pageRoute = AppRoute[path];
      this.currentPage.destroy();
      if (pageRoute) {
        this.currentPage = new pageRoute(parentNode);
      } else {
        this.currentPage = new AppRoute.notFound(parentNode);
      }
    };
    window.addEventListener('hashchange', this.onHacheHandler);
  }
}
