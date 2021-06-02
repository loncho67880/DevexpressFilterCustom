import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  id: string;
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.id = param.get('id');
    });
  }
}
