import {
  ComponentFactoryResolver,
  ComponentRef,
  Inject,
  Injectable,
  Type,
  ViewContainerRef
} from '@angular/core';
import { ChannelListItemComponent } from '../components/channel-list-item.component';
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
      this.findComponent(MessageFileFormComponent)
    );
  }

  createMessageFormComponent(
    ref: ViewContainerRef
  ): ComponentRef<MessageFormComponent> {
    return this.createComponent(ref, this.findComponent(MessageFormComponent));
  }

  createChannelListItemComponent(
    ref: ViewContainerRef
  ): ComponentRef<ChannelListItemComponent> {
    return this.createComponent(
      ref,
      this.findComponent(ChannelListItemComponent)
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

  private findComponent<T>(type: Type<T>): Type<T> {
    return (this.options.declarations.find(d => d.name === type.name) ||
      type) as Type<T>;
  }
}
