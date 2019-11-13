import { Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import { RegisterEndpoint } from "./register-endpoint.service";
import { UserEdit } from "../models/user-edit.model";


@Injectable()
export class RegisterService {

  constructor(
    private authService: AuthService,
    private registerEndpoint: RegisterEndpoint) {
  }
  registerUser(user: UserEdit) {
    return this.registerEndpoint.getRegisterUserEndpoint<UserEdit>(user);
  }

}
