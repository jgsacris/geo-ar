
 import { BehaviorSubject} from 'rxjs';

 let localPosition$;
 
 function onError (err) {
  console.warn('ERROR(' + err.code + '): ' + err.message)

  if (err.code === 1) {
      // User denied GeoLocation, let them know that
      alert('Please activate Geolocation and refresh the page. If it is already active, please check permissions for this website.');
      return;
  }

  if (err.code === 3) {
      alert('Cannot retrieve GPS position. Signal is absent.');
      return;
  }

  if ('geolocation' in navigator === false) {
    onError({ code: 0, message: 'Geolocation is not supported by your browser' });
    return Promise.resolve();
  }
  if(localPosition$.complete());
}

function onLocationReceived(position){
  localPosition$.next(position);
}

function getLocalPosition$(){
  return localPosition$.asObservable();
}

function initGPSWatch(){

  localPosition$ = new BehaviorSubject({coords:{latitude: 0, longitude: 0}});
  // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition
  return navigator.geolocation.watchPosition(onLocationReceived, onError, {
      enableHighAccuracy: true,
      maximumAge: this.data.gpsTimeInterval,
      timeout: 27000,
  });

}

export const location = {
  initGPSWatch,
  getLocalPosition$
}