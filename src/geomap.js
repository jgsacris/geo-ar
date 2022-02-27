import { getRhumbLineBearing, getGreatCircleBearing, getDistance} from 'geolib';
import { Vector3, MathUtils } from 'three';
import { location } from './location';
import { cities } from './cities';
import { CityMaker } from './city-marker';


export class GeoMap{
  constructor (world){
    this.world = world;
    this.createCities();

  }

  createCities(){
    const r = 10;
    location.init((localPosition) => {
      console.log('position', localPosition);
      const center = new Vector3(0,0,0);
      const coords = localPosition.coords;
      this.cityMarkers = cities.map(city => {
        console.log('city', city);
        const cm = new CityMaker(city.city);
        const bearing =  getGreatCircleBearing(
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: city.latitude, longitude: city.longitude }
          );

        const distance = getDistance(  
          { latitude: coords.latitude, longitude: coords.longitude },
          { latitude: city.latitude, longitude: city.longitude }
        );

        cm.createCityDistance(distance);

        console.log('bearing for '+city.city, bearing);
        const radBearing = MathUtils.degToRad(bearing) + Math.PI;
        const y = r * Math.cos(radBearing);
        const x = r * Math.sin(-radBearing);
        const marker = cm.marker;
        marker.position.set(x, 0, y);
        marker.lookAt(center);
        this.world.add(marker);

      })
    });
  }




}