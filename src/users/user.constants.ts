import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class UsersConstants {
  private userName: String;
  private userId: String;

  setUserName(userName: String) {
    this.userName = userName;
  }
  getUserName() {
    return this.userName;
  }

  setUserId(userId: String) {
    this.userId = userId;
  }
  getUserId() {
    return this.userId;
  }
}
