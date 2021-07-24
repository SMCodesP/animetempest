import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'dark' | 'light';
    red: string;
    orange: string;
    yellow: string;
    green: string;
    cyan: string;
    blue: string;
    purple: string;
    pink: string;
    background: string;
    text: string;
    cyan_light: string;
    blue_light: string;
    light: string;
  }
}
