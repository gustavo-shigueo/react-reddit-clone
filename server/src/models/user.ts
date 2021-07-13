import { sequelize } from './index'
import { Post } from './post'
import {
	Association,
	DataTypes,
	HasManyAddAssociationMixin,
	HasManyCountAssociationsMixin,
	HasManyCreateAssociationMixin,
	HasManyGetAssociationsMixin,
	HasManyHasAssociationMixin,
	Model,
	Optional,
} from 'sequelize'

interface UserAttributes {
	id: string
	username: string
	email: string
	password: string
	tokenVersion: number
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes {
	public id!: string
	public username!: string
	public email!: string
	public password!: string
	public tokenVersion!: number
	public readonly createdAt!: Date
	public readonly updatedAt!: Date

	public getPosts!: HasManyGetAssociationsMixin<Post>
	public addPost!: HasManyAddAssociationMixin<Post, number>
	public hasPost!: HasManyHasAssociationMixin<Post, number>
	public countPosts!: HasManyCountAssociationsMixin
	public createPosts!: HasManyCreateAssociationMixin<Post>

	public readonly posts?: Post[]

	public static associations: {
		posts: Association<User, Post>
	}
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		username: {
			type: DataTypes.STRING(25),
			unique: true,
			allowNull: false,
			validate: { len: [3, 25] },
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
			validate: { isEmail: true },
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tokenVersion: {
			type: DataTypes.INTEGER.UNSIGNED,
			allowNull: false,
			defaultValue: 0,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
)

export { User, UserAttributes, UserCreationAttributes }
