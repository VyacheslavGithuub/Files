import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {IFileList} from "../../../../shared/api/api-file-sistem/api-file-sistem";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent {
  @Input({required: true}) activeFile!: IFileList;
  @Input({required: true}) activePath!: string[];

  public sliceUrl(arr: string[], index: number): string {
    return '/' + arr.slice(0, index + 1).join('/')
  }
}
