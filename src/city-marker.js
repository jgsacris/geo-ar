
import { Group, TextureLoader, SpriteMaterial, Sprite } from 'three';
import { Text } from 'troika-three-text';


export class CityMaker {

  constructor (name){
    
    this._marker = new Group();
    this.createSprite();
    this.createCityName(name);
  }

  get marker(){
    return this._marker;
  }

  createSprite(){
    const map = new TextureLoader().load('assets/map-marker-blue.png');
    const material = new SpriteMaterial({map, transparent: true});
    const sprite = new Sprite(material);
    this._marker.add(sprite);

  }

  createCityName(name){
    const cityName = new Text();
    cityName.text = name;
    cityName.fontSize = 0.4;
    cityName.color = 0xffffff;
    cityName.anchorX = 'center';
    cityName.anchorY = 'bottom-baseline';
    cityName.position.set(0, 1, 0);
    this._marker.add(cityName)
  }

  createCityDistance(distance){
    const distanceTxt = new Text();
    distanceTxt.text = Math.round(distance/1000) + ' km';
    distanceTxt.fontSize = 0.2;
    distanceTxt.color = 0xffffff;
    distanceTxt.anchorX = 'center';
    distanceTxt.anchorY = 'bottom-baseline';
    distanceTxt.position.set(0, 0.6, 0);
    this._marker.add(distanceTxt);

  }



}