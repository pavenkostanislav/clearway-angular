import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
}