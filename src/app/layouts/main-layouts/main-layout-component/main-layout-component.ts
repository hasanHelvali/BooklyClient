import { Component } from '@angular/core';
import { HeaderComponent } from '../header-component/header-component';
import { FooterComponent } from '../footer-component/footer-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout-component',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout-component.html',
  styleUrl: './main-layout-component.css',
})
export class MainLayoutComponent {}
