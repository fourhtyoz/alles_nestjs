import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// TODO: make a query
export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
