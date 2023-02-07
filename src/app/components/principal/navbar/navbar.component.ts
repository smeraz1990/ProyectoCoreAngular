import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { menu } from 'src/app/interfaces/menu';
import { LoginService } from 'src/app/services/login.service'
import { AppState } from 'src/app/models/app-state.model'
import { authenticatedUserSelector } from '../../login/store/auth.selectors'
import { User } from 'src/app/models/user2.model'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  @Output() toggleSidebar = new EventEmitter()
  usuariolog = ""
  menu: menu[] = []
  public user: Observable<User | null>;
  constructor(private _menuService: MenuService,
    public readonly authService: LoginService,
    private readonly store: Store<AppState>){
      this.user = this.store.select(authenticatedUserSelector)
  }

  ngOnInit(): void{
    this.usuariolog =  String(localStorage.getItem('bitadmin'))
    this.cargarmenu()
  }

  ngOnDestroy(): void {}



  cargarmenu()
  {
    let bitadmin = localStorage.getItem('bitadmin')
    this._menuService.getMenu().subscribe(data => {
      if (bitadmin == "1")
      {
        this.menu = data
      }
      else
      {
        this.menu = data.filter(menufilt => menufilt.bitadmin == "0")
      }
      
    })
  }

}
