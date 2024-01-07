const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
const users = []
app.use(express.json())
/*
- Query params =>meusite.com/users?nome=rodolfo&age=22 //filtros
- Route params => /users/2      // BUSCAR, DELETAR OU ALTERAR ALGO ESPECIFICO
- Request Body => {"name": "rodolfo", "age":22}

-Get          => Buscar informação no  Back-end
-Post         => Criar informação no Back-end
-PUt / Patch  => Alterar/ Atualizar informação no Back-end
-Delete       => Deletar informação no Back-end

- Middleware => INTERCEPTADOR => tem o poder de parar ou alterar dados da requisição
*/

const checkUserId= (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)


    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }
    request.userIndex = index
    request.userId = id

    next()
}




app.get('/users', (request, response) => {

    return response.json(users)  /* texto que vai volta quanndo pesquisada*/
})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)  /* texto que vai volta quanndo pesquisada*/
})

app.put('/users/:id',checkUserId, (request, response) => {

    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId
    const updateUser = { id, name, age }
    users[index] = updateUser

    return response.json(updateUser)  /* texto que vai volta quanndo pesquisada*/
})


app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex
    users.splice(index, 1)
    return response.status(204).json()  /* texto que vai volta quanndo pesquisada*/
})









app.listen(port, () => {
    console.log(`🚀Server start on port ${port}`)
})/*=> porta de onde vai rodar o servidor 
ex: localhost:3000/users aparecera o texto */




