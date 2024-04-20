import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { catchError } from 'rxjs';
import { DecendingPipe } from 'src/app/pipes/decending.pipe';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {

  constructor(
    public postService : PostService,
    private authService : AuthService,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.getPosts()
  }
  getPostData :any
  postData : any = []
  userData : any = []

  getPosts(){
    this.getPostData = new Promise<any>((response, reject)=>{
    this.postService.getAllPosts().subscribe((res: any) => {
      this.postData = res;
      (error: any) => {
        catchError(error)
      }
      if(this.postData){
        response(this.postData)
       }else{
        reject("Error fetching posts")
       }
     }) //fetch all the posts
    })
   this.getPostData.then(()=>{
    console.log(this.postData)
    })
  }
}
