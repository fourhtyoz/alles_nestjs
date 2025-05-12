import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/auth/roles.enum';
import { Roles } from 'src/decorators/roles.decortator';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private userSerivce: UsersService,
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles || !roles.length) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const userId = request?.user?.userId;

        if (!userId) {
            return false;
        }

        try {
            const user = await this.userSerivce.findById(userId);
            if (!user) {
                return false;
            }
            return roles.some((role: Role) => roles.includes(role));
        } catch (e) {
            console.error('RolesGuard error', e);
            return false;
        }
    }
}
