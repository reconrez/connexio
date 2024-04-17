import { ProfileComponent } from './../../user/profile/profile.component';
import { PostService } from './../../../services/post.service';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('out', style({ opacity: 0 })),
      transition('void => in', [
        style({ opacity: 0 }),
        animate('200ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class PostsComponent implements OnInit {

  isDeleteIconVisible = false; // Flag to track visibility

  @ViewChild('deleteIcon', { static: true }) deleteIconRef: ElementRef;

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
    this.postData.comments = [];
  }

  // ngAfterViewInit(){
  //  this.initialHeight = document.getElementsByClassName('post-container')
  //  console.log(this.initialHeight)
  // }

  boxTransition(){
    this.initialHeight = document.getElementsByClassName('post-container').item(0).clientHeight
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
        }else{
          this.like.next(false)
        }
      });
    }else{
      console.log(`================= array doesn't exist`)
    }
  }

  sendLike(){
    // this.checkLike()
    if(this.like.value){
      this.postData.like.splice(this.userIndex, 1)
      this.like.next(false)
    }else{
      this.postData.like.push(
        {
          user_id: this.currentUser.user_id,
          username: this.currentUser.username,
          profilePicture: this.currentUser.profilePicture
        }
      )
      this.like.next(true)
    }
    this.postService.updatePost(this.postData._id, this.postData).subscribe(data =>{
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
    console.log(this.postData.post_id)
    this.postService.getAllComments(this.postData.post_id).subscribe(data => {
      console.log(data)
      this.postData.comments = data
      console.log(this.postData)
    })
  }

  deleteComment(_id){
    console.log(_id)
    this.postService.deleteComment(_id).subscribe(data => {
      this.fetchComments()
      console.log('success')
      console.log(data)
    })
  }

  enableDeleteButton() {
    this.isDeleteIconVisible = true;
  }
}
