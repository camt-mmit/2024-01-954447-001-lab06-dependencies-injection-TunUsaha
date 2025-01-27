import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  linkedSignal,
  output,
} from "@angular/core";

@Component({
  selector: "app-dynamic-tels",
  imports: [],
  templateUrl: "./dynamic-tels.component.html",
  styleUrl: "./dynamic-tels.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: "region",
  },
})
export class DynamicTelsComponent {
  readonly data = input.required<{ name: string; tels: string[] }>();
  readonly labelNumber = input.required<number>();
  readonly deletionDisabled = input(false, { transform: booleanAttribute });

  readonly dataChange = output<{ name: string; tels: string[] }>();
  readonly dataDelete = output<void>();

  protected readonly name = linkedSignal(() => this.data().name);

  protected tels = linkedSignal(() =>
    (this.data().tels.length === 0 ? [""] : this.data().tels).map((value) => ({
      value,
    }))
  );

  protected readonly numberOfTels = computed(() => this.tels().length);

  constructor() {
    effect(() =>
      this.dataChange.emit({
        name: this.name(),
        tels: this.tels().map((tel) => tel.value),
      })
    );
  }

  protected addTel(): void {
    this.tels.update((tels) => {
      tels.push({ value: "" });

      return [...tels];
    });
  }

  protected deleteTel(index: number): void {
    this.tels.update((tels) => {
      tels.splice(index, 1);

      return [...tels];
    });
  }

  protected changeName(name: string): void {
    this.name.set(name);
  }

  protected changeTelValue(index: number, tel: string): void {
    this.tels.update((tels) => {
      tels[index].value = tel;

      return [...tels];
    });
  }
}
