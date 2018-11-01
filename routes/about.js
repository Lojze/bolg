module.exports = {
    async index(ctx, next) {
        if (!ctx.session.user) {
            ctx.flash = { warning: '未登录,请先登录' }
            return ctx.redirect('/signin')
        }
        ctx.body = 'about'
    }
}