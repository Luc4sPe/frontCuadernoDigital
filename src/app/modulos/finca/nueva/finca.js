function cargar() {
      
    function Cuadro(numero, superficieHectarea){
     this.numero=numero;
     this.superficieHectarea=superficieHectarea;
    }
          var numeroCuadroCapturar = document.getElementById("numero").value;
    var superficeCapturar=document.getElementById("superficie").value;
    
     nuevoCuadro = new Cuadro(numeroCuadroCapturar, superficeCapturar);
    console.log(nuevoCuadro);
    agregar(); 
       
}
  var cuadrosEnviar=[];
  function agregar(){
     cuadrosEnviar.push(nuevoCuadro);
     console.log(cuadrosEnviar);
     document.getElementById("tabla").innerHTML +='<tbody><td>'+nuevoCuadro.numero+'</td> <td>'+nuevoCuadro.superficieHectarea+'</td></tbody>';
                                    
                                           
                                     
  };  