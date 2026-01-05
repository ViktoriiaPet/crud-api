 import express, { type Request, type Response } from 'express';
 import * as userservice from "../services/userService.js"
 import { type User } from '../models/User.js';

export const getUsers = (req: Request, res: Response) => {
    const users = userservice.getAllUser();
    res.json(users)
}

export const getUser = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = userservice.getUserById(id);
    if (!user) return res.status(400).json({message: 'User is not found'})
    return res.json(user)
}

export const createUser = (req: Request, res: Response) => {
    const {name, email} = req.body;
    const user: User = { id: Date.now(), name, email };
    const newUser = userservice.createUser(user)
    res.status(201).json(newUser)
}

export const updateUser = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updateUser = userservice.updateUser(id, req.body)
    if (!updateUser) return res.status(404).json({message: 'User is not found'})
    res.json (updateUser)
}

export const deleteUser = (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const succes = userservice.deleteUser(id)
    if (!succes) res.status(404).json({message: "user not found"})
    res.json(succes)
}