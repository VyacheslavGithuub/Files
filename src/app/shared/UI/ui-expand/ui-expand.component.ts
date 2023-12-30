import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";

@Component({
  selector: 'ui-expand',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './ui-expand.component.html',
  styleUrl: './ui-expand.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UiExpandComponent {
  @Input() disabled = false;
  @Input() expand = false;
  toggle() {
    if (!this.disabled) this.expand = !this.expand;
  }
}
