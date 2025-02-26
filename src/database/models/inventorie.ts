import { Model, Column, Table, DataType, PrimaryKey, HasMany, BelongsTo } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";
import Products from "./products";
import Users from "./users";

@Table({ timestamps: true })
class Inventories extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4, allowNull: false })
	declare inventory_id: string;

	@BelongsTo(() => Products, "product_id")
	declare product: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare transaction_type: string;

	@Column({ type: DataType.STRING })
	declare quantity: string;

	@Column({ type: DataType.STRING })
	declare reference_number: string;

	@BelongsTo(() => Users, "user_id")
	declare perfomed_by: Users;
}
export default Inventories;
