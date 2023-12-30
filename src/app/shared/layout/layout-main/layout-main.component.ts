import { ChangeDetectionStrategy, Component } from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-layout-main',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './layout-main.component.html',
  styleUrl: './layout-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutMainComponent {

  constructor() {
  }
}
