const PostModel = require('../models/post')
const CommentModel = require('../models/comment')
const CategoryModel = require('../models/category')

module.exports = {
    async create(ctx, next) {
        if (ctx.method === 'GET') {
            const categories = await CategoryModel.find({})
            await ctx.render('create', {
                title: '新建文章',
                categories
            })
            return
        }
        const post = Object.assign(ctx.request.body, {
            author: ctx.session.user._id
        })
        const res = await PostModel.create(post)
        ctx.flash = { success: '发表文章成功' }
        ctx.redirect(`/posts/${res._id}`)
    },

    async show(ctx, next) {
        const postId = ctx.params.id
        const post = await PostModel.findById(postId)
            .populate([
                { path: 'author', select: 'name' },
                { path: 'category', select: ['title', 'name'] }
            ])
        const comments = await CommentModel.find({ postId })
            .populate({ path: 'from', select: 'name' })
        await ctx.render('post', {
            title: post.title,
            post,
            comments
        })
    },

    async index(ctx, next) {
        const cname = ctx.query.c
        let cid
        if (cname) {
            const cateogry = await CategoryModel.findOne({ name: cname })
            cid = cateogry._id
        }

        const query = cid ? { category: cid } : {}
        const posts = await PostModel.find(query)
        await ctx.render('index', {
            title: 'JS之',
            posts
        })
    },

    async edit(ctx, next) {
        if (ctx.method === 'GET') {
            const post = await PostModel.findById(ctx.params.id);
            const categories = await CategoryModel.find({})
            if (!post) {
                throw new Error('文章不存在')
            }

            if (post.author.toString() !== ctx.session.user._id.toString()) {
                throw new Error('没有权限')
            }

            await ctx.render('edit', {
                title: '更新文章',
                post,
                categories
            })
            return
        }

        const { title, content } = ctx.request.body;
        await PostModel.findByIdAndUpdate(ctx.params.id, {
            title,
            content
        })

        ctx.flash = {
            success: '更新文章成功!'
        }
        ctx.redirect(`/posts/${ctx.params.id}`)
    },

    async destroy(ctx, next) {
        const post = await PostModel.findById(ctx.params.id)
        if (!post) {
            throw new Error('文章不存在!')
        }
        console.log(post.author, ctx.session.user._id)
        if (post.author.toString() !== ctx.session.user._id.toString()) {
            throw new Error('没有权限')
        }
        await PostModel.findByIdAndRemove(ctx.params.id)
        ctx.flash = {
            success: '删除文章成功'
        }
        ctx.redirect('/')
    }
}