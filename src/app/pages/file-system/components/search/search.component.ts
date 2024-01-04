import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input() inputValue: string = ''
  @Output() inputMethod: EventEmitter<string> = new EventEmitter()
}
