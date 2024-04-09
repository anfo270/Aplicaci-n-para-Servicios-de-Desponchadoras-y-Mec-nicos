import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  { path: '', redirectTo: 'splash', pathMatch: 'full' },
  { path: 'splash', component: SplashScreenComponent },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro-login',
    loadChildren: () => import('./registro-login/registro-login.module').then(m => m.RegistroLoginPageModule)
  },
  {
    path: 'negocio',
    loadChildren: () => import('./negocio/negocio.module').then(m => m.NegocioPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//import { NgModule } from '@angular/core';
//import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

//const routes: Routes = [
//  {
//    path: '',
//    redirectTo: 'login',
//    pathMatch: 'full'
//  },
//  {
//    path: 'login',
//    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
//  },
//  {
//    path: 'registro-login',
//    loadChildren: () => import('./registro-login/registro-login.module').then(m => m.RegistroLoginPageModule)
//  },
//  {
//    path: 'negocio',
//    loadChildren: () => import('./negocio/negocio.module').then(m => m.NegocioPageModule)
//  },
//  {
//    path: 'productos',
//    loadChildren: () => import('./productos/productos.module').then(m => m.ProductosPageModule)
//  },

//];

//@NgModule({
//  imports: [
//    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
//  ],
//  exports: [RouterModule]
//})
//export class AppRoutingModule { }
