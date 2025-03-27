import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic-input',
  templateUrl: './dynamic-inputs.component.html',
  styleUrls: ['./dynamic-inputs.component.scss'],
})
export class DynamicInputComponent implements OnInit {
  @Input() index: number = 0; // Index of the input within the section
  @Input() sectionIndex: number = 0; // Index of the parent section
  @Output() remove = new EventEmitter<void>(); // Emits when the input is removed
  @Output() valueChange = new EventEmitter<number>(); // Emits when the value changes

  value: number = 0; // Holds the current value of the input

  ngOnInit() {
    // Retrieve the value from localStorage if it exists
    const storedData = localStorage.getItem('dynamicInputData');
    if (storedData) {
      const data: number[][] = JSON.parse(storedData);
      if (
        data[this.sectionIndex] &&
        data[this.sectionIndex][this.index] !== undefined
      ) {
        this.value = data[this.sectionIndex][this.index];
      }
    }
  }

  /**
   * Handles changes to the input value and emits the updated value.
   * @param event - The input change event
   */
  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value = parseFloat(inputElement.value) || 0; // Convert value to number or default to 0
    this.valueChange.emit(this.value); // Notify the parent about the value change
    this.storeData(); // Store the updated value in localStorage
  }

  /**
   * Emits an event to notify the parent component to remove this input.
   */
  onRemove() {
    this.remove.emit();
    this.storeData(); // Update localStorage after removal
  }

  /**
   * Stores the current data in localStorage.
   */
  private storeData() {
    const storedData = localStorage.getItem('dynamicInputData');
    let data: number[][] = storedData ? JSON.parse(storedData) : [];

    // Ensure the data array has enough space
    while (data.length <= this.sectionIndex) {
      data.push([]);
    }
    while (data[this.sectionIndex].length <= this.index) {
      data[this.sectionIndex].push(0);
    }

    // Update the value
    data[this.sectionIndex][this.index] = this.value;

    // Save back to localStorage
    localStorage.setItem('dynamicInputData', JSON.stringify(data));
  }
}
