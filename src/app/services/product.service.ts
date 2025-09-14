import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiBaseUrl}/products`;

  constructor(private http: HttpClient) {}

  list(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  get(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(data: { name: string; price: number }, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Price', data.price.toString());

    if (imageFile) {
      formData.append('Image', imageFile);
    }

    return this.http.post<Product>(this.baseUrl, formData);
  }

  update(id: number, data: { name: string; price: number }, imageFile?: File): Observable<Product> {
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Price', data.price.toString());

    if (imageFile) {
      formData.append('Image', imageFile);
    }

    return this.http.put<Product>(`${this.baseUrl}/${id}`, formData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`${this.baseUrl}/${id}/image`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
}
