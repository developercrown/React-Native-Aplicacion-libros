import React, {createContext} from 'react';
const GlobalState = createContext([{}, () => {}]);
export default GlobalState;
