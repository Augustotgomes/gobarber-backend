import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';


const userRouter = Router();


userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // @ts-expect-error deletando password para não ser exibido no response
    delete user.password;

    return res.json(user);
  }catch(err:any) {
    return res
    .status(400)
    .json({error: err.message});
  }
});

export default userRouter;
