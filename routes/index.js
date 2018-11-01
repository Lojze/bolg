const router = require('koa-router')();

// 判断是否登录的中间件
async function isLoginUser(ctx, next) {
    if (!ctx.session.user) {
        ctx.flash = { warning: '未登录,请先登录' }
        return ctx.redirect('/signin')
    }
    await next()
}

//管理权限控制
async function isAdmin(ctx, next) {
    console.log(ctx.session)
    if (!ctx.session.user) {
        ctx.flash = { warning: '未登录,请先登录' }
        return ctx.redirect('/signin')
    }

    if (!ctx.session.user.isAdmin) {
        ctx.flash = { warning: '没有权限' }
        return ctx.redirect('back')
    }

    await next()
}

module.exports = (app) => {
    router.get('/', require('./posts').index)
    router.get('/signup', require('./user').signup)
    router.post('/signup', require('./user').signup)
    router.get('/signin', require('./user').signin)
    router.post('/signin', require('./user').signin)
    router.get('/signout', require('./user').signout)
    router.get('/about', require('./about').index)

    router.get('/posts', require('./posts').index)
    router.get('/posts/new', isLoginUser, require('./posts').create)
    router.post('/posts/new', isLoginUser, require('./posts').create)
    router.get('/posts/:id', require('./posts').show)
    router.get('/posts/:id/edit', isAdmin, require('./posts').edit)
    router.post('/posts/:id/edit', isAdmin, require('./posts').edit)
    router.get('/posts/:id/delete', isAdmin, require('./posts').destroy)

    router.post('/comments/new', isLoginUser, require('./comments').create)
    router.get('/comments/:id/delete', isLoginUser, require('./comments').destroy)

    router.get('/category', isAdmin, require('./category').list)
    router.get('/category/new', isAdmin, require('./category').create)
    router.post('/category/new', isAdmin, require('./category').create)
    router.get('/category/:id/delete', isAdmin, require('./category').destroy)

    app.use(router.routes())
            .use(router.allowedMethods())


    // 404
    app.use(async (ctx, next) => {
            await ctx.render('404', {
                title: 'page not find'
            })
        })
}
