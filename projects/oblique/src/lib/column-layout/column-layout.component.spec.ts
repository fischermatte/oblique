import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateService} from '@ngx-translate/core';
import {ObMockColumnPanelDirective} from './_mocks/mock-column-panel.directive';
import {ObMockTranslatePipe} from '../_mocks/mock-translate.pipe';
import {ObMockTranslateService} from '../_mocks/mock-translate.service';
import {WINDOW} from '../utilities';
import {ObColumnLayoutComponent} from './column-layout.component';
import {ObUseObliqueIcons} from '../icon/icon.model';

@Component({
	template: ` <ob-column-layout [left]="left" [right]="right" obColumnPanel>
		<div column-left-content>
			<h3 class="nav-header-title">Left Column</h3>
		</div>
		<div column-main-content>
			<h1>Three-Column Layout</h1>
			<p>Lorem ipsum dolor sit amet, consectetur</p>
		</div>
		<div column-right-content>
			<h3 class="nav-header-title">Right Column</h3>
		</div>
	</ob-column-layout>`
})
class TestComponent {
	left = false;
	right = true;
	configEvents;

	toggleLeft(): void {
		this.left = true;
	}
}

describe('ColumnLayoutComponent', () => {
	let fixture: ComponentFixture<TestComponent>;
	let testComponent: TestComponent;
	let component: ObColumnLayoutComponent;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TestComponent, ObColumnLayoutComponent, ObMockColumnPanelDirective, ObMockTranslatePipe],
			imports: [RouterTestingModule],
			providers: [
				{provide: TranslateService, useClass: ObMockTranslateService},
				{provide: WINDOW, useValue: window}
			],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
		}).compileComponents();
	}));

	describe('Without ObUseObliqueIcons token', () => {
		beforeEach(waitForAsync(() => {
			fixture = TestBed.createComponent(TestComponent);
			testComponent = fixture.componentInstance;
			component = fixture.debugElement.query(By.css('ob-column-layout')).componentInstance;
			fixture.detectChanges();
		}));

		it('should create', () => {
			expect(testComponent).toBeTruthy();
		});

		it('should contain columnLayout class', () => {
			expect(fixture.debugElement.query(By.css('ob-column-layout')).nativeElement.classList).toContain('ob-column-layout');
		});

		it('should not use FontAwesome', () => {
			expect(component.useFontAwesomeIcon).toBe(false);
		});
	});

	describe.each([true, false])('With ObUseObliqueIcons token set to %s', value => {
		beforeEach(waitForAsync(() => {
			TestBed.overrideProvider(ObUseObliqueIcons, {useValue: value});
			fixture = TestBed.createComponent(TestComponent);
			component = fixture.debugElement.query(By.css('ob-column-layout')).componentInstance;
			fixture.detectChanges();
		}));

		it('should use FontAwesome', () => {
			expect(component.useFontAwesomeIcon).toBe(!value);
		});
	});
});
