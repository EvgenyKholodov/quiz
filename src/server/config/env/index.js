export const PORT = +process.env.PORT || 3000;
export const NODE_ENV = process.env.NODE_ENV || 'production';
process.env.MONGO_HOST = 'mongodb://localhost/quiz-app';
process.env.SECRET_STRING = 'test';
process.env.GITHUB_CLIENT_ID = 'test';
process.env.GITHUB_CLIENT_SECRET = 'test';
process.env.GITHUB_CALLBACK_PROD = 'test';