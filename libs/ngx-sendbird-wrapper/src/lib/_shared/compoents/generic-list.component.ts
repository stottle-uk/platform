import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';
import { GenericDirective } from '../directives/generic.directive';
import { GenericListOptions } from '../models/shared.models';

@Component({
  selector: 'stottle-generic-list',
  template: `
    <ng-container #list *ngFor="let item of items; trackBy: trackByFn()">
      <ng-template stottleGeneric></ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericListComponent<T, TComp>
  implements AfterViewInit, AfterViewChecked, OnDestroy {
  @Input()
  options: GenericListOptions<T, TComp>;
  @Output()
  changes = new EventEmitter<GenericDirective<TComp>[]>();

  @ViewChildren(GenericDirective)
  listItems: QueryList<GenericDirective<TComp>>;
  @ViewChildren('list', { read: ViewContainerRef })
  list: QueryList<ViewContainerRef>;

  get items(): T[] {
    return this.options && this.options.items
      ? this.options.items.map(i => i.item)
      : [];
  }

  private componentRefs: GenericDirective<TComp>[] = [];
  private destroy$ = new Subject();
  private get listItemsRefs(): GenericDirective<TComp>[] {
    return this.listItems.toArray();
  }

  ngAfterViewInit(): void {
    this.list.changes
      .pipe(
        takeUntil(this.destroy$),
        delay(0),
        tap(() => this.componentRefs.forEach(ref => ref.ngOnDestroy())),
        map(changes => this.updateList(changes)),
        tap(refs => this.changes.emit(refs)),
        tap(refs => (this.componentRefs = refs))
      )
      .subscribe();
  }

  ngAfterViewChecked(): void {
    if (this.options.notifyOnChanges) {
      this.list.notifyOnChanges();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRefs.forEach(ref => ref.ngOnDestroy());
  }

  trackByFn(): (index: number, item: T) => string | number {
    return (index, item) =>
      item && !!this.options && !!this.options.trackByKey
        ? this.options.trackByKey(item)
        : index;
  }

  private updateList(changes: any[]): GenericDirective<TComp>[] {
    return changes.map((ref: ViewContainerRef, index: number) =>
      this.buildComponent(index)
    );
  }

  private buildComponent(index: number): GenericDirective<TComp> {
    this.listItemsRefs[index].options = {
      component: this.options.items[index].component,
      updateInstance: this.updateInstance(index)
    };
    this.listItemsRefs[index].ngAfterViewInit();
    return this.listItemsRefs[index];
  }

  private updateInstance(index: number): (instance: TComp) => void {
    return instance => this.options.updateInstance(instance, index);
  }
}
