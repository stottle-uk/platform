import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  Type,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { GenericListOptions } from '../models/messages.model';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';

@Component({
  selector: 'stottle-generic-list',
  template: `
    <ng-container #list *ngFor="let item of items; trackBy: trackByFn">
      <template #listItem></template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericListComponent<T, TComp>
  implements AfterViewInit, OnDestroy {
  @Input()
  options: GenericListOptions<T, TComp>;
  @Output()
  changes = new EventEmitter<ComponentRef<TComp>[]>();

  @ViewChildren('listItem', { read: ViewContainerRef })
  listItems: QueryList<ViewContainerRef>;
  @ViewChildren('list', { read: ViewContainerRef })
  list: QueryList<ViewContainerRef>;

  get items(): T[] {
    return this.options ? this.options.items : [];
  }

  private componentRefs: ComponentRef<TComp>[] = [];
  private destroy$ = new Subject();
  private get listItemsRefs(): ViewContainerRef[] {
    return this.listItems.toArray();
  }

  constructor(private resolver: SendbirdComponentResolverService) {}

  ngAfterViewInit(): void {
    this.list.changes
      .pipe(
        takeUntil(this.destroy$),
        map(changes =>
          this.updateList(
            changes,
            this.options.component,
            this.options.updateInstance
          )
        ),
        tap(refs => refs.forEach(r => r.hostView.detectChanges())),
        tap(refs => this.changes.emit(refs)),
        tap(refs => this.componentRefs.concat(refs))
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRefs.forEach(ref => ref.destroy());
  }

  trackByFn(index: number, item: T): string | number {
    return item && !!this.options && !!this.options.trackByKey
      ? this.options.trackByKey(item)
      : index;
  }

  private updateList<TComp>(
    changes: any[],
    compoent: Type<TComp>,
    updateInstance: (instance: TComp, index: number) => void
  ): ComponentRef<TComp>[] {
    return changes.map((ref: ViewContainerRef, index: number) =>
      this.buildComponent<TComp>(index, compoent, updateInstance)
    );
  }

  private buildComponent<TComp>(
    index: number,
    compoent: Type<TComp>,
    updateInstance: (instance: TComp, index: number) => void
  ) {
    const cmpRef = this.resolver.createComponent(
      this.listItemsRefs[index],
      compoent
    );
    updateInstance(cmpRef.instance, index);
    return cmpRef;
  }
}
