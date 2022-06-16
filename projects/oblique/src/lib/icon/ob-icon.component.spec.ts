import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconModule} from '@angular/material/icon';
import {By} from '@angular/platform-browser';
import {ObIconComponent} from './ob-icon.component';
import {ObUseObliqueIcons} from './icon.model';

describe('IconComponent', () => {
	let component: ObIconComponent;
	let fixture: ComponentFixture<ObIconComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatIconModule],
			declarations: [ObIconComponent]
		}).compileComponents();
	});

	describe('Without injection token', () => {
		beforeEach(() => {
			fixture = TestBed.createComponent(ObIconComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should create', () => {
			expect(component).toBeTruthy();
		});

		it('should have ob-icon-wrapper class', () => {
			expect(fixture.debugElement.nativeElement.classList.contains('ob-icon-wrapper')).toBe(true);
		});

		it('should show an Angular icon', () => {
			expect(fixture.debugElement.query(By.css('mat-icon'))).toBeTruthy();
		});

		it('should not show a FontAwesome icon', () => {
			expect(fixture.debugElement.query(By.css('.fa'))).toBeFalsy();
		});

		describe('fontAwesome aliases', () => {
			it('should have 15 aliases ', () => {
				expect(Object.keys(component.fontAwesomeAliases).length).toBe(15);
			});

			it('should map cancel ', () => {
				expect(component.fontAwesomeAliases.cancel).toBe('fa-times');
			});

			it('should map checkmark ', () => {
				expect(component.fontAwesomeAliases.checkmark).toBe('fa-check');
			});

			it('should map chevron-down ', () => {
				expect(component.fontAwesomeAliases['chevron-down']).toBe('fa-angle-down');
			});

			it('should map chevron-left ', () => {
				expect(component.fontAwesomeAliases['chevron-left']).toBe('fa-angle-left');
			});

			it('should map chevron-right ', () => {
				expect(component.fontAwesomeAliases['chevron-right']).toBe('fa-angle-right');
			});

			it('chevron-small-right', () => {
				expect(component.fontAwesomeAliases['chevron-small-right']).toBe('fa-angle-right');
			});

			it('should map chevron-up ', () => {
				expect(component.fontAwesomeAliases['chevron-up']).toBe('fa-angle-up');
			});

			it('should map cloud-upload', () => {
				expect(component.fontAwesomeAliases['cloud-upload']).toBe('fa-cloud-upload-alt');
			});

			it('should map refresh ', () => {
				expect(component.fontAwesomeAliases.refresh).toBe('fa-spinner');
			});

			it('should map repeat', () => {
				expect(component.fontAwesomeAliases.repeat).toBe('fa-redo');
			});

			it('should map search ', () => {
				expect(component.fontAwesomeAliases.search).toBe('fa-search');
			});

			it('should map trash ', () => {
				expect(component.fontAwesomeAliases.trash).toBe('fa-trash-alt');
			});

			it('should map universal-access', () => {
				expect(component.fontAwesomeAliases['universal-access']).toBe('fa-universal-access');
			});

			it('should map warning ', () => {
				expect(component.fontAwesomeAliases.warning).toBe('fa-exclamation');
			});
		});
	});

	describe.each([true, false])('With ObUseObliqueIcons token set to %s', value => {
		beforeEach(() => {
			TestBed.overrideProvider(ObUseObliqueIcons, {useValue: value});
			fixture = TestBed.createComponent(ObIconComponent);
			component = fixture.componentInstance;
			fixture.detectChanges();
		});

		it('should show the correct icon', () => {
			expect(fixture.debugElement.query(By.css(value ? 'mat-icon' : '.fa'))).toBeTruthy();
		});

		it('should hide the unwanted icon', () => {
			expect(fixture.debugElement.query(By.css(value ? '.fa' : 'mat-icon'))).toBeFalsy();
		});
	});
});
