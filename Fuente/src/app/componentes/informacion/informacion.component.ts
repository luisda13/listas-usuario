import { Component, OnInit,ViewChild,Input } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import info from '../../../assets/informacion.json';

@Component({
  selector: 'app-informacion',
  templateUrl: './informacion.component.html',
  styleUrls: ['./informacion.component.css']
})
export class InformacionComponent implements OnInit {

  @Input() codUsuario:number;
  
  
  listaInformacion:Array<Usuario> = info;
  listaRelacionados:Array<Usuario>=new Array<Usuario>();
  id:number=-1;
  columnas: string[] = ['codUsuario','idForeanea', 'nombres', 'numeroContacto', 'tipoNumero', 'parentesco', 'aciones'];
  idForeanea:number;  
  nombre:String; 
  numeroContacto:String; 
  tipoNumero:string; 
  parentesco:string; 

  dataSource:any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(){
    
  }

  ngOnInit() {
    
    
    
    setTimeout(() => {
      //this.ngOnInit();
      this.cargardatos();
      this.dataSource = new MatTableDataSource(this.listaRelacionados);  
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;     
    }, 1000);
 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargardatos(){
    this.ngOnInit()
    this.listaRelacionados=new Array<Usuario>();
    for(let i=0;i<this.listaInformacion.length;i++){
      if(this.listaInformacion[i].idForeanea==this.codUsuario){
       // console.log('entro '+this.listaInformacion[i].nombres);
       
        let pelicula =new Usuario(this.listaInformacion[i].codUsuario,
        this.listaInformacion[i].idForeanea, this.listaInformacion[i].nombres, this.listaInformacion[i].numeroContacto,
        this.listaInformacion[i].tipoNumero,this.listaInformacion[i].parentesco);  
        this.listaRelacionados.push (pelicula);
      }
    }
  }

  eliminarInfo(id:number){
    console.log(id+' eliminar info');
    
  }
  modificarInfo(id:number){

    for(let i=0;i<this.listaInformacion.length;i++){

      if(this.listaInformacion[i].idForeanea==id){
        this.nombre=this.listaInformacion[i].nombres;
        this.numeroContacto=this.listaInformacion[i].numeroContacto;
        this.tipoNumero=this.listaInformacion[i].tipoNumero;
        this.parentesco=this.listaInformacion[i].parentesco;
        break;
      }
    }
    this.id=id;
  }

}
export class Usuario {
  constructor(
    public codUsuario:number,
    public idForeanea:number,
    public nombres:string,
    public numeroContacto:string,
    public tipoNumero:string,
    public parentesco:string) { }
}



