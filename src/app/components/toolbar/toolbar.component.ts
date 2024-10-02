import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTreeModule} from '@angular/material/tree';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule, 
    MatButtonModule,
    MatMenuModule,
    MatTreeModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})

export class ToolbarComponent {
  constructor(private router: Router) {} 

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
