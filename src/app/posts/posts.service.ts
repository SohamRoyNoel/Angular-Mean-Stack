import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PostServices {
    private posts : Post[] = []; // most Model
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(){
        this.http.get<{ message: String, posts: Post[]}>('http://localhost:3000/api/posts').subscribe((postData)=>{
            this.posts = postData.posts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListner(){
        return this.postsUpdated.asObservable();
    }

    addPost(ttl: String, ct: String){
        const post: Post = {id:null,  title : ttl, content : ct};
        this.http.post<{message: String}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
            console.log(responseData.message);
            this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        });
        
    }
}