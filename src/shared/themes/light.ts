import { lighten } from 'polished';
import { DefaultTheme } from 'styled-components';

const light: DefaultTheme = {
  name: `light`,
  red: `#ffadad`,
  orange: `#ffd6a5`,
  yellow: `#fdffb6`,
  green: `#caffbf`,
  cyan: `#9bf6ff`,
  cyan_light: lighten(0.175, `#9bf6ff`),
  blue_light: lighten(0.05, `#a0c4ff`),
  blue: `#a0c4ff`,
  purple: `#bdb2ff`,
  pink: `#FF79C6`,
  background: `#fffffc`,
  text: `#483C67`,
  light: `#E1E1E6`,
};

export default light;
