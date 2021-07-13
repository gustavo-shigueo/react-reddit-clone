import { createContext } from 'react'
import { User } from '../interfaces/userInterfaces'

type userContext = User | {} | null

export const UserContext = createContext<userContext>({})
