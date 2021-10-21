import { Router } from 'express';

const appointmentsRouter = Router();

appointmentsRouter.post('/', (req, res) => res.json({ message: 'Agendamento Post' }));

export default appointmentsRouter;
