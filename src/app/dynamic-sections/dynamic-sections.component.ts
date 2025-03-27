import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentRef,
  ComponentFactoryResolver,
  Inject,
} from '@angular/core';
import { DynamicInputComponent } from '../dynamic-inputs/dynamic-inputs.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dynamic-section',
  templateUrl: './dynamic-sections.component.html',
  styleUrls: ['./dynamic-sections.component.scss'],
})
export class DynamicSectionComponent implements OnInit {
  @ViewChild('sectionContainer', { read: ViewContainerRef, static: true })
  sectionContainer!: ViewContainerRef;

  private sectionRefs: Array<{
    sectionIndex: number;
    inputs: ComponentRef<DynamicInputComponent>[];
    total: number;
  }> = [];

  items: number[][] = []; // Define the items array

  constructor(
    private resolver: ComponentFactoryResolver,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    // Add Section 1 automatically when the page loads
    this.addSection();
  }

  // Add a new Section
  addSection() {
    const sectionIndex = this.sectionRefs.length + 1;

    // Create a container for the Section
    const sectionDiv = this.document.createElement('div');
    sectionDiv.className = 'section-container';
    sectionDiv.style.marginBottom = '20px';
    sectionDiv.style.padding = '15px';
    sectionDiv.style.border = '1px solid #ccc';
    sectionDiv.style.borderRadius = '8px';

    // Section title
    const sectionTitle = this.document.createElement('h3');
    sectionTitle.textContent = `Section ${sectionIndex}`;
    sectionDiv.appendChild(sectionTitle);

    // Button to add Input
    const addInputButton = this.document.createElement('button');
    addInputButton.textContent = '+ Input';
    addInputButton.className = 'btn btn-primary';
    addInputButton.style.marginRight = '10px';
    addInputButton.addEventListener('click', () => this.addInput(sectionIndex));
    sectionDiv.appendChild(addInputButton);

    // Button to remove Section
    const removeSectionButton = this.document.createElement('button');
    removeSectionButton.textContent = '🗑 Remove Section';
    removeSectionButton.className = 'btn btn-danger';
    removeSectionButton.addEventListener('click', () =>
      this.removeSection(sectionIndex),
    );
    sectionDiv.appendChild(removeSectionButton);

    // Container for Inputs
    const inputsContainer = this.document.createElement('div');
    inputsContainer.id = `inputs-container-${sectionIndex}`;
    inputsContainer.style.marginTop = '10px';
    sectionDiv.appendChild(inputsContainer);

    // Display Total of the Section
    const totalDisplay = this.document.createElement('div');
    totalDisplay.id = `total-display-${sectionIndex}`;
    totalDisplay.style.marginTop = '10px';
    totalDisplay.style.fontWeight = 'bold';
    totalDisplay.textContent = `Total: 0`;
    sectionDiv.appendChild(totalDisplay);

    // Add Section to DOM
    this.sectionContainer.element.nativeElement.appendChild(sectionDiv);

    // Save Section data
    this.sectionRefs.push({
      sectionIndex,
      inputs: [],
      total: 0,
    });

    // Automatically add the first Input to the Section
    this.addInput(sectionIndex);
  }

  // Remove a Section
  removeSection(sectionIndex: number) {
    const section = this.sectionRefs.find(
      (sec) => sec.sectionIndex === sectionIndex,
    );

    if (section) {
      // Destroy Inputs in the Section
      section.inputs.forEach((inputRef) => inputRef.destroy());

      // Remove Section from DOM
      const sectionDiv = this.document.getElementById(
        `inputs-container-${sectionIndex}`,
      )?.parentElement;

      sectionDiv?.remove();

      // Remove Section data
      this.sectionRefs = this.sectionRefs.filter(
        (sec) => sec.sectionIndex !== sectionIndex,
      );
    }
  }

  // Add an Input to a Section
  addInput(sectionIndex: number) {
    const section = this.sectionRefs.find(
      (sec) => sec.sectionIndex === sectionIndex,
    );

    if (section) {
      const inputsContainer = this.document.getElementById(
        `inputs-container-${sectionIndex}`,
      );

      if (!inputsContainer) {
        console.error(`Inputs container for section ${sectionIndex} not found`);
        return;
      }

      // Create a new DynamicInputComponent
      const factory = this.resolver.resolveComponentFactory(
        DynamicInputComponent,
      );

      const inputRef = this.sectionContainer.createComponent(factory);
      const instance = inputRef.instance as DynamicInputComponent;
      instance.index = section.inputs.length + 1; // Set Index
      instance.sectionIndex = sectionIndex; // Set Section Index

      instance.valueChange.subscribe(() =>
        this.updateSectionTotal(sectionIndex),
      );

      instance.remove.subscribe(() => this.removeInput(sectionIndex, inputRef));

      inputsContainer.appendChild(inputRef.location.nativeElement);
      section.inputs.push(inputRef);

      this.updateSectionTotal(sectionIndex);
    }
  }

  // Remove an Input and update Total
  removeInput(
    sectionIndex: number,
    inputRef: ComponentRef<DynamicInputComponent>,
  ) {
    const section = this.sectionRefs.find(
      (sec) => sec.sectionIndex === sectionIndex,
    );

    if (section) {
      const index = section.inputs.indexOf(inputRef);

      if (index !== -1) {
        section.inputs.splice(index, 1);
        inputRef.destroy();

        // Reset Index numbers
        section.inputs.forEach((input, idx) => {
          input.instance.index = idx + 1;
        });

        this.updateSectionTotal(sectionIndex);
      }
    }
  }

  // Update Total for a specified Section
  private updateSectionTotal(sectionIndex: number) {
    const section = this.sectionRefs.find(
      (sec) => sec.sectionIndex === sectionIndex,
    );

    if (section) {
      section.total = section.inputs.reduce(
        (sum, input) => sum + (input.instance.value || 0),
        0,
      );

      const totalDisplay = this.document.getElementById(
        `total-display-${sectionIndex}`,
      );

      if (totalDisplay) {
        totalDisplay.textContent = `Total: ${section.total}`;
      }
    }
  }

  // Updates the values of the items array at the specified index.
  changeItemValue(index: number, value: number[]): void {
    // Ensure the items array has enough space
    while (this.items.length <= index) {
      this.items.push([]);
    }

    // First, empty the array.
    this.items[index].splice(0, this.items[index].length);

    // Then add the updated values to the old array.
    value.forEach((val) => this.items[index].push(val));
  }
}
