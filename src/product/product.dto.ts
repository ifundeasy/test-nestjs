import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

class BaseDTO {
  @IsString()
  @IsNotEmpty()
  readonly code: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly warranty: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}

export class ProductDTO extends BaseDTO {
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;
}

export class ProductCreateDTO extends BaseDTO {}

export class ProductUpdateDTO extends PartialType(BaseDTO) {}
