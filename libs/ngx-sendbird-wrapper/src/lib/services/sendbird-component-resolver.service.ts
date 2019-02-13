import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { SendbirdOptions, SEND_BIRD_OPTIONS } from '../models/messages.model';

@Injectable({
  providedIn: 'root'
})
export class SendbirdComponentResolverService {
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(SEND_BIRD_OPTIONS) private options: SendbirdOptions
  ) {}

  createComponent<T>(
    ref: ViewContainerRef,
    component: Type<T>
  ): ComponentRef<T> {
    const foundComponent = this.findComponentOrDefault(component);
    const factory = this.resolver.resolveComponentFactory(foundComponent);
    ref.clear();
    return ref.createComponent(factory);
  }

  private findComponentOrDefault<T>(type: Type<T>): Type<T> {
    return (this.options.declarations.find(d => d.name === type.name) ||
      type) as Type<T>;
  }
}
