import { Model, Table, Column, DataType, PrimaryKey, BelongsTo, HasMany } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";
import Products from "./products";

@Table({ timestamps: true })
class Categories extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare category_id: string;

	@Column({ type: DataType.STRING, allowNull: true })
	declare name: string;

	@Column({ type: DataType.STRING })
	declare description: string;

	@HasMany(() => Products)
	declare products: Products[];
}
export default Categories;
