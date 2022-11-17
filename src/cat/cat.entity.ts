import {
  Table,
  Column,
  Model,
  BelongsToMany,
  HasMany,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Cat extends Model {
  @Column
  name: string;

  @Column
  age: number;

  @Column
  breed: string;

  @BelongsToMany(() => Food, {
    through: { model: () => Eat },
  })
  foods!: Food[];

  @HasMany(() => Eat, {
    onDelete: 'CASCADE',
    // as: 'eatAlias',
  })
  eats!: Eat[];
}

@Table
export class Food extends Model {
  @Column
  name: string;

  @BelongsToMany(() => Cat, {
    through: { model: () => Eat },
  })
  cats!: Cat[];

  @HasMany(() => Eat, {
    onDelete: 'CASCADE',
  })
  eats!: Eat[];
}

@Table
export class Eat extends Model {
  @BelongsTo(() => Cat)
  cat!: Cat;

  @ForeignKey(() => Cat)
  @PrimaryKey
  @Column
  catId!: number;

  @BelongsTo(() => Food)
  food!: Food;

  @ForeignKey(() => Food)
  @PrimaryKey
  @Column
  foodId!: number;

  @Column
  qty: number;
}
