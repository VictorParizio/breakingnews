import { createService, findAllService } from '../services/news.service.js'

const create = async (req, res) => {
    try {
        const { title, text, banner } = req.body

        if(!title || !text || !banner) {
            res.status(400).send({
                message: "Submit all fields for registration"
            })
        }

        await createService({
            title,
            text,
            banner,
            user: {_id: "646a0b8193f77b0fb50971bc"}
        })

        res.send(201)
    } catch (err) {
        res.status(500).send({ message: err.message })
    }
}

const findAll = (req, res) => {
    const news = []
    res.send(news)
}

export { create, findAll }