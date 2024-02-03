import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tess',
  templateUrl: './tess.component.html',
  styleUrls: ['./tess.component.scss']
})
export class TessComponent implements OnInit {

  constructor(private authService : AuthService) { }

  testStart= ()=>{
    console.log("testStart")
    this.authService.testDiscussions();
  }

  ngOnInit(): void {
  }

}
