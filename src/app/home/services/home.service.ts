import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../../shared/enums/page.enum';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private readonly router: Router
  ) { }

  redirect(path: string) {
    return this.router.navigateByUrl(path);
  }

  changePage(page: Page) {
    const options = {
      [Page.PERSONAS]: () => this.redirect('home/personas'),
      [Page.PUESTOS]: () => this.redirect('home/puestos'),
      [Page.EMPLADOS_PUESTOS]: () => this.redirect('home/empleados-puestos'),
    }
    return options[page] ? options[page]() : null;
  }
}
