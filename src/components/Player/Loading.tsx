import React from 'react';

import { Loading as LoadingComponent } from './styles';

const Loading: React.FC<{
  color: string
}> = ({ color }) => {
  return (
    <LoadingComponent color={color}>
      <div>
        <div />
        <div />
        <div />
      </div>
    </LoadingComponent>
  );
}

export default Loading;