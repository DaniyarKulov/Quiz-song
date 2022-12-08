import AppRoute from './components/app-routes';

export class Router {
  constructor(routes, onHashChange) {
    this.routes = routes;
    this.onHashChange = onHashChange;
    window.addEventListener('hashchange', this.onHashChangeHandler.bind(this));
    this.onHashChangeHandler();
  }
  onHashChangeHandler() {
    const path = window.location.hash.slice(1);
    const route = this.routes.find((r) => r.name === path);
    this.onHashChange(route);
  }
  destroy() {
    window.removeEventListener('hashchange', this.onHashChangeHandler.bind(this));
  }
}

// export function createRouter(routerOutlet) {
//   return new Router(
//     [
//       {
//         name: AppRoute.Start,
//         component: async () => {
//           return new StartMain(document.body);
//         },
//       },
//       {
//         name: AppRoute.Quiz,
//         component: async () => {
//           return new Main(document.body);
//         },
//       },
//       {
//         name: AppRoute.Results,
//         component: async () => {
//           return new ResultMain(document.body);
//         },
//       },
//     ],
//     (route) => {
//       if (route) {
//         route.component().then((component) => {
//           routerOutlet.appendChild(component);
//         });
//       }
//     },
//     async () => {
//       return new StartMain(document.body);
//     }
//   );
// }
