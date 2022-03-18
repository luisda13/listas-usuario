import {Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import usuarios from '../../../assets/usuarios.json';
import {FormControl, Validators} from '@angular/forms';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InformacionComponent } from '../informacion/informacion.component';



@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {
  id:number=-1;
  isInfo:boolean=false;
  puerta:boolean=false;
  listaUsuarios:Array<any> = usuarios;
  columnas: string[] = ['codUsuario', 'identificacion', 'nombres', 'apellidos', 'fechaNacimiento', 'genero', 'aciones'];
  codUsuario:number=-1; 
  identificacion:number; 
  nombre:String; 
  apellido:String; 
  fechaNacimiento:Date; 
  genero:string; 
  dataSource:any;

  @ViewChild(InformacionComponent) hijo: InformacionComponent;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(){
    
  }

  ngOnInit() {

    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.listaUsuarios);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;     
    }, 500);
 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarInfo(id:number){
    this.isInfo=true;
    this.codUsuario=id;
    if(this.puerta){
      this.hijo.cargardatos();
    }
    this.puerta=true;
  }

  

  eliminarInfo(id:number){
    console.log(id+' eliminar info');
  }

  modificarInfo(id:number){

    for(let i=0;i<this.listaUsuarios.length;i++){
      if(this.listaUsuarios[i].codUsuario==id){
        this.nombre=this.listaUsuarios[i].nombres;
        this.apellido=this.listaUsuarios[i].apellidos;
        this.fechaNacimiento=this.listaUsuarios[i].fechaNacimiento;
        this.genero=this.listaUsuarios[i].genero;
        break;
      }
    }   
    this.id=id; 
  }
}