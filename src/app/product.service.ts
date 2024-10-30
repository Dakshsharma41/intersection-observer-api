import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl=`https://api.escuelajs.co/api/v1/products`
  
  constructor(private http: HttpClient) { }

  getProducts(offset: number, limit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?offset=${offset}&limit=${limit}`);
  }
  getTotalProducts(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}?limit=1`); 
}
}
