import { useMemo } from 'react';
import './App.css';

const isAndroidDevice = (userAgent) => {
  if (!userAgent || userAgent.length === 0) {
    return false;
  }

  const androidRegex = new RegExp("android", "i");
  return androidRegex.test(userAgent);
}

function isIOSDevice(userAgent) {
  const iosRegex = new RegExp("\\biPhone.*Mobile|\\biPod|\\biPad|AppleCoreMedia", "i")
  return iosRegex.test(userAgent)
}

function isIpadDevice(userAgent) {
  const macRegex = new RegExp("Mac", "i");
  return macRegex.test(userAgent) && navigator.maxTouchPoints && navigator.maxTouchPoints > 2;
}

function App() {

  const device = useMemo(() => {
    const userAgent = navigator.userAgent;

    const isAndroid = isAndroidDevice(userAgent);
    const isIOS = isIOSDevice(userAgent);
    const isIpad = isIpadDevice(userAgent);

    return {
      isAndroid: isAndroid,
      isIOS: isIOS || isIpad,
      isIpad: isIpad,
    }
  }, [])

  const isUnknown = !device.isAndroid && !device.isIOS;

  return (
    <div>
      <div>IsAndroid : {device.isAndroid ? "true" : "false"}</div>
      <div>IsIOS : {device.isIOS ? "true" : "false"}</div>
      <div>IsIpad : {device.isIpad ? "true" : "false"}</div>
      <div>Is Unknown : {isUnknown ? "true" : "false"}</div>
      <div>{navigator.userAgent}</div>
    </div>
  )
}

export default App
