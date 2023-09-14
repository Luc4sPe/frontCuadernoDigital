import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import jsPDF from 'jspdf'; 
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-reportes-de-actividad',
  templateUrl: './reportes-de-actividad.component.html',
  styleUrls: ['./reportes-de-actividad.component.css']
})
export class ReportesDeActividadComponent implements OnInit {

  home : MenuItem = {}
  items : MenuItem[] = [];
  constructor() { }

  ngOnInit(): void {
    this.cargarItems();
  }

  cargarItems(): void {
    this.home = {icon: 'pi pi-home', routerLink:'/index'};
    this.items = [
      {label: 'Reportes'},
      {label: 'Usuarios'},
      {label: 'Actividad', disabled:true}
    ];
  }

   downloadPDF() {
    // Extraemos el
    const DATA = document.getElementById('pdf');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  }


  

}
