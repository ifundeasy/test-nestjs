import {
  Req,
  Request,
  Get,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly cat: CatService) {}

  @Get('/:id?')
  async lala(@Req() req: Request): Promise<any[]> {
    try {
      const {
        params: { id },
      } = req as any;

      const query = {} as any;
      if (id) query.id = id;

      const cats = await this.cat.findAll(query);

      return cats;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
