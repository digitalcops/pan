import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: 'contact-google-map',
  templateUrl: './googleMap.component.html',
  styleUrls: ['./googleMap.component.scss']
})

export class ContactGoogleMap implements OnInit {
  @Input('MapHeight') MapHeight;
  @Input('mapId') mapId;
  @Input('Zoom') Zoom;
  @Input('streetView') streetView;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions;
  constructor() {

  }
  ngOnInit() {
    this.options = {
      mapTypeId: this.mapId,
      zoomControl: true,
      zoom: this.Zoom,
      streetViewControl: this.streetView,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      disableDoubleClickZoom: false,
    }
    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    })
  }
}
