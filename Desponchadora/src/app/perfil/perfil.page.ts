import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/localstorage.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private LocalStorageService: LocalStorageService,
  ) { this.LocalStorageService.hasItem() }

  ngOnInit() {
  }
  cerrar() {
    this.LocalStorageService.clear();
  }
}
