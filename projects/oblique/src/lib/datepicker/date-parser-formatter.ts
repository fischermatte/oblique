import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ObDateDMYParserFormatter extends NgbDateParserFormatter {
	parse(value: string): NgbDateStruct {
		if (value) {
			const dateParts = value.trim().split('.');
			if (dateParts.length === 1 && isNumber(dateParts[0])) {
				return {year: toInteger(dateParts[0]), month: null, day: null};
			} else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
				return {year: toInteger(dateParts[1]), month: toInteger(dateParts[0]), day: null};
			} else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
				return {year: toInteger(dateParts[2]), month: toInteger(dateParts[1]), day: toInteger(dateParts[0])};
			}
		}
		return null;
	}

	format(date: NgbDateStruct): string {
		return date ? `${isNumber(date.day) ? padNumber(date.day) : ''}.${isNumber(date.month) ? padNumber(date.month) : ''}.${date.year}` : '';
	}
}

function padNumber(value: number): string {
	if (isNumber(value)) {
		return `0${value}`.slice(-2);
	}
	return '';
}

function isNumber(value: any): value is number {
	return !isNaN(toInteger(value));
}

export function toInteger(value: any): number {
	// fixing this would be a breaking change
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return parseInt(`${value}`, 10);
}
