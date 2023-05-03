import ApiError from "../ApiError/ApiError.js";
import { UserServices } from "../services/usersServices.js";

const UserService = new UserServices();

export class UserController {
  getUser = async (req, res, next) => {
    try {
      const result = await UserService.getUsers();
      return res.json(result.rows).status(200);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  };
  getUserById = async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await UserService.getUserById(id);
      return res.json(result.rows).status(200);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  };
  putUser = async (req, res) => {
    try {
      const id = req.params.id;
      const message = await UserService.updateUser(req.body, id);
      return res.json({ message: message }).status(200);
    } catch (e) {
      return next(ApiError.internal(e.message));
    }
  };
  patchUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const message = await UserService.updateUser(req.body, id);
      return res.json({ message: message }).status(200);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  };
  deleteUser = async (req, res, next) => {
    try {
      const id = req.params.id;
      const message = await UserService.deleteUser(id);
      return res.json({ message: message }).status(204);
    } catch (e) {
      console.error(e);
      return next(ApiError.internal(e.message));
    }
  };
}
