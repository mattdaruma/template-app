import { Injectable } from '@angular/core';
import { delay, of, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private data = new ReplaySubject<any>(1)
  public data$ = this.data.asObservable()
  constructor() { 
    of({demo: 'Hello!'})
      .pipe(
        delay(3000))
      .subscribe(data => {
        this.data.next(data)
      })
  }
}
