import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario';
import { UsuariosService } from '../services/usuarios.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(public router: Router, public usuarioService: UsuariosService, private route: ActivatedRoute) { }

  ngOnInit() {
  }


  guardar() {
    console.log(this.usuario);

    this.usuarioService.saveUsuario(this.usuario);
    
    alert("Usuario registrado...");
    this.usuario = new Usuario();

}

}

