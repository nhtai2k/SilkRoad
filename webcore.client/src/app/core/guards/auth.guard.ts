import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/system-services/auth.service';

export const authGuard: CanActivateFn = async () => {
  const auth: AuthService = inject(AuthService);
  const router: Router = inject(Router);
return await auth.checkLogin().toPromise().then((isAuthenticated) => {
  if (!isAuthenticated) {
    return true; // Allow access to the login page
  }
  router.navigate(['./introduction']);
  return false; // Block access to the login page
}).catch(() => {
  return true; // Allow access in case of error
});
};
