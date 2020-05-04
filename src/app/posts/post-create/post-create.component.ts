import { Component, Output, EventEmitter } from '@angular/core';
import { Post } from '../posts.model';
import { NgForm } from '@angular/forms';
import { PostServices } from '../posts.service';

@Component({
    selector : 'app-post-create',
    templateUrl : './post-create.component.html',
    styleUrls : ['./post-create.component.css']
})
export class PostCreateComponent {

    constructor(public postServices: PostServices){}

    onAddPost(form: NgForm){

        if(form.invalid){
            return;
        }
        this.postServices.addPost(form.value.title, form.value.content);
        form.reset();
    }
}