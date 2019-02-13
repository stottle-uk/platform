import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendbirdComponentResolverService {
  constructor(private resolver: ComponentFactoryResolver) {}

  createComponent<T>(
    ref: ViewContainerRef,
    component: Type<T>
  ): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory(component);
    ref.clear();
    return ref.createComponent(factory);
  }
}
