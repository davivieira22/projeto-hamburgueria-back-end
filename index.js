const express = require("express")
const app = express()
const port = 3000
const uuid = require("uuid")
app.use(express.json())
const menu = []

const AnswerBox = (request, response, next) => {

    console.log(request.method)
    console.log(request.url)
    next()
}
app.use(AnswerBox)

const MotherBox = (request, response, next) => {

    const { id } = request.params

    const index = menu.findIndex(i => i.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "now is not found" })
    }

    request.menuIndex = index
    request.menuId = id
    next()
}





app.get('/user', (request, response) => {
    return response.json(menu)

})

app.post('/user', (request, response) => {
    const { order, clientName, price, status } = request.body
    const ordem = { id: uuid.v4(), order, clientName, price, status }
    menu.push(ordem)
    return response.json(ordem)
})

app.put('/user/:id', MotherBox, (request, response) => {

    const index = request.menuIndex

    const id = request.menuId

    const { order, clientName, price, status } = request.body

    const UpdateOrder = { id, order, clientName, price, status }

    menu[index] = UpdateOrder

    return response.json(UpdateOrder)



})
app.delete('/user/:id', MotherBox, (request, response) => {

    const index = request.menuIndex

    menu.splice(index, 1)

    return response.status(204).json()

})
app.get('/user/:id', MotherBox, (request, response) => {
    const index = request.menuIndex

    const id = request.menuId

    const { order, clientName, price, status } = request.body

    const UpdateOrder = { id, order, clientName, price, status }

    menu[index] = UpdateOrder

    return response.json(UpdateOrder)



})
app.patch('/user/:id', MotherBox, (request, response) => {

    const index = request.menuIndex

    const id = request.menuId

    const { order, clientName, price, status } = request.body

    const UpdateOrder = { id, order, clientName, price, status }

    menu[index] = UpdateOrder

    return response.json(UpdateOrder)



})











app.listen(port, () => {
    console.log('helo men o sistema esta rodando ')

})