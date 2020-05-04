import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../posts.model';
import { PostServices } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts :Post[] = [];
  private postSub : Subscription;

  constructor(public postServicevar : PostServices) { }
  

  ngOnInit() {

    this.postServicevar.getPosts();
    this.postSub = this.postServicevar.getPostUpdateListner().subscribe((posts)=>{
      this.posts = posts;
    });

  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }
}
