import {type User } from "../models/User.js";
let users: User[] = []

users = [
    {   
        id:1,
        name: "kate",
        email: "non@non.no"
    },
        {   
        id:2,
        name: "maria",
        email: "nona@non.no"
    }
]

export const getAllUser = ():User[] => {
    return users
}

export const getUserById = (id:number) : User | undefined => {
    return users.find(u => u.id === id)
}

export const createUser = (user:User) : User => {
    users.push(user);
    return user
}

export const updateUser = (id:number, updateUser: Partial<User>): User | undefined => {
    const user = users.find(u => u.id === id);
    if (!user) return undefined;
    Object.assign(user, updateUser);
    return user 
}

export const deleteUser = (id:number): boolean  => {
    const index = users.findIndex (u => u.id === id)
    if (index === -1) return false;
    users.splice(index, 1)
    return true
}