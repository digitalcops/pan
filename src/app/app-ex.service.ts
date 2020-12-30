import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppExService {

  callActivityData = []

  callNoteAdded = new Subject<any>();
  sourceCallNoteAdded$ = this.callNoteAdded.asObservable();

  folderAdded = new Subject<any>();
  sourcefolderAdded$ = this.folderAdded.asObservable();

  fileAdded = new Subject<any>();
  sourcefileAdded$ = this.fileAdded.asObservable();

  constructor() { }

  updateCallNotes(data) {
    this.callNoteAdded.next(data);
  }

  updateFolderAdded(data) {
    this.folderAdded.next(data);
  }

  updateFileAdded(data) {
    this.fileAdded.next(data);
  }
  
}
