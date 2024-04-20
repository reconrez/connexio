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
    this.setupIntersectionObserver();
  }
  getPostData :any
  postData : any = []
  userData : any = []
  displayedPosts: any = []; // Array to hold currently displayed posts
  currentPage = 1;
  pageSize = 2; // Number of posts to show per page
  hasMorePosts = true;
  isLoading = false; // Flag to indicate loading state

  getPosts(){
    this.getPostData = new Promise<any>((response, reject)=>{
    this.postService.getAllPosts().subscribe((res: any) => {
      this.postData = res;
      this.displayedPosts = this.postData.slice(0, this.pageSize);
      this.isLoading = false; // Set loading flag to false
      (error: any) => {
        catchError(error)
        this.isLoading = false; // Set loading flag to false
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
  trackByPostId(index, post): number {
    return post.id; // Ensure proper tracking by unique post ID
  }
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && this.hasMorePosts && !this.isLoading) {
        console.log("loaing more posts");
        this.loadMorePosts();
      }
    });
    observer.observe(document.body);
  }

  loadMorePosts() {
    console.log(this.currentPage, this.pageSize );
    this.isLoading = true; // Set loading flag to true
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedPosts = this.postData.slice(0, endIndex);
    this.currentPage++;

    // Check if there are more posts to load
    this.hasMorePosts = endIndex < this.postData.length;
    this.isLoading = false; // Set loading flag to false
  }
}
