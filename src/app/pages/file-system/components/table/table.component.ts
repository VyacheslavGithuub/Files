import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {IFileList} from "../../../../shared/api/api-file-sistem/api-file-sistem";

@Component({
  selector: 'app-table',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
  @Input({required: true}) activeFile!: IFileList;

}
