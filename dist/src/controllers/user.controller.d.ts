import type { Request, Response } from "express";
import type { UserParamsId } from "../types/userTypes.ts";
export declare const userController: {
    createUser(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getUserById(req: Request<UserParamsId>, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUser(req: Request<UserParamsId>, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUser(req: Request<UserParamsId>, res: Response): Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=user.controller.d.ts.map