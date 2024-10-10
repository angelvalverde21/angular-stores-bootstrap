import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputGroupComponent } from "../../../components/forms/input-group/input-group.component";
import { debounceTime, Subject, Subscription } from 'rxjs';
import { DistrictPublicService } from '../../../services/district-public.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../../components/loading/loading.component";

@Component({
  selector: 'app-input-district-id',
  standalone: true,
  imports: [InputGroupComponent, FormsModule, CommonModule, LoadingComponent],
  templateUrl: './input-district-id.component.html',
  styleUrl: './input-district-id.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => InputDistrictIdComponent),
      multi: true,
    }
  ]
})

export class InputDistrictIdComponent implements ControlValueAccessor, OnInit {


  @Input() isValid: boolean = true; 
  @Input() isInvalid: boolean = false; 
  
  isDisabled: boolean = false;



  district_id : number = 150101; //150101 es Lima
  name : string = "";
  nameSubscription! : Subscription;
  districts: any[] = [];
  showDistricts: boolean = true;
  loading: boolean = false;

  searchSubject: Subject<string> = new Subject();

  constructor(private _districtPublic: DistrictPublicService){

  }

  ngOnInit(): void {
    this.searchSubject
    .pipe(debounceTime(500))  // Retrasa la búsqueda 300ms después del último evento
    .subscribe((searchTerm: string) => {
      this.searchDistrict(searchTerm);
    });

  }

  keyUpSearch($event: any) {

    console.log($event.target.value);
    
    const searchTerm = $event.target.value;
  
    if (searchTerm.length > 3) { //permite la busqueda si hay mas de 3 caracteres

      this.loading = true;

      this.searchSubject.next(searchTerm); // Emite el término de búsqueda
    }else{
      this.onChangeCb?.(null);
    }
  }

  setName(district:any){
    this.name = `${district.name} - ${district.province.name} - ${district.province.department.name}`;
    this.district_id = district.id;
    this.onChangeCb?.(this.district_id);
    this.showDistricts = true;
  }

  searchDistrict(name: string){

    // console.log(event.target.value);
    // this.onChangeCb?.(event.target.value);
    this.nameSubscription = this._districtPublic.search(name).subscribe((resp:any) => {
      this.showDistricts = false;
      this.loading = false;
      this.districts = resp.data;
      console.log(this.districts);
      
    });

  }

  // setDistrictId(event:any){

  //   console.log(event.target.value);
  //   this.onChangeCb?.(event.target.value);

  // }

  onChangeCb?: (district_id:number | null) => void; //esta funcion es un callback para registerOnChange
  onTouchedCb?: () => void;

  writeValue(district_id: number): void {
    this.district_id = district_id;
  }

  registerOnChange(fn: any): void {
    this.onChangeCb = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouchedCb = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


}
