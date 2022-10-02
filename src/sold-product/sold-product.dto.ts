import { IsNotEmpty, IsArray, IsDate, IsObject, IsEnum } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

import { ProductDTO } from '../product';
import { UserDTO } from '../user';
import { WarrantyClaimStatus } from './sold-product.schema';

export class WarrantyClaimDTO {
  @IsEnum(WarrantyClaimStatus)
  @IsNotEmpty()
  readonly status: string;

  @IsDate()
  @IsNotEmpty()
  readonly createdAt: boolean;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: boolean;
}

class BaseDTO {
  @IsObject()
  @IsNotEmpty()
  readonly product: ProductDTO;

  @IsObject()
  @IsNotEmpty()
  readonly buyer: UserDTO;

  @IsArray()
  readonly warrantyClaims: [WarrantyClaimDTO];
}

export class SoldProductDTO extends BaseDTO {
  @IsDate()
  @IsNotEmpty()
  readonly createdAt: boolean;

  @IsDate()
  @IsNotEmpty()
  readonly updatedAt: boolean;
}

export class SoldProductCreateDTO extends BaseDTO {}

export class SoldProductUpdateDTO extends PartialType(BaseDTO) {}
