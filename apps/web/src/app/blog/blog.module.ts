import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BlogRoutesModule } from './blog-routes.module';
import { BlogComponent } from './components/blog.component';

@NgModule({
  imports: [SharedModule, BlogRoutesModule],
  declarations: [BlogComponent]
})
export class BlogModule {}
