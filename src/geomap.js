import { getRhumbLineBearing, getGreatCircleBearing, getDistance} from 'geolib';
import { Vector3, MathUtils, Group } from 'three';
import { location } from './location';
import { cities } from './cities';
import { CityMaker } from './city-marker';
import { FireMarker } from './fire';


export class GeoMap{
  constructor (world, arrow){
    this.world = world;
    this.arrow = arrow;
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
        let marker;
        const cm = new CityMaker(city.city);
        if(city.city === 'Kyiv'){
          const fire = FireMarker.createFireMarker();
          fire.scale.multiplyScalar(1.5),
          marker = new Group();
          marker.add(cm.marker);
          fire.position.set(0, 0.8, -0.1);
          marker.add(fire);
        }
        else {
          
          marker = cm.marker;
        }
       
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
        const radBearing = MathUtils.degToRad(bearing);
        const y = r * Math.cos(radBearing);
        const x = r * Math.sin(-radBearing);

        if(city.city === 'Kyiv'){
          this.arrow.rotation.z = radBearing;
        }
        marker.position.set(x, 0, y);
        marker.lookAt(center);
        this.world.add(marker);

      })
    });
  }

  update(){
    FireMarker.update();
  }




}