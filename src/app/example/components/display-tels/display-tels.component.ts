import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from "@angular/core";

@Component({
  selector: "app-display-tels",
  imports: [],
  templateUrl: "./display-tels.component.html",
  styleUrl: "./display-tels.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayTelsComponent {
  readonly data = input.required<{ name: string; tels: string[] }>();
  readonly labelNumber = input.required<number>();

  protected readonly numberOfTels = computed(() => this.data().tels.length);
}
