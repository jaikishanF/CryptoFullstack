import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: any;
  cryptoName: string = "";

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  getCryptoData() {
    // Make the API call with the provided cryptocurrency name
    this.apiService.getCryptoData(this.cryptoName).subscribe(result => {
      this.data = result;
    }, error => console.error(error));
  }

  title = 'cryptofullstack.client';
}
