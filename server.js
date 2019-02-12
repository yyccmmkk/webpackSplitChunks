/**
 * Created by zhoulongfei on 2018/6/13.
 * E-mail:36995800@163.com
 */
let http = require('http');
let path=require('path');

let express = require('express');

let bodyParser = require('body-parser');


let app = express();

app.use(require('morgan')('short'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data

// ************************************
// This is the real meat of the example
// ************************************


// Step 1: Create & configure a webpack compiler
let webpack = require('webpack');
let webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config');
let compiler = webpack(webpackConfig);

// Step 2: Attach the dev middleware to the compiler & the server
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));

// Step 3: Attach the hot middleware to the compiler & the server
app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000, reload: true
}));

app.use('/static',express.static(path.resolve(__dirname,'./dist/')));


// Do anything you like with the rest of your express application.

app.get("/", function (req, res) {
    res.sendFile(__dirname + '/index.html');
});



/*------------------测试接口------------------*/

if (require.main === module) {
    let server = http.createServer(app);
    server.listen(process.env.PORT || 3030, function () {
        console.log("Listening on %j", server.address());
    });
}