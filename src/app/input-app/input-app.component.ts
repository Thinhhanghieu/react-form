import { Component, Input, Output, EventEmitter, ElementRef, } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ViewChild } from '@angular/core';
interface IInputValue {
    valueInput: string;
    isInvalid: boolean;
}
@Component({
    selector: 'input-app',
    templateUrl: './input-app.component.html',
    styleUrls: [ './input-app.component.scss' ]
})
// tslint:disable-next-line:no-empty-interface

export class InputAppComponent {
    @Input() lable: string;

    @Output() eventValueChange = new EventEmitter<IInputValue>();

    // tslint:disable-next-line:variable-name
    @ViewChild('myInput' , { static: true})  _inputElement: ElementRef;


    internalValue = '';
    isInvalid = null;

    autoFocus() {
        this._inputElement.nativeElement.focus();
    }
    checkValidate(valueInput) {
        if (valueInput == null) {
            return true;
        }
        return false;
    }

    onValueChange() {
        this.isInvalid = this.checkValidate(this.internalValue);
        this.eventValueChange.emit({
            valueInput: this.internalValue,
            isInvalid: this.checkValidate(this.internalValue)
        });
    }
}
