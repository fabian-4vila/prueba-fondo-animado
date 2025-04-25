import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { MatrixBackgroundComponent } from './app/app.component';

bootstrapApplication(MatrixBackgroundComponent, appConfig)
  .catch((err) => console.error(err));
