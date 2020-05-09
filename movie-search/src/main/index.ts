import { MainComponent, IComponent } from "./core/component";
import { MainModule } from "./core/module";
import { Component } from './core/decorators/component.decorator';
import { yandexTranslateService } from '../app/services/yandex-translate.service';
import { bootstrap } from './core/bootstrap';
import { $ } from './tools/JLib';
import { ombd } from '../app/services/omdb.service';
import { dataEx } from './tools/dataEx';
import { cardsMaker } from '../app/services/card-maker.service';

export  {
  MainComponent,
  MainModule,
  IComponent,
  Component,
  yandexTranslateService,
  cardsMaker,
  bootstrap,
  dataEx,
  ombd,
  $,
}
