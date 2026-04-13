// navigation/linkingConfig.ts
import { stackRoutes } from './screenIds';

export const linkingConfig = {
  prefixes: ['castly://app', 'https://castly.com'],
  config: {
    screens: {
      [stackRoutes.TabNavigator]: {
        path: 'home',
      },
      [stackRoutes.ApplicationsDetail]: {
        path: 'ApplicationsDetail/:id',  // castly://app/application/123
        parse: {
          id: (id: string) => id,
        },
      },
    },
  },
};