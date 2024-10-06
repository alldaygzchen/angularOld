import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('NewUser', [
          Validators.required,
          this.forbiddenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([
        new FormControl('music'),
        new FormControl('sports'),
      ]),
    });
    // this.signupForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // })
    // this.signupForm.statusChanges.subscribe((value) => {
    //   console.log(value);
    // });
    // this.signupForm.setValue({
    //   userData: {
    //     username: 'Max',
    //     email: 'max@example.com',
    //   },
    //   gender: 'male',
    //   hobbies: ['eatting', 'sleeping'],
    // });
    // this.signupForm.patchValue({
    //   userData: {
    //     username: 'Max',
    //     email: 'max@example.com',
    //   },
    // });
  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      userData: { username: 'NewUser' },
      gender: 'male',
      hobbies: ['music', 'sports'],
    });
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    // return (<FormArray>this.signupForm.get('hobbies')).controls;
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    // console.log('control.value', control.value);
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
