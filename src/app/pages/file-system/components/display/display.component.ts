import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {IFileList} from "../../../../shared/api/api-file-sistem/api-file-sistem";

@Component({
  selector: 'app-display',
  standalone: true,
    imports: [
        AsyncPipe,
        NgIf
    ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {
  @Input({required: true}) activeFile?: IFileList;
}
