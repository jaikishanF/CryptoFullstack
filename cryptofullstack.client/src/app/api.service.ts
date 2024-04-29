import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private baseUrl = 'https://localhost:7060/api/Crypto';
  constructor(private http: HttpClient) { }

  getCryptoData(cryptoName: string): Observable<any> {
    // Use template literals to include the cryptoName parameter in the URL
    const url = `${this.baseUrl}/details/${cryptoName}`;
    return this.http.get(url);
  }
}
