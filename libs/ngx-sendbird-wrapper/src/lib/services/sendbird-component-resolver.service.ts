import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { MessageFileFormComponent } from '../components/message-file-form.component';
import { MessageFormComponent } from '../components/message-form.component';
import { SendbirdOptions, SEND_BIRD_OPTIONS } from '../models/messages.model';

@Injectable({
  providedIn: 'root'
})
export class SendbirdComponentResolverService {
  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(SEND_BIRD_OPTIONS) private options: SendbirdOptions
  ) {}

  createMessageFileFormComponent(
    ref: ViewContainerRef
  ): ComponentRef<MessageFileFormComponent> {
    return this.createComponent(
      ref,
      this.options.messageFileFormComponent || MessageFileFormComponent
    );
  }

  createMessageFormComponent(
    ref: ViewContainerRef
  ): ComponentRef<MessageFormComponent> {
    return this.createComponent(
      ref,
      this.options.messageFormComponent || MessageFormComponent
    );
  }

  createComponent<T>(
    ref: ViewContainerRef,
    component: Type<T>
  ): ComponentRef<T> {
    const factory = this.resolver.resolveComponentFactory(component);
    ref.clear();
    return ref.createComponent(factory);
  }
}
