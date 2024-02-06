import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-posts',
  templateUrl: './create-posts.component.html',
  styleUrls: ['./create-posts.component.scss']
})
export class CreatePostsComponent implements OnInit {

  validatePostTypeAndVisibility() {
    return (group: FormGroup) => {
      const postType = group.get('post_type').value;
      const visibility = group.get('visibility').value;

      if (postType === 'image' || postType === 'video') {
        if (visibility === 'private') {
          return { incompatiblePostTypeVisibility: true };
        }
      }

      return null; // No validation errors
    };
  }

  constructor(private fb : FormBuilder , private authService : AuthService) { }

  ngOnInit(): void {
  }

  createPostForm = this.fb.group({
    post_id: [null], // Assuming auto-generated, so initially set to null
    user_id: [null, Validators.required],
    content: ['', Validators.required],
    post_type: ['', Validators.required],
    visibility: ['public', Validators.required],
    reactions: this.fb.array([]), // Initialize as an empty array
  },
  { validators: this.validatePostTypeAndVisibility() }); // Add cross-field validation


  createPost = () => {
    console.log(this.createPostForm.value);
    console.log(this.authService.currentUserValue)
  }

}
