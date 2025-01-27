import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { DisplayTelsComponent } from "../display-tels/display-tels.component";

@Component({
  selector: "app-display-contacts",
  imports: [DisplayTelsComponent],
  templateUrl: "./display-contacts.component.html",
  styleUrl: "./display-contacts.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayContactsComponent {
  readonly data = input.required<{ name: string; tels: string[] }[]>();
}
