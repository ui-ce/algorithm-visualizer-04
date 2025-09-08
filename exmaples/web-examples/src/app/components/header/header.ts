import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'algo-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  public constructor(private readonly _router: Router) {}

  protected onHeaderClicked(): void {
    this._router.navigateByUrl(`/home`);
  }
}
