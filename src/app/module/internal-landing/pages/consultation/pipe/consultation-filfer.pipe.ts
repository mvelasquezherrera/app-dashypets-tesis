import { Pipe, PipeTransform } from '@angular/core';
import { ConsultationModel } from 'src/app/module/models/consultation/consultation-models';

@Pipe({
  name: 'consultationFilfer'
})
export class ConsultationFilferPipe implements PipeTransform {

  transform(items: ConsultationModel[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();

    return items.filter(item => {
      return item.nombreCompletoVeterinario.toLowerCase().includes(searchText) || 
      item.especialidadVeterinario.toLowerCase().includes(searchText) ||
      item.idVeterinario.toString().toLowerCase().includes(searchText) || 
      item.nombreCompletoVeterinario.toLowerCase().includes(searchText) || 
      item.nombreCompletoCliente.toLowerCase().includes(searchText) ||
      item.nombreMascota.toLowerCase().includes(searchText) || 
      item.descripcionTipoMascota.toLowerCase().includes(searchText) ||
      item.descripcionClaseMascota.toLowerCase().includes(searchText) || 
      item.descripcionEnfermedad.toLowerCase().includes(searchText)
    });
  }

}
