import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { Finca } from 'src/app/Core/modelo/finca';
import { Plantacion } from 'src/app/Core/modelo/plantacion';
import { PlantacionService } from 'src/app/service/plantacion.service';
import { LaborSuelo } from 'src/app/Core/modelo/labor-suelo';
import { FechaDesdeHastaService } from 'src/app/service/fecha-desde-hasta-service';

import { Usuario } from 'src/app/Core/modelo/usuario';
import { FincaService } from 'src/app/service/finca.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Table } from 'primeng/table';
import Swal from 'sweetalert2';
import { LaborSueloService } from 'src/app/service/labor-suelo.service';
import { AplicacionAgroquimico } from 'src/app/Core/modelo/aplicacion-agroquimico';
import { AplicacionAgroquimicoService } from 'src/app/service/aplicacion-agroquimico.service';
import { AsesoriaAgroquimico } from 'src/app/Core/modelo/asesoria-agroquimico';
import { AsesoriaAgroquimicoService } from 'src/app/service/asesoria-agroquimico.service';
import { Riego } from 'src/app/Core/modelo/riego';
import { RiegoService } from 'src/app/service/riego.service';
import { AsesoriaRiego } from 'src/app/Core/modelo/asesoria-riego';
import { AsesoriaRiegoService } from 'src/app/service/asesoria-riego.service';

@Component({
  selector: 'app-cuaderno-digi',
  templateUrl: './cuaderno-digi.component.html',
  styleUrls: ['./cuaderno-digi.component.css']
})
export class CuadernoDigiComponent implements OnInit{

  home : MenuItem = {}
  items : MenuItem[] = [];
  usuarios: Usuario[]=[];
  loading : boolean = true;
  nombreUsuario : string = '';
  idFinca:number;
  fincas: Finca[];
  finca: Finca | any;
  subTituloTabla: string ='';
  listadoPlantacion: Plantacion[];
  listadoLabor: LaborSuelo[];
  laborFiltrada:LaborSuelo[];
  listadoAplicacionAgro: AplicacionAgroquimico[];
  aplicacionAgroFiltrado:AplicacionAgroquimico[];
  listadoAsesoria: AsesoriaAgroquimico[];
  asesoriaFiltrados:AsesoriaAgroquimico[]; 
  listadoRiego: Riego[];
  riegoFiltrado:Riego[];
  listadoAsesoriaRiego: AsesoriaRiego[];
  asesoriaRiegoFiltrados:AsesoriaRiego[];
  rangoFechas : Date[] = [new Date(), new Date()];

  //optengo fecha y hora actual del sistema
  fechaHoy: Date = new Date();
 
  

