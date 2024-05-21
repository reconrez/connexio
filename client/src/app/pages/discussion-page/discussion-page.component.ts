import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DiscussionService } from 'src/app/services/discussion.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-discussion-page',
  templateUrl: './discussion-page.component.html',
  styleUrls: ['./discussion-page.component.scss']
})
export class DiscussionPageComponent implements OnInit {

  currentUser: any
  responses : any = []
  selectedFile: File;

  constructor(
    public discussionService : DiscussionService, 
    private route: ActivatedRoute, 
    private fb : FormBuilder, 
    private user : UserService
  ) { }

  discussion : any = [];
  createResponseForm = this.fb.group({
    discussion_id: [null, Validators.required],
    user_id: [null, Validators.required],
    response: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit(): void {
    this.getResponses()
    this.currentUser= JSON.parse(localStorage.getItem('current_user'));
    console.log(this.currentUser);
    this.route.paramMap.subscribe(params => {
      let id = params.get('id')
      console.log(id)
      this.discussionService.getDiscussionById(id).subscribe(data => {
        this.discussion = data;
        console.log(this.discussion);
      })
    });
  }

  attachFile() {
    this.triggerFileSelection();
  }

  triggerFileSelection() {
    document.getElementById('fileInput').click();
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  deleteResponse(userId, id){
    if(userId === this.currentUser.user_id){
      this.discussionService.deleteResponse(id).subscribe(res=>{
        this.getResponses();
      })
    }else{
      if(this.currentUser.role === "admin"){
        this.discussionService.deleteResponse(id).subscribe(res=>{
          this.getResponses();
        })
      }else{
        console.log("You do not have permission to delete this response")
      }
    }
  }

  getResponses(){
    this.discussionService.getAllResponses(this.discussion._id).subscribe(data=>{
      console.log(data)
      console.log(data[0].response)
      this.responses = data;
      if(this.responses){
        this.responses.forEach((element, index) => {
          this.getUserData(element.user_id, index)
        });
      }
    })
  }

  getUserData(user_id, index){
    this.user.getUserById(user_id).subscribe(data=>{
      console.log(data)
      this.responses[index].username = data.username;
      this.responses[index].profilePicture = data.profilePicture
      return data;
    })

  }

  createResponse() {
    this.createResponseForm.patchValue({
      discussion_id: this.discussion._id,
      user_id: this.currentUser._id,
      response: this.createResponseForm.value.response
    })
    console.log(this.createResponseForm.value);
    this.discussionService.createResponse(this.createResponseForm.value)
    // this.getResponses()
  }

}
