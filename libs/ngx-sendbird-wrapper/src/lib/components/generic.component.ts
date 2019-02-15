import {
  AfterViewInit,
  ComponentRef,
  Directive,
  Input,
  OnDestroy,
  ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { GenericOptions } from '../models/messages.model';
import { SendbirdComponentResolverService } from '../services/sendbird-component-resolver.service';

@Directive({
  selector: '[stottle-generic]'
})
export class GenericComponent<TComp> implements AfterViewInit, OnDestroy {
  @Input()
  options: GenericOptions<TComp>;

  private componentRef: ComponentRef<TComp>;
  private destroy$ = new Subject();

  constructor(
    private resolver: SendbirdComponentResolverService,
    private vcr: ViewContainerRef
  ) {}

  ngAfterViewInit(): void {
    this.componentRef = this.resolver.createComponent(
      this.vcr,
      this.options.component
    );

    this.options.updateInstance(this.componentRef.instance);

    this.componentRef.hostView.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.componentRef.destroy();
  }
}
