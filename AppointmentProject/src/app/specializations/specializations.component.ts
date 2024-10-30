import { Component } from '@angular/core';
import { AuthenticationServiceService } from '../authentication-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-specializations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './specializations.component.html',
  styleUrl: './specializations.component.scss'
})
export class SpecializationsComponent {
  cardcount: number=0;
  dermcount:number=0;
  showDermCount:boolean=false;
  showCardCount:boolean=false;
  specializationId:number|null=null;
  constructor(private AuthenticationServiceService:AuthenticationServiceService) {
    
    
  }

  
  ngOnInit() {
    this.AuthenticationServiceService.DoctorCount$.subscribe((count:number) => {
      if (this.specializationId == 1) {
        this.showDermCount=true;
        this.dermcount = count;
      } else if (this.specializationId == 3) {
        this.showCardCount=true;
        this.cardcount = count;
      }
    });
  }
  
  onSubmit(specializationId: number)
  {
    this.specializationId = specializationId;
    this.AuthenticationServiceService.CountDoctor(specializationId);
  }
  
}
