import React, {FC,useEffect} from 'react';
import classes from './ColorBackground.module.scss';
import cn from "classnames";
import { ColorInputWindow } from '../ColorInputWindow';

const ColorBackground:FC=()=>{
  return (
    <div style={{backgroundColor:'rgb(29, 221, 45)'}} className={classes.colorBackground}>
        <ColorInputWindow/>
    </div>
  )
}
const ColorBackgroundClasses = cn({
  
});

export {ColorBackground};