import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: User;
  constructor(
    private LocalStorageService: LocalStorageService,
  ) { this.LocalStorageService.hasItem() }
  ngOnInit() {
    this.usuario = this.LocalStorageService.getItem('user');
  }

  cerrar() {
    this.LocalStorageService.clear();
  }
}
