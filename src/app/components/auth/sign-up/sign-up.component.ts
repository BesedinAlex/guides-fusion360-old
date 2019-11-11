import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../auth.sass']
})
export class SignUpComponent {

  form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      inviteCode: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      group: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  signUp() {
    console.log(this.form.value);
  }
}
