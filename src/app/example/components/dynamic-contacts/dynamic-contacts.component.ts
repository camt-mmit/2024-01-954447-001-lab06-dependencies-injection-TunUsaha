import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
} from "@angular/core";
import { DynamicTelsComponent } from "../dynamic-tels/dynamic-tels.component";

@Component({
  selector: "app-dynamic-contacts",
  imports: [DynamicTelsComponent],
  templateUrl: "./dynamic-contacts.component.html",
  styleUrl: "./dynamic-contacts.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicContactsComponent {
  readonly data = input.required<{ name: string; tels: string[] }[]>();

  readonly dataChange = output<{ name: string; tels: string[] }[]>();

  readonly items = linkedSignal(() =>
    this.data().length === 0 ? [{ name: "", tels: [] }] : this.data()
  );

  constructor() {
    effect(() => this.dataChange.emit(this.items()));
  }

  protected addItem(): void {
    this.items().push({ name: "", tels: [] });
  }

  protected deleteItem(index: number): void {
    this.items.update((items) => {
      items.splice(index, 1);

      return [...items];
    });
  }

  protected changeItem(
    index: number,
    value: { name: string; tels: string[] },
  ): void {
    this.items.update((items) => {
      items[index].name = value.name;
      items[index].tels = value.tels;

      return [...items];
    });
  }
}
