const Koa = require('koa');
const router = require('./routes')
const path = require('path')
const views = require('koa-views')
const serve = require('koa-static')
const mongoose = require('mongoose')
const CONFIG = require('./config/config')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const flash = require('./middlewares/flash')
const marked = require('marked')

const app = new Koa()
mongoose.connect(CONFIG.mongodb, { useNewUrlParser: true });

var db = mongoose.connection

db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function () {
    console.log('连接成功');
})

marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
})

app.keys = ['blog']

app.use(flash())
app.use(async (ctx, next) => {
    ctx.state.ctx = ctx
    await next()
})

app.use(async (ctx, next) => {
    ctx.state.ctx = ctx
    ctx.state.marked = marked
    await next()
})

app.use(session({
    key: CONFIG.session.key,
    maxAge: CONFIG.session.maxAge
}, app))

app.use(bodyParser())

app.use(views(path.join(__dirname, 'views'), {
    map: { html: 'nunjucks' }
}))

app.use(serve(path.join(__dirname, 'public')))

app.listen(3000, () => {
    console.log('server is running at http://localhost:3000')
})

router(app);