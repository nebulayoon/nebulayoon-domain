import { User } from '../entity/user.entitiy';
import { Repository } from 'typeorm';
export declare class UserEntityService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(user: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number, other?: object): Promise<User>;
    findUser(user: Partial<User>): Promise<User>;
    update(id: number, updateUser: Partial<User>): Promise<User>;
    emailVerifyUpdate(email: string): Promise<User>;
    delete(id: number): Promise<void>;
    realDelete(id: number): Promise<void>;
}
