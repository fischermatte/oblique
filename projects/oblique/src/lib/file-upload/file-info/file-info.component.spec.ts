import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA, EventEmitter, NO_ERRORS_SCHEMA} from '@angular/core';
import {By} from '@angular/platform-browser';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {TranslateService} from '@ngx-translate/core';
import {Subject, of} from 'rxjs';
import {ObMockTranslateService} from '../../_mocks/mock-translate.service';
import {ObMockTranslatePipe} from '../../_mocks/mock-translate.pipe';
import {ObPopUpService} from '../../pop-up/pop-up.service';
import {ObMockPopUpService} from '../../pop-up/_mocks/mock-pop-up.service';
import {ObFileInfoComponent} from './file-info.component';
import {ObFileUploadService} from '../file-upload.service';
import {ObIFileDescription} from '../file-upload.model';

describe('ObFileInfoComponent', () => {
	let component: ObFileInfoComponent;
	let fixture: ComponentFixture<ObFileInfoComponent>;
	let uploadService: ObFileUploadService;
	let popupService: ObPopUpService;
	const uploadComplete = new Subject<void>();
	const files = [{name: 'file.txt'}, {name: 'file.jpg'}, {name: 'file.pdf'}];

	beforeEach(async () => {
		const mockFileUpload = {
			uploadComplete$: uploadComplete.asObservable(),
			getUploadedFiles: () => of(files),
			delete: () => of()
		};
		await TestBed.configureTestingModule({
			imports: [MatTableModule],
			declarations: [ObFileInfoComponent, ObMockTranslatePipe],
			schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
			providers: [
				{provide: ObFileUploadService, useValue: mockFileUpload},
				{provide: ObPopUpService, useClass: ObMockPopUpService},
				{provide: TranslateService, useClass: ObMockTranslateService}
			]
		}).compileComponents();
		uploadService = TestBed.inject(ObFileUploadService);
		popupService = TestBed.inject(ObPopUpService);
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(ObFileInfoComponent);
		component = fixture.componentInstance;
		component.mapFunction = (filesToMap: ObIFileDescription[]) => filesToMap.map(file => ({...file, extension: file.name.split('.')[1]}));
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have ob-file-info class', () => {
		expect(fixture.debugElement.nativeElement.classList.contains('ob-file-info')).toBe(true);
	});

	it('should have a uploadEvent EventEmitter', () => {
		expect(component.uploadEvent instanceof EventEmitter).toBe(true);
	});

	it('should have a dataSource', () => {
		expect(component.dataSource instanceof MatTableDataSource).toBe(true);
	});

	it('should have a selection property', () => {
		expect(component.selection instanceof SelectionModel).toBe(true);
	});

	it('should have a COLUMN_SELECT property', () => {
		expect(component.COLUMN_SELECT).toBe('select');
	});

	it('should have a COLUMN_ACTION property', () => {
		expect(component.COLUMN_ACTION).toBe('action');
	});

	describe('ngOnInit', () => {
		it('should set file on dataSource', () => {
			expect(component.dataSource.data.length).toBe(3);
		});
		it('should add extension to files', () => {
			expect(component.dataSource.data[0].extension).toBe('txt');
		});
		it('should populate fields array', () => {
			expect(component.fields).toEqual(['name', 'extension']);
		});

		it('should reload files on uploadComplete', () => {
			jest.spyOn(uploadService, 'getUploadedFiles');
			uploadComplete.next();
			expect(uploadService.getUploadedFiles).toHaveBeenCalled();
		});

		describe('should populate displayedColumns array', () => {
			it('should have 3 columns without an deleteUrl', () => {
				expect(component.displayedColumns).toEqual(['select', 'name', 'extension']);
			});

			it('should have 4 columns with an deleteUrl', () => {
				component.deleteUrl = 'some/path';
				component.ngOnInit();
				fixture.detectChanges();
				expect(component.displayedColumns).toEqual(['select', 'name', 'extension', 'action']);
			});
		});

		describe('table', () => {
			describe('with data', () => {
				it('should not show an infobox', () => {
					const el = fixture.debugElement.query(By.css('ob-alert'));
					expect(el).toBeNull();
				});

				it('should have a table with data', () => {
					const el = fixture.debugElement.query(By.css('.ob-table tbody > tr'));
					expect(el).toBeDefined();
				});
			});

			describe('with no data', () => {
				beforeEach(() => {
					jest.spyOn(uploadService, 'getUploadedFiles').mockReturnValue(of([]));
					component.ngOnInit();
					fixture.detectChanges();
				});
				it('should show an infobox', () => {
					const el = fixture.debugElement.query(By.css('ob-alert'));
					expect(el).toBeDefined();
				});

				it('should have a table with no data', () => {
					const el = fixture.debugElement.query(By.css('.ob-table tbody > tr'));
					expect(el).toBeNull();
				});
			});
		});
	});

	describe('ngOnDestroy', () => {
		it('should not reload files on uploadComplete', () => {
			jest.spyOn(uploadService, 'getUploadedFiles');
			component.ngOnDestroy();
			uploadComplete.next();
			expect(uploadService.getUploadedFiles).not.toHaveBeenCalled();
		});
	});

	describe('areAllItemsSelected', () => {
		it('should return false if not all items are selected', () => {
			component.selection.toggle(component.dataSource.data[0]);
			expect(component.areAllItemsSelected()).toBe(false);
		});
		it('should return true if all items are selected', () => {
			component.dataSource.data.forEach(file => component.selection.select(file));
			expect(component.areAllItemsSelected()).toBe(true);
		});
	});

	describe('selectOrUnselectAllItems', () => {
		it('should select all if not already', () => {
			component.selection.deselect(component.dataSource.data[0]);
			component.selectOrUnselectAllItems();
			expect(component.selection.selected.length).toBe(3);
		});

		it('should unselect all if all are selected', () => {
			component.dataSource.data.forEach(file => component.selection.select(file));
			component.selectOrUnselectAllItems();
			expect(component.selection.isEmpty()).toBe(true);
		});

		describe('should emit', () => {
			let event;
			beforeEach(done => {
				component.selection.clear();
				component.uploadEvent.subscribe(evt => {
					event = evt;
					done();
				});
				component.selectOrUnselectAllItems();
			});

			it('a "selected" event', () => {
				expect(event.type).toBe('selected');
			});

			it('selected file', () => {
				expect(event.files.length).toBe(3);
			});
		});
	});

	describe('toggle', () => {
		it('should select a row if unselected', () => {
			const file = component.dataSource.data[0];
			component.selection.deselect(file);
			component.toggle(file);
			expect(component.selection.selected.includes(file)).toBe(true);
		});

		it('should unselect a row if selected', () => {
			const file = component.dataSource[0];
			component.selection.select(file);
			component.toggle(file);
			expect(component.selection.selected.includes(file)).toBe(false);
		});
	});

	describe('delete', () => {
		it('should ask for confirmation', () => {
			component.deleteUrl = 'url';
			jest.spyOn(popupService, 'confirm');
			component.delete([files[0]]);
			expect(popupService.confirm).toHaveBeenCalled();
		});

		it('should do nothing if not confirmed', () => {
			component.deleteUrl = 'url';
			jest.spyOn(popupService, 'confirm').mockReturnValue(false);
			jest.spyOn(uploadService, 'delete');
			component.delete([files[0]]);
			expect(uploadService.delete).not.toHaveBeenCalled();
		});

		it('should do nothing if confirmed without deleteUrl', () => {
			component.deleteUrl = undefined;
			jest.spyOn(popupService, 'confirm').mockReturnValue(true);
			jest.spyOn(uploadService, 'delete').mockReturnValue(of());
			component.delete([files[0]]);
			expect(uploadService.delete).not.toHaveBeenCalled();
		});

		describe('with confirmed and deleteUrl', () => {
			beforeEach(() => {
				component.deleteUrl = 'url';
				jest.spyOn(popupService, 'confirm').mockReturnValue(true);
				jest.spyOn(uploadService, 'delete').mockReturnValue(of({}));
				component.selection.select(files[0]);
				component.selection.select(files[1]);
				component.delete([files[0]]);
			});

			it('should call delete ', () => {
				expect(uploadService.delete).toHaveBeenCalledWith('url', ['file.txt']);
			});

			it('should remove a file', () => {
				expect(component.dataSource.data.length).toBe(2);
			});

			it('should unselect the file', () => {
				expect(component.selection.isSelected(files[0])).toBe(false);
			});

			it('should not unselect the other file', () => {
				expect(component.selection.isSelected(files[1])).toBe(true);
			});
		});
	});
});
