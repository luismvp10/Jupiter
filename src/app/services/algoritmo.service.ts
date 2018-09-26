import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = "/api";

@Injectable({
  providedIn: 'root'
})
export class AlgoritmoService {
  

  constructor(private http: HttpClient) {}

  /* Metodos para PC del Cluster */
  getPCS(): Observable<any>{
    return this.http.get("/api/algoritmos/cluster/all");
  }

  postCluster(cuerpo): any {
    return this.http.post("/api/algoritmos/cluster/", cuerpo);
  }

  testear(ip): Observable<any>{
    /* TODO: Cambiar a ip */
    return this.http.get(ip);
  }

  /* Fin */

  put(algoritmo: any):  Observable<any>   {
    return this.http.put("/api/algoritmos",algoritmo);
  }

  ejecutar(cuerpo): Observable<any>  {
    return this.http.post("/api/algoritmos/ejecutar/", cuerpo);
  }

  ejecutarImplementacion(cuerpo): Observable<any>  {
    return this.http.post("/api/algoritmos/ejecutarImplementacion", cuerpo);
  }

  getByID(id): Observable<any>  {
    return this.http.get('/api/algoritmos/'+id);
  };

  get(): Observable<any> {
    return this
            .http
            .get("/api/algoritmos");

  };

  postCrearDatos(cuerpo){
    console.log(cuerpo);
    return this.http.post("/api/algoritmos/creardatos", cuerpo);
  };

  post(algoritmo){
    return this.http.post("/api/algoritmos", algoritmo);
  };

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  };
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
