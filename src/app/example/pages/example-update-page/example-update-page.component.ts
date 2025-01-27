import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { DynamicContactsComponent } from "../../components/dynamic-contacts/dynamic-contacts.component";
import { ExampleDataService } from "../../services/example-data.service";

@Component({
  selector: "app-example-update-page",
  imports: [DynamicContactsComponent],
  templateUrl: "./example-update-page.component.html",
  styleUrl: "./example-update-page.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleUpdatePageComponent {
  protected readonly service = inject(ExampleDataService);

  protected readonly data = this.service.get() ?? [];
}
