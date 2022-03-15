import React, { FC, useEffect } from 'react';
import classes from './ColorBackground.module.scss';
import cn from 'classnames';
import { ColorInputWindow } from '../ColorInputWindow';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/redux/rootReducer';

const ColorBackground: FC = () => {
  const { rgb } = useSelector((state: RootState) => state.colors.colors);

  // useEffect(() => {}, [rgb.r]);

  return (
    <div
      style={{ backgroundColor: `rgb(${rgb?.r},${rgb?.g},${rgb?.b})` }}
      className={classes.colorBackground}
    >
      <ColorInputWindow />
    </div>
  );
};
const ColorBackgroundClasses = cn({});

export { ColorBackground };
