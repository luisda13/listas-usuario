import {Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import usuarios from '../../../assets/usuarios.json';
import { InformacionComponent, Informacion } from '../informacion/informacion.component';
import { BasedatosService } from 'src/app/servis/basedatos.service';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Usuario } from '../../model/Usuario.interface';


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
  columnas: string[] = ['identificacion', 'nombres', 'apellidos', 'fechaNacimiento', 'genero', 'aciones'];
  codUsuario:number=-1; 
  identificacion:number; 
  nombre:String; 
  apellido:String; 
  fechaNacimiento:Date =new Date(); 
  genero:string; 
  dataSource:any;
  pipe = new DatePipe('en-US');
  fechaString:String;

  @ViewChild(InformacionComponent) hijo: InformacionComponent;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  form;
  formEdit;
  constructor(private dataS: BasedatosService,private formBuilder: FormBuilder){
    //this.dataS.getAllUsuarios().subscribe(data =>this.listaUsuarios=data);
    
    this.form = formBuilder.group({
      identificacion: [''],
      nombre: [''],
      apellido: [''],
      fechaNacimiento: [''],
      genero: [''],
 
    });
    this.formEdit = formBuilder.group({
      identificacionM: [''],
      nombreM: [''],
      apellidoM: [''],
      fechaNacimientoM: [''],
      generoM: [''],
 
    });
  }


  ngOnInit() {
   
    setTimeout(() => {
    
      this.dataSource = new MatTableDataSource(this.listaUsuarios);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;     
    }, 500);
 
  }

 submit():string {
    if (this.form.valid) {
      return this.pipe.transform(this.form.value.fechaNacimiento, 'dd/MM/yyyy')+"";
    }
    else{
      alert("FILL ALL FIELDS")
      return "";
    }
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
   this.dataS.deleteUsuario(id).subscribe(data =>console.log("se borro y me llego esto "+data));
  }

  cargarInfoModificar(id:number){

    for(let i=0;i<this.listaUsuarios.length;i++){
      if(this.listaUsuarios[i].codUsuario==id){

        this.nombre=this.listaUsuarios[i].nombres;
        this.apellido=this.listaUsuarios[i].apellidos;
        this.fechaNacimiento=this.listaUsuarios[i].fechaNacimiento;
        this.genero=this.listaUsuarios[i].genero;
        this.identificacion=this.listaUsuarios[i].identificacion;

        this.formEdit.value.nombreM=this.listaUsuarios[i].nombres;
        this.formEdit.value.apellidoM=this.listaUsuarios[i].apellidos;
        this.formEdit.value.fechaNacimientoM=this.listaUsuarios[i].fechaNacimiento;
        this.formEdit.value.generoM=this.listaUsuarios[i].genero;
        this.formEdit.value.identificacionM=this.listaUsuarios[i].identificacion;
        break;
      }
    }   
    this.id=id; 
  }

  modificarUsuario(){
    const usuario:Usuario=new modeloUsuairo();
    usuario.identificacion=this.formEdit.value.identificacionM;
    usuario.nombres=this.formEdit.value.nombreM;
    usuario.apellidos=this.formEdit.value.apellidoM;
    usuario.fechaNacimiento=this.formEdit.value.fechaNacimientoM;
    usuario.genero=this.formEdit.value.generoM;

    this.dataS.updateUsuario(usuario,this.id).subscribe(data =>console.log("esto pasa cuando se actualizo"+data));;
  }

crearUsuario(){

  const usuario:Usuario=new modeloUsuairo();
  usuario.identificacion=+this.form.value.identificacion;
  usuario.nombres=this.form.value.nombre;
  usuario.apellidos=this.form.value.apellido;
  const fecha=new Date(this.form.value.fechaNacimiento);
  usuario.fechaNacimiento=fecha.toISOString().split('T')[0];

  if(this.form.value.genero==="Masculino"){
    usuario.genero=0;
  }else{
    usuario.genero=1;
  }
  this.dataS.createUsuario(usuario).subscribe(data =>console.log("esto pasa cuando se agrega"+data));

}

  prefac(){  
      this.id=-1;
      this.ngOnInit()
  }

}
class modeloUsuairo implements Usuario {
  identificacion:number=0;  
  nombres:string="";
  apellidos:string="";
  fechaNacimiento: String= ""; 
  genero:number=-1;
}
