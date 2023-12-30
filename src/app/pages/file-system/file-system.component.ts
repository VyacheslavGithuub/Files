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
    NgIf
  ],
  templateUrl: './file-system.component.html',
  styleUrl: './file-system.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileSystemComponent implements OnInit, OnDestroy {
  public pageStatus$ = this.fileSystemService.pageStatus$;
  public fileList$ = this.fileSystemService.fileList$;
  public searchActivated = false;
  public activeFile?:IFileList;
  public substring = ''

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
          this.activeFile = this.fileSystemService.getFileDescription(res)
        }
      })
      this._subActivatedRouteParam$ = this._activatedRoute.queryParams
        .subscribe(params => {
              this.substring = params.search
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
