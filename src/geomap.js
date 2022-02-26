import { location } from './location';
import { cities } from './cities';
import { CityMaker } from './city-marker';

export class GeoMap{
  constructor (world){
    this.world = world;
    this.createCities();

  }

  createCities(){
    //this.cityMarkers = cities.map( city =>new CityMaker(city.name));
    const city = new CityMaker('Vienna');
    const cMarker = city.marker;
    cMarker.position.set(0, 0, -10);
    this.world.add(cMarker);
  }




}