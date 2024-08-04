import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pen'
})
export class PenPipe implements PipeTransform {


  transform(value: number): string {
    if (value || value === 0) {
      const formattedValue = value.toFixed(2); // Redondear a dos decimales
      return `S/. ${formattedValue}`; // Agregar el símbolo de la moneda
    }
    return ''; // Manejar casos donde el valor no está definido o es null
  }

}
