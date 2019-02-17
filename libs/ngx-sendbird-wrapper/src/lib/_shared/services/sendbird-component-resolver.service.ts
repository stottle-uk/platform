import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import {
  SendbirdOptionsDeclarations,
  SEND_BIRD_DECLARATIONS
} from '../models/shared.models';

@Injectable()
export class SendbirdComponentResolverService {
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(SEND_BIRD_DECLARATIONS)
    private declarations: SendbirdOptionsDeclarations
  ) {}

  createComponent<T>(
    ref: ViewContainerRef,
    component: Type<T>
  ): ComponentRef<T> {
    const foundComponent = this.getComponentOrDefault(component);
    const factory = this.resolver.resolveComponentFactory(foundComponent);
    ref.clear();
    return ref.createComponent(factory);
  }

  private getComponentOrDefault<T>(component: Type<T>): Type<T> {
    const key = Object.keys(this.declarations).find(
      key => `sendbird${key.toLowerCase()}` === component.name.toLowerCase()
    );
    return this.declarations[key] || component;
  }
}
