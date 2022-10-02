import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { User, UserSchema } from '../user';

@Schema()
export class Session {
  @Prop({ unique: true, index: true, required: true })
  accessToken: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop({ type: UserSchema, required: true })
  user: User;

  @Prop({ default: now() })
  createdAt: Date;

  @Prop({ default: now() })
  updatedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
