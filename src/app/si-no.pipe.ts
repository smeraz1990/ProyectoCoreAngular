import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'siNo'
})
export class SiNoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let respuesta = ''
    //console.log("aqui llega el valor",value)
    if (value == 1){
      respuesta = "SI";
    }
    else
    {
      respuesta = "NO";
    }
    //console.log("respuesta",respuesta)
    return respuesta;
  }

}
