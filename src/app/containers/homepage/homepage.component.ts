import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  form: FormGroup;
  http: HttpClient;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  //private returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    http: HttpClient
  ) {
    this.http = http;
    //this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    //await this.router.navigate([this.returnUrl]);
  }

  async onSubmit(): Promise<void> {
    let user = new User();
    this.loginInvalid = false;
    this.formSubmitAttempt = false;
    if (this.form.valid) {
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      this.callLogin(username, password).subscribe(
        (result: any) => {
          if(!!result) {
            sessionStorage.setItem('localUser', JSON.stringify(result));
            user = JSON.parse(sessionStorage.getItem('localUser') || '{}') as User;
            if(user.login == 'admin'){
              this.router.navigate(['admin']);
            }
            else{
              this.router.navigate(['prenotazione']);
            }
          }
        },
        error => {
          console.log('error');
        }
      );
      // try {
      //   const username = this.form.get('username')?.value;
      //   const password = this.form.get('password')?.value;
      //   await this.authService.login(username, password);
      // } catch (err) {
      this.loginInvalid = true;
      // }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  callLogin(username: string, password: string){
    const url = 'http://localhost:8081/cliente/login'
    const body =  { username: username, password: password};
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    return this.http.post( url, body, {headers: headers, responseType: 'json'})
      .pipe(
        // map (data => data) da inserire gestione errori
      );
  }
}
