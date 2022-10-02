import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

export const AdminGuard = (isAdmin: boolean): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;

      return user?.isAdmin === isAdmin;
    }
  }

  return mixin(RoleGuardMixin);
};
