//https://css-tricks.com/converting-color-spaces-in-javascript/

export function RGBToHSL(r: number, g: number, b: number) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
}

export function RGBToHex(r: number, g: number, b: number) {
  let _r = r.toString(16);
  let _g = g.toString(16);
  let _b = b.toString(16);

  if (_r.length == 1) _r = '0' + r;
  if (_g.length == 1) _g = '0' + g;
  if (_b.length == 1) _b = '0' + b;

  return '#' + _r + _g + _b;
}

////

export const rgb2cmyk = function (
  r: number,
  g: number,
  b: number,
  normalized?: number
) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, Math.min(m, y));

  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);

  if (!normalized) {
    c = Math.round(c * 10000) / 100;
    m = Math.round(m * 10000) / 100;
    y = Math.round(y * 10000) / 100;
    k = Math.round(k * 10000) / 100;
  }

  c = isNaN(c) ? 0 : c;
  m = isNaN(m) ? 0 : m;
  y = isNaN(y) ? 0 : y;
  k = isNaN(k) ? 0 : k;

  return {
    c: c,
    m: m,
    y: y,
    k: k,
  };
};

export const cmyk2rgb = function (
  c: number,
  m: number,
  y: number,
  k: number,
  normalized: number
) {
  c = c / 100;
  m = m / 100;
  y = y / 100;
  k = k / 100;

  c = c * (1 - k) + k;
  m = m * (1 - k) + k;
  y = y * (1 - k) + k;

  let r = 1 - c;
  let g = 1 - m;
  let b = 1 - y;

  if (!normalized) {
    r = Math.round(255 * r);
    g = Math.round(255 * g);
    b = Math.round(255 * b);
  }

  return {
    r,
    g,
    b,
  };
};

// export function hexToRGB(h: string): string {
//   console.log('h in converColor:', h);

//   let r = '',
//     g = '',
//     b = '';

//   // 3 digits
//   if (h.length == 4) {
//     r = '0x' + h[1] + h[1];
//     g = '0x' + h[2] + h[2];
//     b = '0x' + h[3] + h[3];

//     // 6 digits
//   } else if (h.length == 7) {
//     r = '0x' + h[1] + h[2];
//     g = '0x' + h[3] + h[4];
//     b = '0x' + h[5] + h[6];
//   }
//   console.log('In HEX TO RGB function', 'rgb(' + r + ',' +g + ','  +b + ')' );

//   return "rgb("+ +r + "," + +g + "," + +b + ")";
// }

export function hexToRGB(hex: string, currentRGB: string) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  let shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  // return result ? {
  //   r: parseInt(result[1], 16),
  //   g: parseInt(result[2], 16),
  //   b: parseInt(result[3], 16)
  // } :null;
  if (!result) return currentRGB;
  
  return `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)})`;
}

export const rgb2hex = function (r: number, g: number, b: number) {
  let rgb = [r.toString(16), g.toString(16), b.toString(16)];
  for (let i = 0; i < 3; i++) {
    if (rgb[i].length == 1) {
      rgb[i] = rgb[i] + rgb[i];
    }
  }

  if (
    rgb[0][0] == rgb[0][1] &&
    rgb[1][0] == rgb[1][1] &&
    rgb[2][0] == rgb[2][1]
  ) {
    return '#' + rgb[0][0] + rgb[1][0] + rgb[2][0];
  } else {
    return '#' + rgb[0] + rgb[1] + rgb[2];
  }
};

export function hexToHSL(hex: string, currentHSL: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return currentHSL;
  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    if (h) {
      h /= 6;
    } else {
      return currentHSL;
    }
  }
  console.log('H', h);

  h = Math.floor(h * 100);
  console.log('H after', h);

  s = Math.floor(s * 100);
  l = Math.floor(l * 100);
  return `hsl(${h},${s}%,${l}%)`;
}

// function hslToHex(h, s, l) {
//   l /= 100;
//   const a = s * Math.min(l, 1 - l) / 100;
//   const f = n => {
//     const k = (n + h / 30) % 12;
//     const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
//     return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
//   };
//   return `#${f(0)}${f(8)}${f(4)}`;
// }
