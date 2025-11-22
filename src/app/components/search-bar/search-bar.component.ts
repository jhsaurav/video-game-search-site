import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
searchSubject = new Subject<string>();
query:string='';
constructor(private router: Router) { }
ngOnInit() {
  this.searchSubject
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(value => this.onSubmit(value));
}

onSubmit(form){
  this.router.navigate(['search',form]);
}



onKeyUp(value: string) {
  this.searchSubject.next(value);
}
}
