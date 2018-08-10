import { Injectable } from '@angular/core';
declare var google;

@Injectable()
export class MapProvider {
  private map : any;

  constructor() {
  }

  public loadMap(lat : number, long : number) {
    // create a new map by passing HTMLElement
    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let myLatLng = {lat: lat, lng: long};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Bus'
      });
      mapEle.classList.add('show-map');
    });
  }
}
