import React, { FC, useEffect } from 'react';
import classes from './ColorInputWindow.module.scss';
import cn from 'classnames';
import { ColorLine } from '../ColorLine';

const ColorInputWindow: FC = () => {
  return (
    <div className={classes.ColorInputWindow}>
      <ColorLine type={'RGB'} />
      <ColorLine type={'HEX'} />
      <ColorLine type={'HSL'} />
      <ColorLine type={'CMYK'} />
    </div>
  );
};
const ColorInputWindowClasses = cn({});

export { ColorInputWindow };
