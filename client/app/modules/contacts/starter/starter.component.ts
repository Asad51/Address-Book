import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-starter",
  templateUrl: "./starter.component.html",
  styleUrls: ["./starter.component.scss"]
})
export class StarterComponent {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  onAddContact() {
    this.router.navigate(["add"], {
      relativeTo: this.activatedRoute,
      skipLocationChange: true
    });
  }
}
