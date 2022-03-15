import React, { FC, useEffect, useState } from 'react';
import classes from './ColorLine.module.scss';
import cn from 'classnames';



type typesColor = 'RGB' | 'HEX' | 'HSL' | 'SMYK' | 'PANTONE';

interface ColorLine {
  type: typesColor;
}

 function ColorLine( props: ColorLine) {
  const { type } = props;

  function typer(type: typesColor | string) {
    switch (type) {
      case 'RGB': {
        return `rgb(${1},${2},${3})`;
      }
      case 'HEX': {
        return `#${1}`;
      }
      case 'HSL': {
        return `hsl(${1},${2}%,${3}%)`;
      }
      case 'SMYK': {
        return `smyk(${1},${2},${3},${4})`;
      }
      case 'PANTONE': {
        return `pantone??`;
      }
    }
  }

  const [inputValue, setInputValue] = useState(typer(type));

  return (
    <div className={classes.ColorLine}>
      <div className={classes.ColorLineType}>{type}</div>
      <div className={classes.ColorLineCodeAndCopy}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(typer(e.target.value))}
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
