import {TestBed} from '@angular/core/testing';
import {Observable, Subject} from 'rxjs';
import {ObMasterLayoutFooterService} from './master-layout-footer.service';
import {ObIMasterLayoutEvent} from '../master-layout.model';

describe('MasterLayoutFooterService', () => {
	let masterLayoutFooterService: ObMasterLayoutFooterService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ObMasterLayoutFooterService]
		});
		masterLayoutFooterService = TestBed.inject(ObMasterLayoutFooterService);
	});

	it('should be created', () => {
		expect(masterLayoutFooterService).toBeTruthy();
	});

	describe('test configEvents$', () => {
		it('should get configEvents  when true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'configEvents$', 'get');
			let newValue: Observable<ObIMasterLayoutEvent> = new Subject<ObIMasterLayoutEvent>();
			newValue = masterLayoutFooterService.configEvents$;
			const mockResult = masterLayoutFooterService.configEvents$;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});
	});

	describe('test isCustom', () => {
		it('should set custom to true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isCustom', 'set');
			const newValue = true;
			masterLayoutFooterService.isCustom = newValue;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.isCustom).toBeTruthy();
			spy.mockRestore();
		});

		it('should set custom to false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isCustom', 'set');
			const newValue = false;
			masterLayoutFooterService.isCustom = newValue;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.isCustom).toBeFalsy();
			spy.mockRestore();
		});

		it('should get custom  when true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isCustom', 'get');
			const newValue = true;
			masterLayoutFooterService.isCustom = newValue;
			const mockResult = masterLayoutFooterService.isCustom;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});

		it('should get custom  when false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isCustom', 'get');
			const newValue = false;
			masterLayoutFooterService.isCustom = newValue;
			const mockResult = masterLayoutFooterService.isCustom;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});
	});

	describe('test hasLogoOnScroll', () => {
		it('should set hasLogoOnScroll to true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'hasLogoOnScroll', 'set');
			masterLayoutFooterService.hasLogoOnScroll = true;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.hasLogoOnScroll).toBeTruthy();
			spy.mockRestore();
		});

		it('should set hasLogoOnScroll to false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'hasLogoOnScroll', 'set');
			masterLayoutFooterService.hasLogoOnScroll = false;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.hasLogoOnScroll).toBeFalsy();
			spy.mockRestore();
		});

		it('should get hasLogoOnScroll  when true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'hasLogoOnScroll', 'get');
			const newValue = true;
			masterLayoutFooterService.hasLogoOnScroll = newValue;
			const mockResult = masterLayoutFooterService.hasLogoOnScroll;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});

		it('should get hasLogoOnScroll  when false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'hasLogoOnScroll', 'get');
			const newValue = false;
			masterLayoutFooterService.hasLogoOnScroll = newValue;
			const mockResult = masterLayoutFooterService.hasLogoOnScroll;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});
	});

	describe('test isSticky', () => {
		it('should set isSticky to true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isSticky', 'set');
			masterLayoutFooterService.isSticky = true;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.isSticky).toBeTruthy();
			spy.mockRestore();
		});

		it('should set isSticky to false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isSticky', 'set');
			masterLayoutFooterService.isSticky = false;
			expect(spy).toHaveBeenCalled();
			expect(masterLayoutFooterService.isSticky).toBeFalsy();
			spy.mockRestore();
		});

		it('should get isSticky  when true', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isSticky', 'get');
			const newValue = true;
			masterLayoutFooterService.isSticky = newValue;
			const mockResult = masterLayoutFooterService.isSticky;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});

		it('should get isSticky  when false', () => {
			const spy = jest.spyOn(masterLayoutFooterService, 'isSticky', 'get');
			const newValue = false;
			masterLayoutFooterService.isSticky = newValue;
			const mockResult = masterLayoutFooterService.isSticky;
			expect(spy).toHaveBeenCalled();
			expect(mockResult).toEqual(newValue);
			spy.mockRestore();
		});
	});
});
