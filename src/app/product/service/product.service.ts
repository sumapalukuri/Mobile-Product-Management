import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { addMobilePayload, addMobileResponse, CameraDetailsModel, editMobilePayload, GetProductResponse, MemoryDetails, ProductListModel, RamDetails } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  ramDetails$ = new BehaviorSubject<RamDetails[]>([]);
  ramData = this.ramDetails$.asObservable();

  memoryDetails$ = new BehaviorSubject<MemoryDetails[]>([]);
  memoryData = this.memoryDetails$.asObservable();

  cameraDetails$ = new BehaviorSubject<CameraDetailsModel[]>([]);
  cameraData = this.cameraDetails$.asObservable();

  constructor(private httpClient: HttpClient) { }

  getProductsList(): Observable<ProductListModel> {
    return this.httpClient.get<ProductListModel>(`${this.baseUrl}/getMobiles`, { headers: this.headers })
  }

  getRamDetails(): Observable<RamDetails[]> {
    return this.httpClient.get<RamDetails[]>(`${this.baseUrl}/lookup/ram`, { headers: this.headers }).pipe(map(response => {
      this.ramDetails$.next(response);
      return response
    }))
  }

  getMemoryDetails(): Observable<MemoryDetails[]> {
    return this.httpClient.get<MemoryDetails[]>(`${this.baseUrl}/lookup/memory`, { headers: this.headers }).pipe(map(response => {
      this.memoryDetails$.next(response);
      return response;
    }))
  }

  getCameraDetails(): Observable<CameraDetailsModel[]> {
    return this.httpClient.get<CameraDetailsModel[]>(`${this.baseUrl}/lookup/camera`, { headers: this.headers }).pipe((map(response => {
      this.setCameraDetails(response);
      return response;
    })))
  }
  postProductDetails(payload: addMobilePayload): Observable<addMobileResponse> {
    return this.httpClient.post<addMobileResponse>(`${this.baseUrl}/addMobile`, payload, {headers: this.headers})
  }

  getProductDetails(mobileId: number): Observable<GetProductResponse> {
    return this.httpClient.get<GetProductResponse>(`${this.baseUrl}/getMobile/${mobileId}`);
  }

  setCameraDetails(response: CameraDetailsModel[]): void {
    this.cameraDetails$.next(response);
  }

  editProductDetails(payload: editMobilePayload): Observable<addMobileResponse> {
    return this.httpClient.put<addMobileResponse>(`${this.baseUrl}/editMobile`, payload)
  }

  deleteProduct(productId: number): Observable<addMobileResponse> {
    return this.httpClient.delete<addMobileResponse>(`${this.baseUrl}/deleteMobile/${productId}`);
  }
}
