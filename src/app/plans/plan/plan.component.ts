import {Component, OnInit} from "@angular/core";
import {PlanService} from "../../service/plan.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css']
})
export class PlanComponent implements OnInit {

  constructor(private planService: PlanService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let id = params['id']

      this.planService.get(id).subscribe(plan => {
        this.planService.setSelected(plan)
      })
    })

  }

}
