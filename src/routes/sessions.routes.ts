import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService'

const sessionsRouter = Router();


sessionsRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const authenticateUser = new AuthenticateUserService();

   const { user, token } = await authenticateUser.execute({
      email,
      password
    });

    // @ts-expect-error deletando password para não ser exibido no response
    delete user.password;

    return res.json({ user, token });
  }catch(err:any) {
    return res
    .status(400)
    .json({error: err.message});
  }
});

export default sessionsRouter;
