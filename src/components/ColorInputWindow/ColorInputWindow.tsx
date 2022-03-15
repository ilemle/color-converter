import React, {FC,useEffect} from 'react';
import classes from './ColorInputWindow.module.scss';
import cn from "classnames";
import { ColorLine } from '../ColorLine';

const  ColorInputWindow:FC=()=>{
  return (
    <div className={classes.ColorInputWindow}>
        <ColorLine type={'HEX'}/>
        <ColorLine type={'HSL'}/>
        <ColorLine type={'PANTONE'}/>
        <ColorLine type={'RGB'}/>
        <ColorLine type={'SMYK'}/>
    </div>
  )
}
const ColorInputWindowClasses = cn({
  
});

export {ColorInputWindow};