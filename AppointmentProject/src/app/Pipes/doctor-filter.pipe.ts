import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'doctorFilter',
  standalone: true
})
export class DoctorFilterPipe implements PipeTransform {

  transform(doctors: any[],doctorName : string): any {
   const searchTerm = doctorName.toLowerCase();
   if(doctorName!==''){
    return doctors.filter(doctor => doctor.name.toLowerCase().includes(searchTerm))

    }
    else if(doctorName===''){
      return [];

    }
  }
}

