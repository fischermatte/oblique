import {Component} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ThemeService} from '../../common/theme.service';

@Component({
	selector: 'sc-nested-form-grandchild-sample',
	exportAs: 'grandChild',
	templateUrl: './nested-form-grandchild-sample.component.html',
	styleUrls: ['./mandatory.scss']
})
export class NestedFormGrandChildSampleComponent {
	grandChildForm: UntypedFormGroup;
	material: Observable<boolean>;

	constructor(private readonly fb: UntypedFormBuilder, theme: ThemeService) {
		this.grandChildForm = this.fb.group({
			field1: ['', [Validators.required]],
			field2: ['', Validators.minLength(5)]
		});

		this.material = theme.theme$.pipe(map(() => theme.isMaterial()));
	}
}
