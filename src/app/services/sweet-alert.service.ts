import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  showLoading(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
    });
    Swal.showLoading();
  }

  showSuccess(title: string, text: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonText: 'OK',
    });
  }

  showError(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }

  async confirmDeletion(title: string, text: string): Promise<boolean> {
    const result = await Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    });

    return result.isConfirmed;
  }

  showDeletionSuccess(title: string, text: string) {
    Swal.fire(
      title,
      text,
      'success'
    );
  }

}
