const { PrismaClient } = require('@prisma/client')
const dbService = new PrismaClient();

async function create(positionData){
 return await dbService.position.create({
    data : {
        name: positionData.name,
    }
 }) 
}

async function Index(){
    return await dbService.position.findMany({
        where: {
            deleted_at: null
        }
    })
}

async function FindOne(id) {
    return await dbService.position.findFirst({
        where : {
            id: id,
            deleted_at: null
        }
    })
}

async function Update(id, updateDto) {
    return await dbService.position.update({
        where: {
            id
        },
        data : {
            name: updateDto.name,
            updated_at: new Date()
        }
    })
}

async function Delete(id) {
    return await dbService.position.update({
        where: {
            id
        },
        data: {
            deleted_at: new Date()
        }
    })
}

module.exports = {
    create,
    Index,
    FindOne,
    Update,
    Delete
}