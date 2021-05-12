import { Component, HostListener  } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { UserService, AuthenticationService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    user: User;
    userFromApi: User;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.user = this.authenticationService.userValue;
    }

    ngOnInit() {
        this.loading = true;
        this.userService.getById(this.user.id).pipe(first()).subscribe(user => {
            this.loading = false;
            this.userFromApi = user;
        });
    }



    // @HostListener('window:beforeunload', ['$event']) doSomething(){
    //    alert("click exit button");
    //    $event.returnValue = "Are you sure?";
    // }

    // @HostListener("window:beforeunload", ["$event"]) beforeUnload($event: Event) {
    //     console.log($event)
    //   $event.returnValue =false;
    // }

    exit() { 
        //window.close();
        this.authenticationService.logout();
    }

    selectChangeHandler(event) {
        if(event.target.value === 'logout'){
            this.authenticationService.logout();
        }
    }

    
}