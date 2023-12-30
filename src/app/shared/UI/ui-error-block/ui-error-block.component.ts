import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'ui-error-block',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './ui-error-block.component.html',
  styleUrl: './ui-error-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiErrorBlockComponent {
  @Input({required:true}) status?: string;
}
