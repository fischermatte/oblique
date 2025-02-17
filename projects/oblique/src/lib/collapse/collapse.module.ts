import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObTelemetryService} from '../telemetry/telemetry.service';
import {requireAndRecordTelemetry} from '../telemetry/telemetry-require';
import {ObCollapseComponent} from './collapse.component';
import {obliqueProviders} from '../utilities';
import {ObIconModule} from '../icon/icon.module';

export {
	ObCollapseComponent,
	OBLIQUE_COLLAPSE_ACTIVE,
	OBLIQUE_COLLAPSE_ICON_POSITION,
	OBLIQUE_COLLAPSE_DURATION
} from './collapse.component';

@NgModule({
	imports: [CommonModule, ObIconModule],
	declarations: [ObCollapseComponent],
	providers: obliqueProviders(),
	exports: [ObCollapseComponent]
})
export class ObCollapseModule {
	constructor(telemetry: ObTelemetryService) {
		requireAndRecordTelemetry(telemetry, ObCollapseModule);
	}
}
