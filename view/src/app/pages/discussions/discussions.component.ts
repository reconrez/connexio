import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscussionService } from 'src/app/services/discussion.service'; // Replace with your discussion service
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-discussions',
  templateUrl: './discussions.component.html',
  styleUrls: ['./discussions.component.scss']
})
export class DiscussionsComponent implements OnInit {

  currentUser: any;
  getDiscussionData : any
  discussionData : any = []

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private discussionService: DiscussionService,
    private router : Router
  ) { } // Update service

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('current_user'));
    console.log(this.currentUser);
    this.getDiscussions();
  }

  openDiscussions = (discussion) => {
    console.log(discussion.discussion_id);
    this.router.navigate(['/discussion', discussion._id]);
  }
 
  createDiscussionForm = this.fb.group({
    user_id: [null, Validators.required],
    username: [null, Validators.required],
    profilePicture: [null, Validators.required],
    topic: ['', [Validators.required, Validators.minLength(3)]], // Add title field for discussions
    content: ['', [Validators.required, Validators.minLength(3)]],
    visibility: ['public', Validators.required],
  });

  createDiscussion = () => {
    console.log("hello")
    this.createDiscussionForm.patchValue({
      user_id: this.currentUser.user_id,
      username: this.currentUser.username,
      profilePicture: this.currentUser.profilePicture,
      topic: this.createDiscussionForm.get('topic').value,
      content: this.createDiscussionForm.get('content').value,
      visibility: this.createDiscussionForm.get('visibility').value
    })
    console.log(this.createDiscussionForm.value)
    this.discussionService.createDiscussion(this.createDiscussionForm.value) // Update service call
  }

  getDiscussions(){
    this.getDiscussionData = new Promise<any>((response, reject)=>{
    this.discussionService.getAllDiscussions().subscribe((res: any) => {
      this.discussionData = res;
      console.log(this.discussionData);
      (error: any) => {
        catchError(error)
      }
      if(this.discussionData){
        response(this.discussionData)
       }else{
        reject("Error fetching posts")
       }
     }) //fetch all the posts
    })
   this.getDiscussionData.then(()=>{
    console.log(this.discussionData)
    })
  }
}
