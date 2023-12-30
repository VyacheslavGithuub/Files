import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IFileList} from "./api-file-sistem";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ApiFileSistemService {
  constructor(private _httpClient: HttpClient) {}

  urlFiles = `${environment.baseUrl}/fileList`;

  getFileList():Observable<IFileList[]>{
    return this._httpClient.get<IFileList[]>(this.urlFiles)
  }
}

