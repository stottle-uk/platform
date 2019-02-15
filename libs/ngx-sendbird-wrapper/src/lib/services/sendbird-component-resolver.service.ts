import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  QueryList,
  Type,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  SendbirdOptionsDeclarations,
  SEND_BIRD_DECLARATIONS
} from '../models/messages.model';

@Injectable()
export class SendbirdComponentResolverService<T> {
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(SEND_BIRD_DECLARATIONS)
    private declarations: SendbirdOptionsDeclarations
  ) {}

  trackChanges(
    compoent: Type<T>,
    list: QueryList<ViewContainerRef>,
    listItems: QueryList<ViewContainerRef>,
    updateInsatnce: (instance: T, index: number) => void
  ): Observable<ComponentRef<T>[]> {
    return list.changes.pipe(
      map(change =>
        this.updateList(change, compoent, listItems, updateInsatnce)
      ),
      tap(refs => refs.forEach(r => r.hostView.detectChanges()))
    );
  }

  createComponent<T>(
    ref: ViewContainerRef,
    component: Type<T>
  ): ComponentRef<T> {
    const foundComponent = this.getComponentOrDefault(component);
    const factory = this.resolver.resolveComponentFactory(foundComponent);
    ref.clear();
    return ref.createComponent(factory);
  }

  private updateList<T>(
    changes: any[],
    compoent: Type<T>,
    listItems: QueryList<ViewContainerRef>,
    updateInsatnce: (instance: T, index: number) => void
  ): ComponentRef<T>[] {
    return changes.map((ref: ViewContainerRef, index: number) =>
      this.buildComponent<T>(listItems, index, compoent, updateInsatnce)
    );
  }

  private buildComponent<T>(
    listItems: QueryList<ViewContainerRef>,
    index: number,
    compoent: Type<T>,
    updateInsatnce: (instance: T, index: number) => void
  ) {
    const cmpRef = this.createComponent(listItems.toArray()[index], compoent);
    updateInsatnce(cmpRef.instance, index);
    return cmpRef;
  }

  private getComponentOrDefault<T>(type: Type<T>): Type<T> {
    const key = Object.keys(this.declarations).find(
      key => `sendbird${key.toLowerCase()}` === type.name.toLowerCase()
    );
    return this.declarations[key] || type;
  }
}
