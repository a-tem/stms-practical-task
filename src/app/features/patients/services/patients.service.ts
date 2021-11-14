import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IPatientResponse, Patient } from "@models/patient.model";
import { PATIENTS_URL } from "app/shared/const/api.const";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class PatientsService {
  constructor(private httpService: HttpClient) {

  }
  fetchPatientsList(): Observable<Patient[]> {
    return <Observable<Patient[]>>this.httpService.get(PATIENTS_URL)
      .pipe(
        map((resp: IPatientResponse) => resp.patient)
      );
  }
}
