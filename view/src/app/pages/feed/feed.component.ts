import { UserService } from './../../services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  constructor(public postService : PostService, private authService : AuthService, private userService : UserService) { }

  ngOnInit(): void {
    this.getPosts()
  }
  getPostData :any
  postData : any = []
  userData : any = []

  getPosts(){
    this.getPostData = new Promise<any>((response, reject)=>{
    this.postService.getAllPosts().subscribe((res: any) => {
      console.log(res);
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
      console.log(this.getPostData)
      console.log(typeof this.getPostData)
      console.log(this.postData)
      this.postData.forEach((post: any, index: any) => {
        this.getUserDetails(post, index) // fetch user details for each post by sending user_id
      })
   })
  }

  getUserDetails(data, index){
    var getUser = new Promise((resolve, reject)=>{
      try{
        this.userService.getUserById(data.user_id).subscribe((res: any) => {
         this.postData[index] = {
            ...this.postData[index],
            username: res.username,
            email: res.email,
            profilePicture: res.profilePicture,
          };

         (error: any) => {
           catchError(error)
         }
         if(this.userData){
          console.log(this.postData)
           resolve(this.userData)
         }else{
           reject("Error fetching user")
         }
     })
      }catch(err){
        console.log(err)
      }

    })
  }


}
