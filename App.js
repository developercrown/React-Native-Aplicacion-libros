import React, {useEffect, useState} from 'react';
import SplashScreen from 'react-native-splash-screen';
import ConfigApp from './src/views/ConfigApp/ConfigApp';
import LoadingView from './src/views/LoadingView';
import GlobalState from './src/contexts/GlobalStateContext';
import MainApp from './src/views/MainApp';

const App = () => {
  const [appState, setAppState] = useState({});
  const [phase, setPhase] = useState(0);
  //Phases:
  //    0: inicial loading
  //    1: pantalla de configuracion
  //    2: pantalla de principal

  const callbackFunction = (newPhase) => {
    if(phase == 0 && newPhase == 2){
      setPhase(3);
      setTimeout(()=>{
        setPhase(newPhase);
      }, 500);
    } else {
      setPhase(newPhase);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
  });

  switch (phase) {
    case 0: //Pantalla de carga de la app
      return (
        <GlobalState.Provider value={[appState, setAppState]}>
          <LoadingView callbackFunction={callbackFunction} />
        </GlobalState.Provider>
      );
    case 1: // Pantalla de configuración
      return <ConfigApp handleCallback={callbackFunction} />;
    case 2: // Pantalla principal
      return (
        <GlobalState.Provider value={[appState, setAppState]}>
          <MainApp />
        </GlobalState.Provider>
      );
    case 3: //Pantalla inicialización
      return <LoadingView callbackFunction={callbackFunction} onlyView={true} label="Iniciando"/>;
  }
};

export default App;
