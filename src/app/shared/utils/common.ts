import { Injectable, Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonUtils {
  getInitials(fullName: string) {
    // tslint:disable-next-line: prefer-const
    let names = fullName.split(' '),
        initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }

    return initials;
  }

  newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      // tslint:disable-next-line: no-bitwise
      const r = Math.random() * 16 | 0,
        // tslint:disable-next-line: no-bitwise
        v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
