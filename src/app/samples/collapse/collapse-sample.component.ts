import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Duration, IconPosition} from './collapse-sample.model';
import {ThemeService} from '../../common/theme.service';

@Component({
	selector: 'sc-collapse-sample',
	templateUrl: './collapse-sample.component.html'
})
export class CollapseSampleComponent {
	collapseTitle = 'Collapse title here ';
	material: Observable<boolean>;
	duration = new FormControl('fast');
	iconPosition = new FormControl('left');
	active = false;

	durations: Duration[] = [
		{value: 'slow', viewValue: 'Slow'},
		{value: 'fast', viewValue: 'Fast'},
		{value: 100, viewValue: '100 ms'},
		{value: 500, viewValue: '500 ms'},
		{value: 1000, viewValue: '1000 ms'},
		{value: 1500, viewValue: '1500 ms'},
		{value: 2000, viewValue: '2000 ms'}
	];

	iconPositions: IconPosition[] = [
		{value: 'left', viewValue: 'Move the icon to the left'},
		{value: 'right', viewValue: 'Move the icon to the right'},
		{value: 'justified', viewValue: 'Justify the icon to the right'},
		{value: 'none', viewValue: 'Do not show the icon'}
	];

	constructor(theme: ThemeService) {
		this.material = theme.theme$.pipe(map(() => theme.isMaterial()));
	}
}
