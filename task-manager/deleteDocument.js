const {MongoClient, ObjectId} = require('mongodb')
const url = 'mongodb://127.0.0.1:27017'
const client = new MongoClient(url)
const namaDatabase = 'task-manager'

async function main(){
    try{
        await client.connect();
        console.log('Berhasil terhubung ke Mongodb database server')
        
        Db.collection('pengguna').deleteMany({
            usia:28
        }).then((result) => {
            console.log(result)
        }).catch((error) => {
            console.log(error)
        })
    }catch(error){
        console.error(error)
    }
}

main();