/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { initAppConfig } from './app/app.config';

fetch('assets/config/env.config.json')
  .then((res) => res.json())
  .then((config) =>
    bootstrapApplication(AppComponent, initAppConfig(config)).catch((err) =>
      console.error(err)
    )
  );
