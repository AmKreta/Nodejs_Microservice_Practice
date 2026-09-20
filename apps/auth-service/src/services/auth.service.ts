import type { LoginSchema, RegisterSchema } from "../schemas/auth.schemas";
import { compare, hash } from "bcrypt";
import { createUser, getUserByEmail, getUserById } from "../repositories/user.repository";
import { UserRole } from "@nodejsmicroservices/packages-shared";
import { AppError } from "@nodejsmicroservices/packages-shared";
import { signToken } from "../utils/jwt";

export async function registerUser(registerData: RegisterSchema){
    const existinguser = await getUserByEmail(registerData.email);
    if(existinguser){
        throw new AppError(`User with email ${registerData.email} already exists`, 409);
    }
    const user = await createUser({
        name: registerData.name,
        email: registerData.email,
        password_hash: await hash(registerData.password, 10),
        role: UserRole.USER,
    });
    return user;
}

export async function loginUser(loginData: LoginSchema){
    const _user = await getUserByEmail(loginData.email, true);
    if(!_user){
        throw new AppError(`User with email ${loginData.email} not found`, 404);
    }
    const {password_hash, ...user} = _user;
    const isPasswordValid = await compare(loginData.password, password_hash);
    if(!isPasswordValid){
        throw new AppError("either email or password is incorrect", 401);
    }
    const token = signToken({
        name: user.name,
        email: user.email,
        role: user.role as UserRole,
        id: user.id,
    });
    return { user, token };
}

export async function getMe(userId: string) {
    const user = await getUserById(userId);
    if(!user){
        throw new AppError(`User with id ${userId} not found`, 404);
    }
    return user;
}