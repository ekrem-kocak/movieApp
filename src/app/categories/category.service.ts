import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from './category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = "https://movieapp-b1366-default-rtdb.firebaseio.com/";
  constructor(private http: HttpClient) { }

  CreateCategory(ctg: Category): Observable<Category> {
    return this.http.post<Category>(this.url + 'categories.json', ctg);
  }

  GetCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories.json').pipe(
      map(ctgs => {
        let categories: Category[] = [];

        for (let key in ctgs) {
          categories.push({ ...ctgs[key], id: key });
        }

        return categories;
      })
    )
  }


}
