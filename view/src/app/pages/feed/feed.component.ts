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

  // getUserDetails(data, index){
  //   var getUser = new Promise((resolve, reject)=>{
  //     try{
  //       this.userService.getUserById(data.user_id).subscribe((res: any) => {
  //        this.postData[index] = {
  //           ...this.postData[index],
  //           username: res.username,
  //           profilePicture: res.profilePicture,
  //         };

  //        (error: any) => {
  //          catchError(error)
  //        }
  //        if(this.userData){
  //          resolve(this.userData)
  //        }else{
  //          reject("Error fetching user")
  //        }
  //    })
  //     }catch(err){
  //       console.log(err)
  //     }
  //   })
  // }
}
