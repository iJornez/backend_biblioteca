import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class UsuarioAuthGuard extends AuthGuard('jwt') {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      return super.canActivate(context);
    }
  
    handleRequest(err: any, user: any, info: any) {
        console.log(user);
      if (err || !user) {
        throw err || new UnauthorizedException();
      }
      const rolesAllow = 'Usuario';
      if (user.rol == rolesAllow) {
        throw new UnauthorizedException(
          'El usuario no tiene los permisos necesarios',
        );
      }
      return user;
    }
  }