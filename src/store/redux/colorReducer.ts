export const SET_COLOR_REQUEST = 'SET_COLOR_REQUEST';

export const setColorRequestAction = (params: string) => ({
  type: SET_COLOR_REQUEST,
  params,
});

const initialState = {
  colors: {
    rgb: { r: null, g: null, b: null },
    hex: { hex: null},
    hsl: { h: null, s: null, l: null },
    smyk: { s: null, m: null, y: null, k: null },
    pantone: { pantone: null },
  },
};

export const colorReducer = (state = initialState, action: any) => {
  const { type, params, payload } = action;
  console.log(state.colors);

  switch (type) {
    case SET_COLOR_REQUEST: {
      const colors = params;

      return { ...state, colors };
    }
  }
  return state;
};
