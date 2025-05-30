import { Model, Column, Table, DataType, PrimaryKey, HasMany, BelongsTo, ForeignKey } from "sequelize-typescript";
import Products from "./products";

@Table({ timestamps: true })
class Users extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare user_id: string;

	@Column({ type: DataType.STRING, allowNull: false, unique: true })
	declare email: string;

	@Column({ type: DataType.STRING })
	declare password: string;

	@Column({ type: DataType.STRING })
	declare fullName: string;

	@Column({ type: DataType.STRING })
	declare gender: string;

	@Column({ type: DataType.ENUM("user", "admin"), allowNull: true, defaultValue: "user" })
	declare role: "user" | "admin";

	@Column({ type: DataType.STRING, allowNull: true })
	declare status: string;

	@HasMany(() => Products, { foreignKey: "user_id" })
	declare product: Products[];
}
export default Users;
