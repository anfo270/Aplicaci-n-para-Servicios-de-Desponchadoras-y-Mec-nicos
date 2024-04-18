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

<<<<<<< HEAD
  constructor(
    private LocalStorageService: LocalStorageService,
  ) { this.LocalStorageService.hasItem() }
=======
  constructor(private localStorageService: LocalStorageService) { }
>>>>>>> 1d4eb8aaa5f70243174c5a5bc7e8636560455572

  ngOnInit() {
    this.usuario = this.localStorageService.getItem('user');
  }

  cerrar() {
    this.localStorageService.clear();
  }
}
