import {Directive, ElementRef, HostListener, Input, OnInit, Renderer} from '@angular/core';
import {ChangesetItem} from "./model/changeset-item";
import {ChangesetItemService} from "./service/changeset-item.service";
import {Observable} from "rxjs";

@Directive({
  selector: '[appChangesetItemFocus]'
})
export class ChangesetItemFocusDirective implements OnInit{
  @Input('appChangesetItemFocus') changesetItem: ChangesetItem;

  constructor(private el: ElementRef,private renderer: Renderer,
              private changesetItemService:ChangesetItemService) {

  }

  ngOnInit() {
    this.changesetItemService.focusChangesetItem.subscribe(focusItem=>{
      if(!focusItem || !this.changesetItem){
        this.highlight(false);
        return
      }

      if(focusItem.id == this.changesetItem.id){
        this.highlight(true);
      }else{
        this.highlight(false);
      }
    })
  }

  @HostListener('mouseover') onMouseEnter() {
    this.changesetItemService.setFocusChangesetItem(this.changesetItem)
    this.highlight(true);
  }
  @HostListener('mouseout') onMouseLeave() {
    this.changesetItemService.setFocusChangesetItem(null)
    this.highlight(false);
  }

  private highlight(enable: boolean) {
    this.renderer.setElementClass(this.el.nativeElement, 'highlight', enable);
  }
}
