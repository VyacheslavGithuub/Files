import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgForOf, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {UiExpandComponent} from "../../../../shared/UI/ui-expand/ui-expand.component";
import {IFileList} from "../../../../shared/api/api-file-sistem/api-file-sistem";
import {MarkerPipe} from "../../../../shared/helpers/pipe/marker.pipe";

@Component({
  selector: 'app-file-structure',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLinkActive,
    UiExpandComponent,
    RouterLink,
    NgTemplateOutlet,
    MarkerPipe,
    NgStyle,

  ],
  templateUrl: './file-structure.component.html',
  styleUrl: './file-structure.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileStructureComponent {
  @Input({required: true}) fileList!:IFileList;
  @Input() path: string = '';
  @Input() searchActivated = false;
  @Input() substring?: string = '';
}
