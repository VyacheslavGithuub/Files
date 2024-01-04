import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  @Input({required: true}) activePath: string[] = [''];

  public sliceUrl(arr: string[], index: number): string {
    return '/' + arr.slice(0, index + 1).join('/')
  }

  public trackByFn(){

  }
}
