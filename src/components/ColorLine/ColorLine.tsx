import React, { FC, useEffect, useState } from 'react';
import classes from './ColorLine.module.scss';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/redux/rootReducer';
import { setColorRequestAction } from '../../store/redux/colorReducer';

type typesColor = 'RGB' | 'HEX' | 'HSL' | 'SMYK' | 'PANTONE';

interface ColorLine {
  type: typesColor;
}

function ColorLine(props: ColorLine) {
  const { type } = props;

  const { rgb, hex, hsl, smyk, pantone } = useSelector(
    (state: RootState) => state.colors.colors
  );
  const dispatch = useDispatch();

  const colorInputValue = (type: typesColor) => {
    switch (type) {
      case 'RGB': {
        return `rgb(${rgb?.r},${rgb?.g},${rgb?.b})`;
      }
      case 'HEX': {
        return `#${hex?.hex}`;
      }
      case 'HSL': {
        return `hsl(${hsl?.h},${hsl?.s}%,${hsl?.l}%)`;
      }
      case 'SMYK': {
        return `smyk(${smyk?.s},${smyk?.m},${smyk?.y},${smyk?.k})`;
      }
      case 'PANTONE': {
        return `pantone:${pantone?.pantone}`;
      }
      default: {
        return 'azaz';
      }
    }
  };

  const [inputValue, setInputValue] = useState(colorInputValue(type));

  function changeColor(inputElement: any) {
    setInputValue(inputElement);
    console.log('parametr', inputElement);

    dispatch(setColorRequestAction(inputElement));
  }

  return (
    <div className={classes.ColorLine}>
      <div className={classes.ColorLineType}>{type}</div>
      <div className={classes.ColorLineCodeAndCopy}>
        <input
          value={inputValue}
          onChange={(e) => changeColor(e.target.value)}
          className={classes.ColorLineInput}
        />
        {rgb?.r} {rgb?.b} {rgb?.g}
        <div>copy</div>
      </div>
      <div className={classes.separator} />
    </div>
  );
}
const ColorLineClasses = cn({});

export { ColorLine };
