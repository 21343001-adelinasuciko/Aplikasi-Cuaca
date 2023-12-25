// Import modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const url = 'mongodb://127.0.0.1:27017';

// Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const client = new MongoClient(url);

// Mendefinisikan nama database yang akan digunakan.
const namaDatabase = 'testsaja';

// Membuat instance ObjectId baru. ObjectId digunakan untuk menghasilkan unik
// identifier untuk dokumen MongoDB.
const id = new ObjectId();

// Bagian ini mencetak informasi dari ObjectId.
// Mencetak ObjectId yang baru dibuat ke konsol.
console.log(id);

// Mencetak representasi hexadecimal dari ObjectId ke konsol.
console.log(id.id);

// Mencetak panjang (jumlah karakter) dari representasi hexadecimal ObjectId
// ke konsol.
console.log(id.id.length);

// Mencetak timestamp yang terkait dengan ObjectId ke konsol. Kode ini akan
// memberikan data waktu kapan ObjectId tersebut dibuat.
console.log(id.getTimestamp());

// Mencetak panjang dari representasi ObjectId dalam bentuk string
// heksadesimal.
console.log(id.toHexString().length);

// Bagian ini adalah fungsi utama yang berjalan secara asynchronous.
// Mendefinisikan fungsi async 'main' untuk melakukan operasi-operasi terkait MongoDB.
async function main() {
    try {
        // Bagian ini terkait koneksi ke database dan memasukkan data.
        // Menggunakan 'await' untuk menghubungkan ke server MongoDB.
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');
        const db = client.db(namaDatabase);
        const clPengguna = db.collection('pengguna');
        const clTugas = db.collection('tugas');

        // Memasukkan satu data (dokumen).
        // Memasukkan dokumen ke dalam koleksi 'pengguna'.
        const insertPengguna = await clPengguna.insertOne({
            _id: id,
            nama: 'Ciko',
            usia: 20
        });
        console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);

        // Memasukkan banyak data (dokumen).
        // Memasukkan beberapa dokumen ke dalam koleksi 'tugas'.
        const insertTugas = await clTugas.insertMany([
            {
                Deskripsi: 'Membersihkan rumah',
                StatusPenyelesaian: true
            },
            {
                Deskripsi: 'Mengerjakan tugas kuliah',
                StatusPenyelesaian: false
            },
            {
                Deskripsi: 'Memberikan bimbingan',
                StatusPenyelesaian: false
            }
        ]);
        console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);

        // Mengembalikan pesan sukses setelah operasi selesai.
        return 'Data selesai dimasukkan.';
    } catch (err) {
        // Bagian ini menangani error dengan mencetak pesan kesalahan ke konsol.
        console.error(err);
    } finally {
        // Selalu menutup koneksi ke server MongoDB setelah operasi selesai, baik
        // sukses maupun gagal.
        client.close();
    }
}

// Memanggil fungsi 'main' dan menangani hasilnya menggunakan 'then' dan
// 'catch' untuk mencetak hasil atau pesan kesalahan ke konsol.
main().then(console.log).catch(console.error);