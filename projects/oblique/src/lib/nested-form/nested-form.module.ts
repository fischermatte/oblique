import {NgModule} from '@angular/core';
import {ObTelemetryService} from '../telemetry/telemetry.service';
import {requireAndRecordTelemetry} from '../telemetry/telemetry-require';
import {ObParentFormDirective} from './parent-form.directive';
import {ObNestedFormComponent} from './nested-form.component';
import {obliqueProviders} from '../utilities';

export {ObParentFormDirective} from './parent-form.directive';
export {ObNestedFormComponent} from './nested-form.component';

@NgModule({
	declarations: [ObNestedFormComponent, ObParentFormDirective],
	providers: obliqueProviders(),
	exports: [ObNestedFormComponent, ObParentFormDirective]
})
export class ObNestedFormModule {
	constructor(telemetry: ObTelemetryService) {
		requireAndRecordTelemetry(telemetry, ObNestedFormModule);
	}
}
