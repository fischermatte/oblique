import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material';

import {FormControlStateDirective} from './form-control-state.directive';
import { TelemetryService } from '../telemetry/telemetry.service';
import { requireAndRecordTelemetry } from '../telemetry/telemetry-require';

export {FormControlStateDirective} from './form-control-state.directive';

@NgModule({
	imports: [
		CommonModule,
		FormsModule
	],
	declarations: [FormControlStateDirective],
	providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}],
	exports: [FormControlStateDirective]
})
export class FormControlStateModule {
	constructor(telemetry: TelemetryService) {
		requireAndRecordTelemetry(telemetry, FormControlStateModule);
	}
}