  constructor(
   
    private usuarioPorRol: UsuarioService,
    private fincaService: FincaService,
    private plantacionServi:PlantacionService,
    private laborService:LaborSueloService,
    private aplicacioonService:AplicacionAgroquimicoService,
    private asesoriaAgroService:AsesoriaAgroquimicoService,
    private riegoService: RiegoService,
    private asesoriaRiegoService:AsesoriaRiegoService,
    private fechaDesdeHastaService : FechaDesdeHastaService,

    
    
  ) { }
  ngOnInit(): void {
    this.cargarItems();
    this.cargarUsuarioProductor();
    this.listarFincasPorNombreProductor();
  }
  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Reportes'},
      {label: 'Cuaderno digital', disabled:true}
    ];
  }

  
  cargarUsuarioProductor():void{
    this.usuarioPorRol.listarUsuarioPorRol("ROLE_PRODUCTOR").toPromise().then(
      data => {
        this.usuarios=data;
        this.loading=false;
      },
      err => {
        console.log(err);
      }

    );
  }

  
  listarFincasPorNombreProductor():void{
    const productor = document.querySelector('#nombreProductor') as HTMLSelectElement;
    productor.addEventListener('click', event =>{
      event.preventDefault();
      this.fincaService.listarFincaPorUsuario(this.nombreUsuario).subscribe(
        data =>{
          this.fincas=data;
          this.loading = false;
        },
        err =>{
          console.log(err);
        }
      )

    })
  }

 

 
  generarCuaderno(id: number): void{
    const fechas : Date[] = this.fechaDesdeHastaService.getFechaDesdeHasta(this.rangoFechas[0], this.rangoFechas[1]);

    const fechaDesde : Date = fechas[0];
    const fechaHasta : Date = fechas[1];
   
      this.plantacionServi.listarPlantacionPorFinca(id).subscribe(
        data =>{     
          this.listadoPlantacion = data.filter(plan => new Date(plan.fechaCreacionPlantacion) >= fechaDesde && new Date(plan.fechaCreacionPlantacion) <= fechaHasta);
          this.loading = false;
        
        },
        err =>{

          console.log(err);
        }
        
      )


      this,this.laborService.listarLaborSueloPorFinca(id).subscribe(
        data =>{
         
          this.listadoLabor = data.filter(labor => new Date(labor.fechaLabor) >= fechaDesde && new Date(labor.fechaLabor) <= fechaHasta);
          this.loading = false;
        
        },
        err =>{
          console.log(err);
        }
        
      )

      this.aplicacioonService.listarAplicacionAgroPorFinca(id).subscribe(
        data =>{
          this.listadoAplicacionAgro = data.filter(apliAgro => new Date(apliAgro.fechaDeAplicacion) >= fechaDesde && new Date(apliAgro.fechaDeAplicacion) <= fechaHasta);
          this.loading = false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.asesoriaAgroService.listarAsesoriaPorFinca(id).subscribe(
        data =>{
          this.listadoAsesoria = data.filter(aseAgo => new Date(aseAgo.fechaAsesoriaAgroquimico) >= fechaDesde && new Date(aseAgo.fechaAsesoriaAgroquimico) <= fechaHasta);
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.riegoService.listarRiegoPorFinca(id).subscribe(
        data =>{
          this.listadoRiego = data.filter(riego => new Date(riego.fechaRiego) >= fechaDesde && new Date(riego.fechaRiego) <= fechaHasta);
          this.loading=false;
        },
        err =>{
          console.log(err);
        }
        
      )

      this.asesoriaRiegoService.listarAsesoriaPorFinca(id).subscribe(
        data =>{
          this.listadoAsesoriaRiego = data.filter(aseRiego => new Date(aseRiego.fechaAsesoriaRiego) >= fechaDesde && new Date(aseRiego.fechaAsesoriaRiego) <= fechaHasta);
          this.loading=false;
        },
        err =>{
          Swal.fire('Error, fecha de campaña incorrecta', err.error.message, 'error')
        }
        
      )

     
      this.fincaService.datalle(id).subscribe(
        
        data =>{
          this.finca=data;
  
        }, 
         err => {
          Swal.fire('Error', err.error.mensaje, 'error');
         
        }
      
      )
      console.log(this.finca); 
      
      
     
   
  } 


 

  getSeverityByEstado(asesoria : AsesoriaAgroquimico): string {
    const serverityByEstado : {[key: string]: string} = {
      true : 'success',
      false: 'danger'
    };
    return serverityByEstado[`${asesoria.asesoriaAplicada}`];
  }


  clear(table : Table) {
    table.clear();
  }



  obtenerPlantacionFiltrados(table: Table): void {
    this.laborFiltrada = table.filteredValue != null ? table.filteredValue : this.listadoLabor;
  }

  obtenerFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerapliAgroquimicosFiltrados(table: Table): void {
    this.aplicacionAgroFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoAplicacionAgro;
  }

  obtenerFiltrosApliAgro(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerAsesoriaAgroFiltradas(table: Table): void {
    this.asesoriaFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoria;
  }

  obtenerFiltrosAsesoriaAgro(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }


  obtenerRiegoFiltrados(table: Table): void {
    this.riegoFiltrado = table.filteredValue != null ? table.filteredValue : this.listadoRiego;
  }

  obtenerRiegoFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerAsesoriaFiltradas(table: Table): void {
    this.asesoriaRiegoFiltrados = table.filteredValue != null ? table.filteredValue : this.listadoAsesoriaRiego;
  }

  obtenerAsesoriaRiegoFiltros(table: Table): void {
    let filtros : any = [];
    filtros =  table.filters
    filtros.id.forEach((f: { "value": any, "matchMode":any; }) =>{
      console.log(f.value);
      console.log(f.matchMode);
      
    })
  }

  obtenerFinca(id:number):void{

   
  }


  exportarPdf(){
   

    
// configuracion de la tabla asesoría agroquímico un metodo q funciona pero no es recomendablw
   
/* var columnaAseAgro = [
 
  { title: "Cuadro", dataKey: "cuadro" },
  { title: "Agroquímico", dataKey: "agroquimico" },
  { title: "Dosis/ha", dataKey: "dosisPorHectaria" },
  { title: "Dosis/Hl", dataKey: "dosisPorHl" },
  { title: "Vol./ha", dataKey: "volumenPorHectaria" },
  { title: "Objetivo", dataKey: "objetivo" },
  { title: "Plaga", dataKey: "plaga" },
  { title: "Fecha estimada", dataKey: "fechaEstimadaAplicacionParsed" },
  { title: "Fecha aplicación", dataKey: "fechaAplicacionAsesoria" },
  { title: "Encargado agrícola", dataKey: "nombreEncargado" }
];

var filaAseAg = [];
this.listadoAsesoria.map(function (aseA) {
  var fechaEstimadaA = new Date(aseA.fechaEstimadaAplicacionParsed);
  var fechaDeAplicacionA = aseA.fechaAplicacionAsesoria ? new Date(aseA.fechaAplicacionAsesoria): null;
 
  filaAseAg.push({
    cuadro: aseA.cuadro.numeroCuadro,
    agroquimico: aseA.agroquimico.nombreComercial,
    dosisPorHectaria: aseA.dosisPorHectaria,
    dosisPorHl:aseA.dosisPorHl,
    volumenPorHectaria: aseA.volumenPorHectaria,
    objetivo: aseA.objetivo,
    plaga:aseA.plaga,
    fechaEstimadaAplicacionParsed: fechaEstimadaA.toLocaleDateString(),
    fechaAplicacionAsesoria: fechaDeAplicacionA
    ? fechaDeAplicacionA.toLocaleDateString()
    : "No aplicada",
    nombreEncargado:aseA.nombreEncargado,
  });
}); */

//fin tabla asesoria Agroqímico

/* metodo q funciona pero no es recomendable 
        doc.autoTable(columnaSue,filasSue,{startY: doc.autoTable.previous.finalY + 50,didDrawPage: function(columnaSue){
              doc.setFontSize(10); 
            doc.setFont("courier", "bolditalic");
            doc.text(`Listado labor de suelo`,40,doc.autoTable.previous.finalY + 45);
              doc.setFontSize(10);
              //doc.text('Página ' + doc.internal.getNumberOfPages(), columnaSue.settings.margin.left, doc.internal.pageSize.height - 10);
              doc.text("Página " + columnaSue.pageNumber + " de " + doc.internal.getNumberOfPages(), columnaSue.settings.margin.left, doc.internal.pageSize.height - 10);
              doc.addImage(ima,280,15,50,25);
              doc.setFontSize(10);
              doc.text(`Fecha: ${new Date().toLocaleDateString()}`,480,30);
      } *//* ,  columnStyles: {
        fechaEstimadaAplicacionParsed: { cellWidth: 60},
        fechaAplicacionAsesoria:{cellWidth:60},
        dosisPorHectaria:{cellWidth:40},
        dosisPorHl:{cellWidth:40},
        volumenPorHectaria:{cellWidth:35},
        
      }, margin: {  right: 10,  left: 10 } */
   // }); 



    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          var doc : any = new jsPDF.default('p','pt');   
          var ima="data:image/png;base64,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";

             // Función para agregar una tabla al documento PDF
      function agregarPrimerTabla(columnas1, filas, titulo,startY) {
        doc.setFontSize(10);
        doc.setFont("courier", "bolditalic");
        doc.text(titulo, 25, startY - 5);
        doc.autoTable({
          head: [columnas1],
          body: filas,
          startY: startY,
          margin: { top: 10, right: 24,  left: 24 },
          didDrawPage: function(columnas1){
            doc.setFontSize(10);
             doc.text("Página " + columnas1.pageNumber + " de " + doc.internal.getNumberOfPages(), columnas1.settings.margin.left, doc.internal.pageSize.height - 10);
            doc.addImage(ima,280,15,50,25);
            doc.setFontSize(10);
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`,480,30);
        }
        });
        //doc.addPage(); // Agregar una nueva página después de cada tabla
      } 

    

      function agregarTabla(columnas, filas, titulo,startY) {
       
          // Verifica si la tabla cabe en la página actual
          if (doc.autoTable.previous.finalY > 600) {
            // Si no cabe, agrega una nueva página y establece startY en la parte superior
            doc.addPage();
            startY = 60; // Puedes ajustar este valor según tus necesidades
          } else {
            // Si cabe, establece startY justo después del final de la tabla anterior
            startY = doc.autoTable.previous.finalY + 50; // Puedes ajustar este valor según tus necesidades
          }

          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
  
          doc.text(titulo, 25, startY - 5);
  
        doc.autoTable({
          head: [columnas],
          body: filas,
          startY: startY ,
          margin: { top: 10, right: 24,  left: 24 },
          didDrawPage: function(columnaPla){
            doc.setFontSize(10);
             doc.text("Página " + doc.internal.getNumberOfPages(), columnaPla.settings.margin.left, doc.internal.pageSize.height - 10);
            
             doc.addImage(ima,280,15,50,25);
            doc.setFontSize(10);
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`,480,30);
        }, columnStyles: {
          fechaEstimadaAplicacionParsed: { cellWidth: 100},
          fechaAplicacionAsesoria:{cellWidth:100},
          dosisPorHectaria:{cellWidth:25},
          dosisPorHl:{cellWidth:25},
          volumenPorHectaria:{cellWidth:25},
          
        }
        });
        //doc.addPage(); // Agregar una nueva página después de cada tabla
      }

     
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`CUADERNO DE CAMPO `,240,60);
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`PRODUCCIÓN DE HORTÍCOLAS PARA INDUSTRIAS `,190,80);
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          var fechaCAmpaña = this.rangoFechas.map(f => f.toLocaleDateString()); 
          doc.text(`Campaña: `+fechaCAmpaña,200,100);
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`Productor: `+this.finca.productor.nombre+ " " + this.finca.productor.apellido,130,140);
           doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`Telefono: `+this.finca.productor.telefono,130,160);
          
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`Finca: `+this.finca.nombre,330,140);
          
          doc.setFontSize(10);
          doc.setFont("courier", "bolditalic");
          doc.text(`Dirección: `+this.finca.direccion,330,160);

          agregarPrimerTabla(
            ["Cultivo", "Marco Plantación e/h", "Marco plantación e/p", "Sist. de riego", "Sist. de trasplante", "Cuadro", "Fecha plantación", "Fecha estimada cosecha"],
            this.listadoPlantacion.map(p => [
              p.nombreTipoCultivo.nombre,
              p.entreIleras,
              p.entrePlantas,
              p.sistemaRiego,
              p.sistemaTrasplante,
              p.cuadro.numeroCuadro,
              new Date(p.fechaCreacionPlantacion).toLocaleDateString(),
              new Date(p.fechaCosecha).toLocaleDateString()
            ]),
            "Listado de plantación", 200
            
          );

          agregarTabla(
            ["Cultivo anterior", "Labor cultural", "Herramienta implementada", "Observación", "Cuadro", "Fecha labor"],
            this.listadoLabor.map(la => [
              la.idCuadro.cultivoAnterior,
              la.labor,
              la.herramientasUtilizadas,
              la.observacion,
              la.idCuadro.numeroCuadro,
              new Date(la.fechaLabor).toLocaleDateString()
            ]),
            "Listado labor de suelo",doc.autoTable.previous.finalY + 50
          );
    
          agregarTabla(
            ["Agroquímico", "Cuadro", "Dosis/ha", "Dosis/Hl", "Vol./ha", "Objetivo", "Plaga", "Aplicación"],
            this.listadoAplicacionAgro.map(a => [
              a.agroquimico.nombreComercial,
              a.cuadro.numeroCuadro,
              a.dosisPorHectaria,
              a.dosisPorHl,
              a.volumenPorHectaria,
              a.objetivo,
              a.plaga,
              new Date(a.fechaDeAplicacion).toLocaleDateString()
            ]),
            "Listado aplicación de agroquímico", doc.autoTable.previous.finalY + 50
          );

          agregarTabla(
            ["Agroquímico", "Cuadro", "Dosis/ha", "Dosis/Hl", "Vol./ha", "Objetivo", "Plaga", "Fecha estimada","Fecha aplicada", "Encargado"],
            this.listadoAsesoria.map(ase => [
              ase.agroquimico.nombreComercial,
              ase.cuadro.numeroCuadro,
              ase.dosisPorHectaria,
              ase.dosisPorHl,
              ase.volumenPorHectaria,
              ase.objetivo,
              ase.plaga,
              
              new Date(ase.fechaEstimadaAplicacionParsed).toLocaleDateString(),
              ase.fechaAplicacionAsesoria ? new Date(ase.fechaAplicacionAsesoria).toLocaleDateString() : "No aplicada",
              console.log(ase.fechaAplicacionAsesoria),
              ase.nombreEncargado,

              
            ]),
            "Listado asesoría de agroquímico",doc.autoTable.previous.finalY + 50
            );
            
         

          agregarTabla(
            ["Cuadro", "Duración", "Milimetros aplicados", "Descripcíon", "Fecha riego"],
            this.listadoRiego.map(r => [
              r.cuadro.numeroCuadro,
              r.duracionEnHoras,
              r.milimetrosAplicados,
              r.observacionProductor,
              new Date(r.fechaRiego).toLocaleDateString(),
            ]),
            "Listado riego",doc.autoTable.previous.finalY + 50
          );

          agregarTabla(
            ["Cuadro", "Duración", "Milimetros aplicados", "Fecha estimada", "Fecha aplicada"],
            this.listadoAsesoriaRiego.map(aseR => [
              aseR.cuadro.numeroCuadro,
              aseR.duracionEnHoras,
              aseR.milimetrosAplicados,
              new Date(aseR.fechaEstimadaAplicacionParsed).toLocaleDateString(),
              new Date(aseR.fechaAplicacionAsesoria).toLocaleDateString(),
            ]),
            "Listado asesoría riego",doc.autoTable.previous.finalY + 50
          );
         
  doc.save('cuadernoDigital.pdf');
        
   })
  }) 
  
  }
  
  


}
