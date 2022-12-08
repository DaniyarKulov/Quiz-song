import {Main} from '../main/main';
import {GalleryPage} from './gallery';
import {ResultMain} from './results-page';
import {StartMain} from './start-page';

const AppRoute = {
  start: StartMain,
  quiz: Main,
  result: ResultMain,
  gallery: GalleryPage,
  notFound: StartMain,
};
export default AppRoute;
