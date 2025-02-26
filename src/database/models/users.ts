import { Model, Column, Table, DataType, PrimaryKey, HasMany, BelongsTo } from "sequelize-typescript";
import { toDefaultValue } from "sequelize/types/utils";

@Table({ timestamps: true })
class Users extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, allowNull: false, defaultValue: DataType.UUIDV4 })
	declare user_id: string;

	@Column({ type: DataType.STRING, allowNull: false })
	declare email: string;

	@Column({ type: DataType.STRING })
	declare password: string;

	@Column({ type: DataType.ENUM("user", "admin"), allowNull: true, defaultValue: "user" })
	declare role: "user" | "admin";

	@Column({ type: DataType.STRING, allowNull: true })
	declare status: string;
}
export default Users;
