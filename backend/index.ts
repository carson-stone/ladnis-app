import express from 'express';
import helmet from 'helmet';
import userRouter from './routers/user-router';
import analysisRouter from './routers/analysis-router';

const app = express();
app.use(express.json());
app.use(helmet());

app.use('/api/users', userRouter);
app.use('/api/analysis', analysisRouter);

app.listen(process.env.PORT || 5000, () => {
	console.log('app listening on port ' + process.env.PORT || 5000);
});
