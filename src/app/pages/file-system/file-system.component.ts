import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {LayoutMainComponent} from "../../shared/layout/layout-main/layout-main.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, RouterOutlet} from "@angular/router";
import {DisplayComponent} from "./components/display/display.component";
import {Subscription} from "rxjs";
import {FileSystemService} from "./file-system.service";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FileStructureComponent} from "./components/file-structure/file-structure.component";
import {UiErrorBlockComponent} from "../../shared/UI/ui-error-block/ui-error-block.component";
import {IFileList} from "../../shared/api/api-file-sistem/api-file-sistem";
import {SearchComponent} from "./components/search/search.component";
import {NavigationComponent} from "./components/navigation/navigation.component";
import {TableComponent} from "./components/table/table.component";

@Component({
  selector: 'app-file-system',
  standalone: true,
  imports: [
    FormsModule,
    LayoutMainComponent,
    FileStructureComponent,
    ReactiveFormsModule,
    RouterOutlet,
    DisplayComponent,
    AsyncPipe,
    FileStructureComponent,
    NgForOf,
    FileStructureComponent,
    NgOptimizedImage,
    UiErrorBlockComponent,
    NgIf,
    SearchComponent,
    NavigationComponent,
    TableComponent
  ],
  templateUrl: './file-system.component.html',
  styleUrl: './file-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSystemComponent implements OnInit, OnDestroy {
  public pageStatus$ = this.fileSystemService.pageStatus$;
  public fileList$ = this.fileSystemService.fileList$;
  public searchActivated = false;
  public activeFile!:IFileList;
  public activePath!: string[];
  public baseSearchParams = ''

  private _subActivatedRouteParam$?: Subscription;
  private _subActivatedRouteUrl$?: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public fileSystemService: FileSystemService,
  ) {}
  ngOnInit() {
    this.fileSystemService.getFileList();
    setTimeout(()=>{
      this._subActivatedRouteUrl$ = this._activatedRoute.url.subscribe((res) => {
        if (res.length){
          this.searchActivated = true;
          const getFile = this.fileSystemService.getFileDescription(res);
          this.activeFile = getFile[getFile.length - 1]
          this.activePath = getFile.map(value => value.title);
        }
      })
      this._subActivatedRouteParam$ = this._activatedRoute.queryParams
        .subscribe(params => {
              this.baseSearchParams = params.search
              this.fileSystemService.findFileList(params.search);
              this.searchActivated = true;
          }
        );
    },100)
  }
  ngOnDestroy() {
    this._subActivatedRouteParam$?.unsubscribe()
    this._subActivatedRouteUrl$?.unsubscribe()
  }
  setQueryParamSearch(value: string){
    this.fileSystemService.setQueryParamSearch(value)
  }
}
