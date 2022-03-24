import {Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import usuarios from '../../../assets/usuarios.json';
import { InformacionComponent } from '../informacion/informacion.component';
import { BasedatosService } from 'src/app/servis/basedatos.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})


export class UsuariosComponent implements OnInit {
  id:number=-1;
  isInfo:boolean=false;
  puerta:boolean=false;
  visible:boolean=false;
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


  
  constructor(private dataS: BasedatosService){
    this.dataS.getAllUsuarios().subscribe(data =>this.listaUsuarios=data);
    //this.listaUsuarios=this.dataS.getAllUsuarios();
  }


  ngOnInit() {
   
    setTimeout(() => {

      
      //console.log(this.dataS.getAllUsuarios())
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

  

  eliminarInfo(id:string){
   // this.dataS.deleteUsuario(id).subscribe(data =>console.log("se borro y me llego esto "+data))
   this.dataS.deleteUsuario(id).subscribe(data =>console.log("se borro y me llego esto "+data))
  }

  cargarInfoModificar(id:number){

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

  modificarUsuario(){

  }

crearUsuario(){

}

  prefac(){  
      this.id=-1;
      this.ngOnInit()
  }
 
}