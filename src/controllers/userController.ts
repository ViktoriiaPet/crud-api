 import express, { type Request, type Response } from 'express';
 import * as userservice from "../services/userService.js"
 import { type User } from '../models/User.js';

export const getUsers = async (req: Request, res: Response) => {
    const users = await userservice.getAllUser();
    res.json(users)
}

export const getUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const user = await userservice.getUserById(id);
    if (!user) return res.status(400).json({message: 'User is not found'})
    return res.json(user)
}

export const createUser = async (req: Request, res: Response) => {
    const {name, email} = req.body;
    const user: User = { id: Date.now(), name, email };
    const newUser = await userservice.createUser(user)
    res.status(201).json(newUser)
}

export const updateUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const updateUser = await userservice.updateUser(id, req.body)
    if (!updateUser) return res.status(404).json({message: 'User is not found'})
    res.json (updateUser)
}

export const deleteUser = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const succes = await userservice.deleteUser(id)
    if (!succes) res.status(404).json({message: "user not found"})
    res.json(succes)
}