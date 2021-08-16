import express from 'express';
import helmet from 'helmet';
import userRouter from './routers/user-router';

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/api/users', userRouter);

app.listen(5000, () => {
	console.log('app listening on port 5000');
});