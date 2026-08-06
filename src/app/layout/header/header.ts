import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Nav } from '../nav/nav';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly title = 'Padaria';
}
