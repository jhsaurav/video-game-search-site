import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environment';
import { APIResponse, Game } from '../models';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getGameList(
    ordering: string,
    search?: string
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    // const gameTrailersRequest = this.http.get(
    //   `${env.BASE_URL}/games/${id}/movies`
    // );
    const gameScreenshotsRequest = this.http
    .get(`${env.BASE_URL}/games/${id}/screenshots`)
    .pipe(
      catchError((err) => {
        console.log("Screenshot API failed, returning empty array", err);
        return of({ results: [] });  
      })
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      // gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results ||[],
          trailers:[],
          // trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }
}
