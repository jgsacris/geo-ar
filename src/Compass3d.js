
import { Subject } from 'rxjs';
let bearing$;
let heading;

const isIOS =
navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
navigator.userAgent.match(/AppleWebKit/);

function init(){
  bearing$ = new Subject();

  if (!isIOS) {
    window.addEventListener("deviceorientationabsolute", _onDeviceOrientation, true);
  }
}


function _onDeviceOrientation (event) {
  if (event.webkitCompassHeading !== undefined) {
      if (event.webkitCompassAccuracy < 50) {
          heading = event.webkitCompassHeading * Math.PI/360;
      } else {
          console.warn('webkitCompassAccuracy is event.webkitCompassAccuracy');
      }
  } else if (event.alpha !== null) {
      if (event.absolute === true || event.absolute === undefined) {
          heading = _computeCompassHeading(event.alpha, event.beta, event.gamma);
      } else {
          console.warn('event.absolute === false');
      }
  } else {
      console.warn('event.alpha === null');
  }
  bearing$.next(heading);
}

function _computeCompassHeading (alpha, beta, gamma) {

  // Convert degrees to radians
  var alphaRad = alpha * (Math.PI / 180);
  var betaRad = beta * (Math.PI / 180);
  var gammaRad = gamma * (Math.PI / 180);

  // Calculate equation components
  var cA = Math.cos(alphaRad);
  var sA = Math.sin(alphaRad);
  var sB = Math.sin(betaRad);
  var cG = Math.cos(gammaRad);
  var sG = Math.sin(gammaRad);

  // Calculate A, B, C rotation components
  var rA = - cA * sG - sA * sB * cG;
  var rB = - sA * sG + cA * sB * cG;

  // Calculate compass heading
  var compassHeading = Math.atan(rA / rB);

  // Convert from half unit circle to whole unit circle
  if (rB < 0) {
      compassHeading += Math.PI;
  } else if (rA < 0) {
      compassHeading += 2 * Math.PI;
  }


 
  // Convert radians to degrees
  //compassHeading *= 180 / Math.PI;

  return compassHeading;
}

function  getBearing$() {
  return bearing$.asObservable();
}

export const Compass3d = {
  init,
  getBearing$
}


