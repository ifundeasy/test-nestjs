import {
  IsNotEmpty,
  IsArray,
  IsDate,
  IsObject,
  IsEnum,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product';
import { UserDTO } from '../user';
import { WarrantyClaimStatus } from './sold-product.schema';
import { Type } from 'class-transformer';

export class WarrantyClaimDTO {
  @IsEnum(WarrantyClaimStatus)
  @IsNotEmpty()
  status: WarrantyClaimStatus;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  updatedAt: Date;
}

class BaseDTO {
  @IsString()
  @IsNotEmpty()
  readonly saleId: string;

  @IsObject()
  @IsNotEmpty()
  readonly product: ProductDTO;

  @IsObject()
  @IsNotEmpty()
  readonly buyer: UserDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WarrantyClaimDTO)
  readonly warrantyClaims: WarrantyClaimDTO[];
}

export class SoldProductDTO extends BaseDTO {
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: Date;
}

export class SoldProductCreateDTO extends BaseDTO {}

export class SoldProductUpdateDTO extends PartialType(BaseDTO) {}
