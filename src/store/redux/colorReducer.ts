import { HEX, HSL, RGB, CMYK } from '../../types';
import convert from 'color-convert';
import { toInteger } from 'lodash';
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
  textColor: string;
  rgb: RGB | null;
  hex: HEX | null;
  hsl: HSL | null;
  cmyk: CMYK | null;
}

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getTextColor(HSLarray: [number, number, number]) {
  let HSL = HSLarray.map((el, index) => {
    if (index === 0) return el / 1000;
    return el / 100;
  });

  if ((HSL[0] < 0.55 && HSL[2] >= 0.5) || (HSL[0] >= 0.55 && HSL[2] >= 0.75)) {
    console.log('white');

    return '#000000';
  } else {
    console.log('black');

    return '#FFFFFF';
  }
}

const r = getRandomIntInclusive(0, 255),
  g = getRandomIntInclusive(0, 255),
  b = getRandomIntInclusive(0, 255);

const _HSL = convert.rgb.hsl(r, g, b);
const _HEX = convert.rgb.hex(r, g, b);
const _CMYK = convert.rgb.cmyk(r, g, b);
const textColor = getTextColor(_HSL);

const hsl = `hsl(${_HSL[0]},${_HSL[1]}%,${_HSL[2]}%)`;
const hex = `#${_HEX}`;
const cmyk = `cmyk(${_CMYK[0]},${_CMYK[1]},${_CMYK[2]},${_CMYK[3]})`;

const initialState: initialStateI = {
  textColor,
  rgb: `rgb(${r},${g},${b})`,
  hex,
  hsl,
  cmyk,
};

function rangeSliser(color: string) {
  let _color = color;
  _color = _color.includes('%') ? _color.replace(/%/g, '') : _color;
  const firstBracket = _color.indexOf('(') + 1;
  const secondBracket = _color.indexOf(')');
  const result = _color
    .slice(firstBracket, secondBracket)
    .split(',')
    .map((element: string) => toInteger(element));

  return result;
}

export const colorReducer = (state = initialState, action: any) => {
  const { type, params, payload } = action;
  console.log('-------------');
  console.log('STATE,', state);
  switch (type) {
    case SET_RGB_COLOR_REQUEST: {
      const [r, g, b] = rangeSliser(params);
      const HSL = convert.rgb.hsl(r, g, b);
      const HEX = convert.rgb.hex(r, g, b);
      const CMYK = convert.rgb.cmyk(r, g, b);
      return {
        ...state,
        rgb: params,
        hsl: `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`,
        hex: `#${HEX}`,
        cmyk: `cmyk(${CMYK[0]},${CMYK[1]},${CMYK[2]},${CMYK[3]})`,
      };
    }
    case SET_HEX_COLOR_REQUEST: {
      const RGB = convert.hex.rgb(params);
      const HSL = convert.hex.hsl(params);
      const CMYK = convert.hex.cmyk(params);
      return {
        ...state,
        hex: params,
        rgb: `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`,
        hsl: `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`,
        cmyk: `cmyk(${CMYK[0]},${CMYK[1]},${CMYK[2]},${CMYK[3]})`,
      };
    }
    case SET_HSL_COLOR_REQUEST: {
      const [h, s, l] = rangeSliser(params);
      const RGB = convert.hsl.rgb([h, s, l]);
      const HEX = convert.hsl.hex([h, s, l]);
      const CMYK = convert.hsl.cmyk([h, s, l]);
      return {
        ...state,
        hsl: params,
        rgb: `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`,
        hex: `#${HEX}`,
        cmyk: `cmyk(${CMYK[0]},${CMYK[1]},${CMYK[2]},${CMYK[3]})`,
      };
    }
    case SET_CMYK_COLOR_REQUEST: {
      const [c, m, y, k] = rangeSliser(params);
      const RGB = convert.cmyk.rgb([c, m, y, k]);
      const HEX = convert.cmyk.hex([c, m, y, k]);
      const HSL = convert.cmyk.hsl([c, m, y, k]);
      return {
        ...state,
        cmyk: params,
        rgb: `rgb(${RGB[0]},${RGB[1]},${RGB[2]})`,
        hex: `#${HEX}`,
        hsl: `hsl(${HSL[0]},${HSL[1]}%,${HSL[2]}%)`,
      };
    }
  }
  return state;
};
