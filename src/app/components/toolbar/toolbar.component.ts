import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {}
