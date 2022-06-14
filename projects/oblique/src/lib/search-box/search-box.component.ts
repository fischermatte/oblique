import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Inject,
	Input,
	Optional,
	QueryList,
	ViewChild,
	ViewChildren,
	ViewEncapsulation
} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ObDropdownComponent} from '../dropdown/dropdown.component';
import {ObISearchWidgetItem} from './search-box.model';
import {ObUseObliqueIcons} from '../icon/icon.model';

let nextId = 0;

/**
 * TODO this really needs some refactoring, but until Oblique 7, this is the only solution to avoid a breaking change
 */
@Component({
	selector: 'ob-search-box',
	exportAs: 'obSearchBox',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './search-box.component.html',
	styleUrls: ['./search-box.component.scss', '../nav-tree/nav-tree.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {class: 'ob-search-box', role: 'search'}
})
export class ObSearchBoxComponent {
	@Input() items: ObISearchWidgetItem[] = [];
	@Input() placeholder = 'i18n.oblique.search.placeholder';
	@Input() minPatternLength = 1;
	@Input() maxResults = 10;
	@Input() @HostBinding('class.ob-slide-control') slide = true;
	filteredItems: ObISearchWidgetItem[] = [];
	isOpened = false;
	id = `search-input-${nextId++}`;
	@HostBinding('class.ob-font-awesome') useFontAwesomeIcon: boolean;
	private active: number;
	@ViewChildren('link') private readonly links: QueryList<ElementRef>;
	@ViewChild(ObDropdownComponent) private readonly dropdown: ObDropdownComponent;

	private patternInternal: string;

	get pattern(): string {
		return this.patternInternal;
	}

	@Input() set pattern(pattern: string) {
		this.patternInternal = pattern;
		this.filteredItems = this.items.filter(this.filterItems.bind(this)).slice(0, this.maxResults);
		this.toggle(this.pattern.length >= this.minPatternLength);
	}

	constructor(private readonly translate: TranslateService, @Optional() @Inject(ObUseObliqueIcons) useObliqueIcon) {
		this.useFontAwesomeIcon = !(useObliqueIcon ?? true);
	}

	open(): void {
		this.toggle(true);
	}

	close(): void {
		this.toggle(false);
	}

	@HostListener('keydown.arrowdown', ['$event']) navigateDown($event: KeyboardEvent): void {
		this.focusLink(this.active === undefined ? 0 : (this.active + 1) % this.filteredItems.length);
		if ($event) {
			$event.preventDefault();
		}
	}

	@HostListener('keydown.arrowup', ['$event']) navigateUp($event: KeyboardEvent): void {
		this.focusLink(
			this.active === undefined ? this.filteredItems.length - 1 : (this.active - 1 + this.filteredItems.length) % this.filteredItems.length
		);
		if ($event) {
			$event.preventDefault();
		}
	}

	@HostListener('keydown.escape') exit(): void {
		this.pattern = '';
		this.filteredItems = [];
		this.active = undefined;
	}

	formatter(label: string, filterPattern?: string): string {
		const pattern = (filterPattern || '').replace(/[.*+?^@${}()|[\]\\]/g, '\\$&');
		return pattern ? label.replace(new RegExp(pattern, 'ig'), text => `<span class="ob-highlight">${text}</span>`) : label;
	}

	focus(): void {
		if (this.pattern?.length >= this.minPatternLength) {
			this.toggle(true);
		}
	}

	blur(): void {
		this.toggle(false);
	}

	click(evt: MouseEvent): void {
		// avoid to trigger a toggle on the dropdown component
		evt.stopPropagation();
	}

	private toggle(state: boolean): void {
		this.isOpened = state;
		this.dropdown.expandedOrUndefined = state;
		this.dropdown.isOpen = state;
	}

	private filterItems(item: ObISearchWidgetItem): boolean {
		return (
			this.pattern.length >= this.minPatternLength &&
			new RegExp(this.pattern.replace(/[.*+?^@${}()|[\]\\]/g, '\\$&'), 'gi').test(this.translate.instant(item.label))
		);
	}

	private focusLink(index: number): void {
		this.active = index;
		this.links.toArray()[this.active].nativeElement.focus();
	}
}
