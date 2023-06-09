import { createService, findAllService, countNews, topNewService } from '../services/news.service.js'

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if (!title || !text || !banner) {
            res.status(400).send({
                message: "Submit all fields for registration"
            })
        }

        await createService({
            title,
            text,
            banner,
            user: req.userId
        })

        res.send(201)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = async (req, res) => {
    try {
        let { limit, offset } = req.query

        limit = Number(limit)
        offset = Number(offset)

        if (!limit) {
            limit = 5
        }

        if (!offset) {
            offset = 0
        }

        const news = await findAllService(offset, limit)
        const total = await countNews()
        const currentUrl = req.baseUrl

        const next = offset + limit
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null

        const previous = offset - limit < 0 ? null : offset - limit
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

        if (news.length === 0) {
            return res.status(400).send({ message: "There are no registered news" })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map(news => ({
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            }))
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const topNew = async (req, res) => {
    try {
        const lastNew = await topNewService()

        if (!lastNew) {
            return res.status(400).send({ message: "There ir no registered post" })
        }

        res.send({
            lastNew: {
                id: lastNew._id,
                title: lastNew.title,
                text: lastNew.text,
                banner: lastNew.banner,
                likes: lastNew.likes,
                comments: lastNew.comments,
                name: lastNew.user.name,
                userName: lastNew.user.username,
                userAvatar: lastNew.user.avatar,
            }
        })
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

export { create, findAll, topNew }