import { Routes } from "@angular/router";
import { ExampleDisplayPageComponent } from "./pages/example-display-page/example-display-page.component";
import { ExamplePageComponent } from "./pages/example-page/example-page.component";
import { ExampleUpdatePageComponent } from "./pages/example-update-page/example-update-page.component";
import { AssignmentComponent } from "../assignment/assignment.component";


export default [
  {
    path: "",
    component: ExamplePageComponent,
    children: [
      { path: "", redirectTo: "display", pathMatch: "full" },

      { path: "display", component: ExampleDisplayPageComponent },

      { path: "update", component: ExampleUpdatePageComponent },

      { path: "assignment", component:  AssignmentComponent},

    ],
  },
] as Routes;
