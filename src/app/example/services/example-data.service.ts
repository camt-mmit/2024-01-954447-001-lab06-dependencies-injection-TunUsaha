import { Injectable } from "@angular/core";

const keyName = "example-data";

@Injectable({
  providedIn: "root",
})
export class ExampleDataService {
  get(): { name: string; tels: string[] }[] | null {
    const jsonText = localStorage.getItem(keyName);

    return JSON.parse(jsonText ?? "null");
  }

  set(value: { name: string; tels: string[] }[]): void {
    const jsonText = JSON.stringify(value);

    localStorage.setItem(keyName, jsonText);
  }
}
