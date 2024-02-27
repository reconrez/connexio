import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() postData: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.postData)
    console.log(this.postData.reactions)
  }

}
