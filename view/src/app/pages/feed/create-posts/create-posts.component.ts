import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

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

  constructor(private fb : FormBuilder , private authService : AuthService, private postService : PostService) { }

  ngOnInit(): void {
  }

  createPostForm = this.fb.group({
    user_id: [null, Validators.required],
    content: ['', Validators.required],
    post_type: ['', Validators.required],
    visibility: ['public', Validators.required],
  },
  { validators: this.validatePostTypeAndVisibility() }); // Add cross-field validation


  createPost = () => {
    var userId = this.authService.getUserId()
    this.createPostForm.patchValue({
      user_id : userId,
      content : this.createPostForm.get('content').value,
      post_type : 'text',
      visibility : this.createPostForm.get('visibility').value
    })
    console.log(this.createPostForm.value)
    this.postService.createPost(this.createPostForm.value)
  }

}
