export interface UserResponse {
	id: string
	username?: string
	email?: string
	tokenVersion?: number
	createdAt?: Date
	updatedAt?: Date
}

export interface UserInfo {
	username: string
	email: string
	password: string
}

export interface UserUpdateInfo {
	username?: string
	email?: string
	password?: string
}

export interface LoginInfo {
	emailOrUsername: string
	password: string
}
