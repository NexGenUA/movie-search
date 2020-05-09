import { MainComponent, IComponent } from "./core/component";
import { MainModule } from "./core/module";
import { Component } from './core/decorators/component.decorator';
import { yandexTranslate } from '../app/tools/yandex.translate';
import { bootstrap } from './core/bootstrap';
import { $ } from './tools/JLib';

export  {
  MainComponent,
  MainModule,
  IComponent,
  Component,
  yandexTranslate,
  bootstrap,
  $,
}
