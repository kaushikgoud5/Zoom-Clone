import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }
  private dataSource = new BehaviorSubject('');
  private showFewOnly = new BehaviorSubject<boolean>(false);
  data$ = this.dataSource.asObservable();
  showFewOnly$ = this.showFewOnly.asObservable();
  updateData(data){
    this.dataSource.next(data);
  }
  emitShowFewOnly(data){
    this.showFewOnly.next(data);
  }
}
