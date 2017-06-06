import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { ActionReducer, combineReducers } from '@ngrx/store'

import * as app from './state'
import * as auth from '@colmena/admin-auth'
import * as layout from '@colmena/admin-layout'
import * as system from '@colmena/module-admin-system'

export interface State {
  app: app.State;
  auth: auth.State;
  layout: layout.State;
  system: system.State;
}

const reducers = {
  app: app.reducer,
  auth: auth.reducer,
  layout: layout.reducer,
  system: system.reducer,
}

const reducer: ActionReducer<State> = combineReducers(reducers)

export function colmenaReducer(state: any, action: any) {
  return reducer(state, action)
}

@NgModule({
  imports: [
    StoreModule.provideStore(colmenaReducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(app.AppEffects),
    EffectsModule.run(auth.AuthEffects),
    EffectsModule.run(layout.LayoutEffects),
    system.SystemEffects,
  ],
})
export class AppStoreModule { }
