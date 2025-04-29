import { Controller, Get } from '@nestjs/common';

@Controller()
export class RootController {
    @Get()
    home(): string {
        return 'meow';
    }
}
