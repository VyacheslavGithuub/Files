import { Routes } from '@angular/router';
import {FileSystemComponent} from "./pages/file-system/file-system.component";

export const routes: Routes = [
  {
    path: '**',
    component: FileSystemComponent,
    children:[{
      path: '**/:search',
      component: FileSystemComponent
    }]
  },
];
