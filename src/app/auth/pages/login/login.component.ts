import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  login(){
    this.authService.login().subscribe(auth => {
      console.log('aca');
      console.log(auth);

      if(auth.id){
        this.router.navigate(['./heroes']); 
        console.log('pasa');
      }
    });
  /*   */
  }

  ingresarSinLogin(){
    this.authService.logout();
    this.router.navigate(['./heroes']);
  }

}
