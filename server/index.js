const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
// const router = require('./router')

const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express()
const port = 3010

app.use('/', express.static(path.join(__dirname, '../client/dist')));

//Koboh - NavBar
app.use('/nav',
createProxyMiddleware({ target: 'http://localhost:3006', changeOrigin: true }));

//Mrinal - Product
app.use('/images', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/images/:id', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/product', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/product/:title', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));
app.use('/details', createProxyMiddleware({ target: 'http://localhost:3000', changeOrigin: true }));

//Andrew - Reviews
app.use('/users',
createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));
app.use('/reviews',
createProxyMiddleware({ target: 'http://localhost:3001', changeOrigin: true }));

//Marlena - Suggested
app.use('/products',
createProxyMiddleware({ target: 'http://localhost:3050', changeOrigin: true }));

// app.use('/nav', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(morgan('dev'));
app.use(cors());

app.listen(port, () => console.log(`nav bar listening at http://localhost:${port}`));