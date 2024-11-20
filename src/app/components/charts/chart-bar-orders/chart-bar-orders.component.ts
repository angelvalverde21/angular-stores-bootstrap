import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts'
import { ChartType, Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, BarController } from 'chart.js';

// Registra los controladores necesarios para el gráfico de barras
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  // Title,
  // Tooltip,
  // Legend,
  BarController
);
@Component({
  selector: 'app-chart-bar-orders',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chart-bar-orders.component.html',
  styleUrl: './chart-bar-orders.component.css'
})
export class ChartBarOrdersComponent {
    /** chart js */
  
    public barChartData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Junio', 'Julio'],
      datasets: [
        {
          label: 'Ventas 2021',
          data: [10, 15, 12, 20, 18, 16],  // Datos del año 2021
          backgroundColor: 'rgba(255, 193, 7, 0.2)', // Color amarillo (warning) para 2022
          borderColor: 'rgba(255, 193, 7, 1)', 
          borderWidth: 1,
        },
        {
          label: 'Ventas 2022',
          data: [12, 14, 18, 22, 16, 19],  // Datos del año 2022
          backgroundColor: 'rgba(153, 102, 255, 0.2)', // Color para el 2023
          borderColor: 'rgba(153, 102, 255, 1)',  
          borderWidth: 1,
        },
        {
          label: 'Ventas 2023',
          data: [15, 18, 20, 25, 21, 22],  // Datos del año 2023
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Verde para 2023
          borderColor: 'rgba(75, 192, 192, 1)', 
          borderWidth: 1,
        }
      ]
    };
  
    public barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };
  
    public barChartType: ChartType = 'bar'; // Usa el tipo ChartType
  
      /** chart js */
}
