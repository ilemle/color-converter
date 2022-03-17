import * as _ from 'lodash';
import { toNumber } from 'lodash';
import { HEX, HSL, RGB, CMYK } from '../../types';
import {
  hexToHSL,
  hexToRGB,
  rgb2cmyk,
  RGBToHex,
  RGBToHSL,
} from './convertColor/convertColor';

export const SET_RGB_COLOR_REQUEST = 'SET_RGB_COLOR_REQUEST';
export const SET_HEX_COLOR_REQUEST = 'SET_HEX_COLOR_REQUEST';
export const SET_HSL_COLOR_REQUEST = 'SET_HSL_COLOR_REQUEST';
export const SET_CMYK_COLOR_REQUEST = 'SET_CMYK_COLOR_REQUEST';

export const setRGBColorRequestAction = (params: string) => ({
  type: SET_RGB_COLOR_REQUEST,
  params,
});
export const setHEXColorRequestAction = (params: string) => ({
  type: SET_HEX_COLOR_REQUEST,
  params,
});
export const setHSLColorRequestAction = (params: string) => ({
  type: SET_HSL_COLOR_REQUEST,
  params,
});
export const setCMYKColorRequestAction = (params: string) => ({
  type: SET_CMYK_COLOR_REQUEST,
  params,
});

interface initialStateI {
  rgb: RGB;
  hex: HEX;
  hsl: HSL;
  cmyk: CMYK;
}

const _r = 150,
  _g = 50,
  _b = 200;
//rgbToHSL
const initialHSL = RGBToHSL(_r, _g, _b);
//rgbToHex
const initialHEX = RGBToHex(_r, _g, _b);
//rgbToCmyk
const tempCmyk = rgb2cmyk(_r, _g, _b);
const initialCMYK = `cmyk(${tempCmyk.c}, ${tempCmyk.m}, ${tempCmyk.y}, ${tempCmyk.k})`;

const initialState: initialStateI = {
  rgb: `rgb(${_r},${_g},${_b})`,
  hex: initialHEX,
  hsl: initialHSL,
  cmyk: initialCMYK,
};

export const colorReducer = (state = initialState, action: any) => {
  const { type, params, payload } = action;
  console.log('-------------');
  console.log('STATE,', state);
  switch (type) {
    case SET_RGB_COLOR_REQUEST: {
      //get r g b
      const firstBracket = params.indexOf('(') + 1;
      const secondBracket = params.indexOf(')');
      const rgbArray = params
        .slice(firstBracket, secondBracket)
        .split(',')
        .map((element: string) => _.toNumber(element));
      const [_r, _g, _b] = rgbArray;
      //rgbToHSL
      const HSL = RGBToHSL(_r, _g, _b);
      //rgbToHex
      const HEX = RGBToHex(_r, _g, _b);
      //rgbToCmyk
      const tempCmyk = rgb2cmyk(_r, _g, _b);
      const CMYK = `cmyk(${tempCmyk.c}, ${tempCmyk.m}, ${tempCmyk.y}, ${tempCmyk.k})`;
      return { ...state, rgb: params, hsl: HSL, hex: HEX, cmyk: CMYK };
    }
    case SET_HEX_COLOR_REQUEST: {
      const RGB = hexToRGB(state.hex, state.rgb);
      const HSL = hexToHSL(state.hex, state.hsl);
   
      return { ...state, hex: params, rgb: RGB, hsl: HSL };
    }
    case SET_HSL_COLOR_REQUEST: {
      return { ...state, hsl: params };
    }
    case SET_CMYK_COLOR_REQUEST: {
      return { ...state, cmyk: params };
    }
  }
  return state;
};
