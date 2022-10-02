import { Injectable } from '@nestjs/common';

import { Data } from './data';

@Injectable()
export class ConstantService {
  data = Data;
}
