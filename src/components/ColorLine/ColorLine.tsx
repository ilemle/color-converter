import React, { FC, useEffect, useState } from 'react';
import classes from './ColorLine.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/redux/rootReducer';
import {
  setHEXColorRequestAction,
  setHSLColorRequestAction,
  setRGBColorRequestAction,
  setCMYKColorRequestAction,
} from '../../store/redux/colorReducer';
import { colorTypes } from '../../types';

interface ColorLine {
  type: colorTypes;
}

type valueType = null | string | number | readonly string[] | undefined;

function ColorLine(props: ColorLine) {
  const { type } = props;

  const { rgb, hex, hsl, cmyk } = useSelector(
    (state: RootState) => state.colors
  );
  const dispatch = useDispatch();

  let currentColor = null;
  switch (type) {
    case 'RGB': {
      currentColor = rgb;
      break;
    }
    case 'HEX': {
      currentColor = hex;
      break;
    }
    case 'HSL': {
      currentColor = hsl;
      break;
    }
    case 'CMYK': {
      currentColor = cmyk;
      break;
    }
  }

  function colorChange(colorValue: string) {
    switch (type) {
      case 'RGB': {
        dispatch(setRGBColorRequestAction(colorValue));
        break;
      }
      case 'HEX': {
        dispatch(setHEXColorRequestAction(colorValue));
        break;
      }
      case 'HSL': {
        dispatch(setHSLColorRequestAction(colorValue));
        break;
      }
      case 'CMYK': {
        dispatch(setCMYKColorRequestAction(colorValue));
        break;
      }
    }
  }

  return (
    <div className={classes.ColorLine}>
      <div className={classes.ColorLineType}>{type}</div>
      <div className={classes.ColorLineCodeAndCopy}>
        <input
          value={currentColor}
          onChange={(e) => colorChange(e.target.value)}
          className={classes.ColorLineInput}
        />
        <div>copy</div>
      </div>
      <div className={classes.separator} />
    </div>
  );
}
const ColorLineClasses = cn({});

export { ColorLine };


