import { Pipe, PipeTransform } from '@angular/core';
import {SearchService} from "./search.service";
import {Changeset} from "./model/changeset";

@Pipe({
  name: 'changeset',pure:false
})
export class ChangesetPipe implements PipeTransform {

  constructor(private searchService:SearchService){}

  transform(changesets: Changeset[], arg?: string): any {
    let searchText = this.searchService.searchText

    if(!searchText){
      return changesets
    }

    return changesets.filter(c =>
      this.contains(c.status, searchText) ||
      this.contains(c.effectiveDate, searchText)
    );
  }

  private contains(value, searchText: string): boolean {
    if(!value){
      return false
    }
    return value.toLocaleLowerCase().indexOf(searchText.toLocaleLowerCase()) !== -1;
  }

}
