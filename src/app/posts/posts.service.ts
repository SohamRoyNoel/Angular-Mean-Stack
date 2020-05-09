import { Post } from './posts.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostServices {
    private posts : Post[] = []; // most Model
    private postsUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts(){
        this.http.get<{ message: String, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((Postdata) => {
            return Postdata.posts.map(post =>{
                return{
                    title : post.title,
                    content : post.content,
                    id: post._id
                }  
            });
        }) )
        .subscribe((tpostData)=>{
            this.posts = tpostData;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListner(){
        return this.postsUpdated.asObservable();
    }

    addPost(ttl: String, ct: String){
        const post: Post = {id:null,  title : ttl, content : ct};
        this.http.post<{message: String, postId: String}>('http://localhost:3000/api/posts', post).subscribe((responseData)=>{
            const recentlyAddedPostIDToHandelNullIDInsertion = responseData.postId; // get recently added postID of the post
            post.id = recentlyAddedPostIDToHandelNullIDInsertion; // assign it to the post array
            this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        });
        
    }

    deletePost(id:String){
        this.http.delete('http://localhost:3000/api/delete/' + id).subscribe(() => {
            // after delete remove the data without refreshing    
            const updatedpost = this.posts.filter(p => p.id != id);
            this.posts = updatedpost;
            this.postsUpdated.next([...this.posts]);
        }); 
    }
}