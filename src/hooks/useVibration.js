import { Vibration } from 'react-native';

export const useVibration = () => {

    const patterns = {
        tap: [35, 20],
        doubleTap: [100, 75, 100, 75],
        success: [100, 35, 100, 150],
        error: [100, 75, 100, 75, 100, 75]
    }

    const vibrateFunction = (dataPattern) => Vibration.vibrate(dataPattern);
    const vibrateTap = () => vibrateFunction(patterns.tap);
    const vibrateDoubleTap = () => vibrateFunction(patterns.doubleTap);
    const vibrateSuccess = () => vibrateFunction(patterns.success);
    const vibrateError = () => vibrateFunction(patterns.error);

    const vibrate  = (type = null) => {
        switch (type) {
            case 'tap':
                vibrateTap();
                break;
            case 'doubletap':
                vibrateDoubleTap();
                break;
            case 'success':
                vibrateSuccess();
                break;
            case 'error':
                vibrateError();
                break;
            default:
                vibrateFunction();
                break;
        }
    }

    return {vibrate, vibrateTap, vibrateDoubleTap, vibrateSuccess, vibrateError};
}

export default useVibration;
