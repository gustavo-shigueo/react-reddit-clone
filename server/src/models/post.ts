import { sequelize } from './index'
import { User } from './user'
import { DataTypes, Model, Optional } from 'sequelize'

interface PostAttributes {
	id: string
	title: string
	text: string
	points: number
	ownerId: string
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

class Post
	extends Model<PostAttributes, PostCreationAttributes>
	implements PostAttributes {
	public id!: string
	public title!: string
	public text!: string
	public points!: number
	public ownerId!: string
	public readonly createdAt!: Date
	public readonly updatedAt!: Date
}

Post.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		text: {
			type: DataTypes.TEXT,
			defaultValue: '',
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		ownerId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
	},
	{
		sequelize,
		modelName: 'Post',
	}
)

export { Post, PostAttributes, PostCreationAttributes }
