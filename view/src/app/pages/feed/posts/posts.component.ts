import { ProfileComponent } from './../../user/profile/profile.component';
import { PostService } from './../../../services/post.service';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  @Input() postData: any;
  constructor(public postService : PostService, private fb : FormBuilder) { }

  commentsData = this.fb.group({
    comment: new FormControl('', [Validators.required, Validators.minLength(1)]),
    username: ['', Validators.required],
    profilePicture: ['', Validators.required],
    user_id: ['', Validators.required],
    post_id: ['', Validators.required]
  })

  currentUser = JSON.parse(localStorage.getItem('current_user'));
  like = new BehaviorSubject(false)
  userIndex = 0
  commentsHide : boolean = false;
  commentSuccessMessage = ''; // Initially empty
  initialHeight : any

  ngOnInit(): void {
    this.like.subscribe()
    this.checkLike()
    console.log(this.postData)
  }

  ngAfterViewInit(){
   this.initialHeight = document.getElementsByClassName('post-container')
   console.log(this.initialHeight)
  }

  boxTransition(){
    this.initialHeight = document.getElementsByClassName('post-container').item(0).clientHeight
    console.log(this.initialHeight)
  }

  commentsVisibility(){
    this.commentsHide = !this.commentsHide;
    this.boxTransition()
    this.fetchComments();
  }

  checkLike(){
    if((this.postData.like).length > 0){
      (this.postData.like).forEach((element, index) => {
        if(element.username === this.currentUser.username){
          this.like.next(true);
          this.userIndex = index;
          console.log(`value exists ${this.like.value}`)
        }else{
          this.like.next(false)
          console.log(`value doesnot exit ${this.like.value}`)
        }
      });
    }else{
      console.log(`================= array doesn't exist`)
    }
  }

  sendLike(){
    // this.checkLike()
    if(this.like.value){
      console.log("Data exists, removal in progress")
      this.postData.like.splice(this.userIndex, 1)
      this.like.next(false)
    }else{
      console.log("Data doesnot exist, adding data")
      this.postData.like.push(
        {
          user_id: this.currentUser.user_id,
          username: this.currentUser.username,
          profilePicture: this.currentUser.profilePicture
        }
      )
      this.like.next(true)
    }
    console.log(`postData ${this.postData}`)
    console.log(this.like)
    this.postService.updatePost(this.postData._id, this.postData).subscribe(data =>{
      console.log(data)
    })
  }

  publishComment(){
    this.commentsData.patchValue({
      username: this.currentUser.username,
      profilePicture: this.currentUser.profilePicture,
      user_id: this.currentUser.user_id,
      comment : this.commentsData.get('comment').value,
      post_id : this.postData.post_id
    })
    console.log(`Comment: ================== ${JSON.stringify(this.commentsData.value)}`);
    this.postService.createComment(this.commentsData.value) 
    this.commentsData.patchValue({comment : ''}); 
    this.commentSuccessMessage = 'Your comment has been published!';
    setTimeout(() => {
      this.commentSuccessMessage = '';
    }, 3000);
    this.fetchComments();
  }

  fetchComments(){
    this.postService.getAllComments().subscribe(data => {
      console.log(data)
      this.postData.comments = data
      console.log(this.postData)
    })
  }
}
