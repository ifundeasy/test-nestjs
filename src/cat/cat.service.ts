import { Injectable, Inject } from '@nestjs/common';
import { Cat, Food, Eat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @Inject('CATS_REPOSITORY')
    private catsRepository: typeof Cat,
  ) {}

  async findAll(param: any): Promise<Cat[]> {
    return this.catsRepository.findAll<Cat>({
      where: { ...param },
      include: [
        {
          model: Food,
          as: 'foods',
          through: { model: Eat, as: 'eats', attributes: ['qty'] } as any,
        },
      ],
    });
  }
}
