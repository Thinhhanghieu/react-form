import { Component, ViewChild } from '@angular/core';
import { InputAppComponent } from './input-app/input-app.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
    @ViewChild(`vcInput1`, { static: false })
    vcInput1: InputAppComponent;

    @ViewChild(`vcInput2`, { static: false })
    vcInput2: InputAppComponent;

    valueInputFirst = '';
    valueInputSecond = '';
    result: any;
    isInputValid = true;

    checkValidButton() {
        this.isInputValid = !(typeof this.vcInput1.internalValue === 'number' && typeof this.vcInput2.internalValue === 'number');
    }

    setValueInput1(data: any) {
        this.valueInputFirst = data.valueInput;
        this.checkValidButton();
        // this.isInputValid = data.isInvalid;
    }

    setValueInput2(data: any) {
        this.valueInputSecond = data.valueInput;
        // this.isInputValid = data.isInvalid;
        this.checkValidButton();
    }

    resetValue() {
        this.vcInput1.internalValue = '';
        this.vcInput2.internalValue = '';
        this.vcInput2.isInvalid = this.vcInput1.isInvalid = false;
    }
    // autoFocusInput(){
    //     this.vcInput1.
    // }
    receiveData(operator: string) {
        if (this.vcInput1.internalValue.length === 0) {
            this.vcInput1.isInvalid = true;
        }
        if (this.vcInput2.internalValue.length === 0) {
            this.vcInput2.isInvalid = true;
            return;
        }

        const value1 = parseFloat(this.vcInput1.internalValue);
        const value2 = parseFloat(this.vcInput2.internalValue);
        switch (operator) {
            case '+':
                this.result = `${value1} + ${value2} = ${value1 + value2}`;
                this.resetValue();
                this.vcInput1.autoFocus();
                this.isInputValid = true;
                break;
            case '-':
                this.result = `${value1} - ${value2} = ${value1 - value2}`;
                this.resetValue();
                this.checkValidButton();
                this.isInputValid = true;
                break;
            case 'x':
                this.result = `${value1} x ${value2} = ${value1 * value2}`;
                this.resetValue();
                this.isInputValid = true;
                break;
            case '/':
                if (value2 === 0) {
                    alert('Division by zero is not allowed.');
                    return;
                }
                this.result = `${value1} / ${value2} = ${value1 / value2}`;
                this.resetValue();
                this.isInputValid = true;
                break;
            default:
                alert('Invalid operator.');
                return;
        }
    }

    onSubmit() {
    }
}
