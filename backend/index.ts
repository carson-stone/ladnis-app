import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.listen(5000, () => {
	console.log('app listening on port 5000');
});
