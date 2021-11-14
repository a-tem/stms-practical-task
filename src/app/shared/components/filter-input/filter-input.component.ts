import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from "@angular/core";
import { FormControl } from "@angular/forms";
// import { EventEmitter } from "events";
import { Observable, Subscription } from "rxjs";
import { debounceTime, distinctUntilChanged, map, withLatestFrom } from "rxjs/operators";

@Component({
  selector: 'st-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss']
})
export class FilterInputComponent implements OnInit, OnDestroy {
  @Input() obsList: Observable<any[]>;
  @Input() filterBy: string = 'id';

  @Output() onFilter = new EventEmitter<any[]>();

  filterControl: FormControl;
  subs$ = new Subscription();

  constructor() {}

  ngOnInit() {
    this.initFilterForm();
  }

  initFilterForm() {
    this.filterControl = new FormControl('');

    const filterFormSubs = this.filterControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      withLatestFrom(this.obsList),
      map(([topic, list]) => ({ topic, list })),
    ).subscribe(({ topic, list }) => {
      // this.filteredList = list.filter(patient => patient.firstName.toLowerCase().includes(topic));
      this.onFilter.emit(list.filter(patient => patient[this.filterBy].toLowerCase().includes(topic)))
    });

    this.subs$.add(filterFormSubs);
  }

  clearFilter() {
    this.filterControl.patchValue('', { emitEvent: true });
  }

  ngOnDestroy() {
    this.subs$.unsubscribe();
  }
}
