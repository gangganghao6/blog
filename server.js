const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const formidable = require('formidable')
const path = require("path");
const fs = require("fs");

server.use(middlewares)
// server.use(jsonServer.rewriter({
//     '/user/login': '/user',
//     '/user/register': '/user'
// }))
server.use((req, res, next) => {
    // if(req.url==='/user'){
    //     req.method = 'GET';
    // }
    // console.log(req.url)
    console.log(req.url)
    req.url = req.url.slice(4);
    if (req.url === '/img') {
        let form = new formidable.IncomingForm()
        form.encoding = 'utf-8'
        form.uploadDir = "D:/neworigin/origin-project/images"
        form.keepExtensions = true
        form.maxFieldsSize = 10 * 1024 * 1024;
        form.multiples = false;
        let time = +new Date();
        let fileName;
        form.parse(req, (err, fields, files) => {
            let username = Object.keys(files)[0]
            fileName = time + "." + files[username].mimetype.split('/')[1]
            fs.rename(files[username].filepath, "D:\\neworigin\\origin-project\\images\\" + fileName, function (err) {
                if (err) {
                    throw Error("改名失败");
                }
            });
            res.json({fileName})
        })
    } else {
        if ("q" in req.query) {
            req.query.q = decodeURIComponent(req.query.q);
        }
        next()
    }
})
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
