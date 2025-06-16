import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MasterService } from '../../services/master.service';
import { APIResponseModel, IDesignation } from '../../model/interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];

  masterService = inject(MasterService);

  ngOnInit(): void {
    this.masterService.getDesignation().subscribe({
      next: (result: APIResponseModel) => {
        this.designationList = result.data;
        console.log('Designation data:', result.data); // ✅ Debug
      },
      error: (err) => {
        console.error('API error:', err); // ✅ Debug
        alert("API error / Network Down");
      }
    });
  }

  // ✅ Add this method to fix the 'trackById' error
  trackById(index: number, item: IDesignation): number {
    return item.id;
  }
}
  