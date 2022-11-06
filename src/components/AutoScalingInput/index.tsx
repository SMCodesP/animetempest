// import { Container } from './styles';

import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { useState } from 'react';

const AutoScalingInput: React.FC<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = (props) => {
  const [width, setWidth] = useState(1);

  return <input style={{ width: `${width}ch` }} {...props} />;
};

export default AutoScalingInput;
