import { Sequelize } from 'sequelize'
import conf from '../config/config.json'

const env = process.env.NODE_ENV || 'development'
const config = (conf as any)[env]
const sequelize = config.use_env_variable
	? new Sequelize(process.env[config.use_env_variable] as string, config)
	: new Sequelize(config.database, config.username, config.password, config)

export { sequelize }

import { Post } from './post'
import { Updoot } from './updoot'
import { User } from './user'

User.hasMany(Post, {
	sourceKey: 'id',
	foreignKey: { allowNull: false, name: 'ownerId' },
	as: 'posts',
	onDelete: 'CASCADE',
})
User.belongsToMany(Post, {
	through: Updoot,
	foreignKey: { allowNull: false, name: 'userId' },
	onDelete: 'CASCADE',
})

Post.belongsTo(User, {
	foreignKey: { name: 'ownerId' },
	as: 'owner',
})
Post.belongsToMany(User, {
	through: Updoot,
	foreignKey: { allowNull: false, name: 'postId' },
	onDelete: 'CASCADE',
})

export { Post, User, Updoot, Sequelize }
