import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.css'
})
export class ProductReportComponent implements OnInit, OnDestroy{

  constructor(private _report: ReportService){

  }

  @Input() product_id: number = 0; 
  loading: boolean = false;
  rows: any[] = [];
  SubscriptionReport! : Subscription;

  ngOnInit(): void {
    this.load();
  }

  load(){
    console.log('cargando porte');
    this.loading = true;
    this.SubscriptionReport = this._report.product(this.product_id).subscribe((resp:any) => {
      this.rows = resp.data;
      this.loading = false;
      console.log(resp);
    });

  }

  ngOnDestroy(): void {
    if (this.SubscriptionReport) {
      this.SubscriptionReport.unsubscribe();
      console.log('se destruyo la subscripcion');
      
    }
  }


}
