import { Injectable } from '@angular/core';
import {ApiFileSistemService} from "../../shared/api/api-file-sistem/api-file-sistem.service";
import {BehaviorSubject, Subject, take, tap} from "rxjs";
import {IFileList} from "../../shared/api/api-file-sistem/api-file-sistem";
import {Router, UrlSegment} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  public fileList$ = new BehaviorSubject<IFileList[]>([])
  private _fileListBase: IFileList[] = []

  public pageStatus$ = new BehaviorSubject(false)
  public isError?:string;

  constructor(
    private _router: Router,
    private _apiFileSistemService: ApiFileSistemService
  ) {}

  public getFileList(){
    this._apiFileSistemService
      .getFileList()
      .pipe(
        take(1)
      )
      .subscribe({
      next: (res) => {
        this._fileListBase = res
        this.fileList$.next(res)
        this.pageStatus$.next(true)
      },
      error: (err) => {
        this.pageStatus$.next(false)
        this.isError = err.status;
      }
    })
  }

  // Сетаем value поисковика в параметр search
  setQueryParamSearch(value: string): Promise<boolean> {
    return this._router.navigate(
      [],
      {
        queryParams: {search: value.length ? value : null},
      }
    )
  }

  // Получаем массив активных файлов
  getFileDescription(urlSegments: UrlSegment[]):IFileList[]{
    const activeFile = new Array<IFileList>();
    const arrUrlPath:string[] = [];

    for (const urlItem of urlSegments) {
      arrUrlPath.push(urlItem.path)
    }

    this._fileListBase.forEach((file, index) => {
      if (file.title === arrUrlPath[0]){
        this.searchFile(file,1, activeFile, arrUrlPath)
      }
    })
    if (!activeFile.length){
      return [{
        type: 'Файл не найден',
        title: 'Нет названия',
        description: 'Нет описания'
      }]
    }
    return activeFile
  }
  // Вспомогательный метод который формирует новый массив активыных файлов
  searchFile (file: IFileList, index: number, activeFile: IFileList[], arrUrlPath: string[]): void {
    activeFile.push(file)
    if (file.children){
      for (const fileElement of file.children) {
        if (fileElement.title === arrUrlPath[index]){
          this.searchFile(fileElement, index + 1, activeFile, arrUrlPath)
        }
      }
    }
  }

  // Метод с которого начинаем поиск файлов
  public findFileList(title: string | undefined){
    if (title){
      const regex = new RegExp(title, 'gi')
      return this.fileList$.next(this.checkArray(this._fileListBase, regex))
    }else {
       return this.fileList$.next(this._fileListBase)
    }
  }
  // Возвращаем полностью отсортированную структуру
  checkArray(data: IFileList[], regex: RegExp){
    let arr:IFileList[] = []
    for (const item of data) {
      arr.push(this.filterObjectByRegex(item, regex))
    }
    return this.checkForEmptiness(arr);
  }

  // Вспомогательный метод, который формирует, массив не пустых объектов
  // И если все проверенные массивы пусты возвращает статичный ответ
  checkForEmptiness(object: IFileList[]){
    const newArr = new Array<IFileList>();

    for (const item of object) {
      if (Object.keys(item).length > 0){
        newArr.push(item);
      }
    }

    if (!newArr.length){
      const errObject:IFileList = {
        type: 'file',
        title: 'Файл или папка не найдены',
        description: ''
      }
      newArr.push(errObject)
    }
    return  newArr;
  }

  // фильтровать объект по регулярному выражению
  filterObjectByRegex(object: IFileList, regex: RegExp){
    let newItem = {} as IFileList;

    const filterObject = (itemList: IFileList, newObject: IFileList) => {
      // Есть ли внутри сходства
      if (this.deepIncludes(itemList, regex)){
        // Проверяем дату на пустоту
        if(itemList.children){
          // Проверяем каждый вложенный элемент на сходства
          itemList.children.forEach((item, index) => {
            if (this.deepIncludes(item, regex)){
              // И пополняем новй объект
              newObject.children && newObject.children.push({...item, children: []})
            }
          })
          // Вызваем filterObject для всех оставшихся объектов
          itemList.children.forEach((item, index) => {
            newObject.children && filterObject(item, newObject.children[0])
          })
        }else {
          return;
        }
      }
    }

    if (this.deepIncludes(object,regex)){
      newItem = {...object, children: []}
      filterObject(object, newItem)
    }
    return newItem
  }

  // Данная функция нужна, для проверки значения внутри объекта
  deepIncludes(activeItem: IFileList, regex: RegExp){
    // Если title текущего объекта совпадает
    if (activeItem.title.match(regex)) {
      return true
    }else if (activeItem.children){
      for (const i of activeItem.children) {
        // Если во вложенном includes будут совпадения возвращаем true
        if (this.deepIncludes(i, regex)) return true
      }
    }
    // Если ни в одном вложенном объекте не будет совпадения
    return false
  }
}
