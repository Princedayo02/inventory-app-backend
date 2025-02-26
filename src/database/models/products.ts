import { Model, Column, Table, DataType, PrimaryKey, HasMany, BelongsTo } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";
import Categories from "./categories";
import Users from "./users";

@Table({ timestamps: true })
class Products extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
	declare product_id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare name: string;

	@Column({ type: DataType.STRING })
	declare description: string;

	@Column({ type: DataType.STRING })
	declare sku: string;

	@HasMany(() => Categories, "category_id")
	declare category_id: Categories[];

	@Column({ type: DataType.INTEGER })
	declare unit_price: number;

	@Column({ type: DataType.INTEGER })
	declare quantity_in_stock: number;

	@Column({ type: DataType.STRING })
	declare reorder_level: string;

	@HasMany(() => Users, "user_id")
	declare created_by: Users[];
}

export default Products;
