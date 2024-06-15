const express = require('express');
const app = express();

const admin = require('firebase-admin');
const credentials = require('./key.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

app.get('/getArticle', async (req, res) => {
    try {
        const articleRef = db.collection("articles");
        const response = await articleRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getArticleById/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const articleRef = db.collection('articles').doc(articleId);
        const doc = await articleRef.get();
        if (!doc.exists) {
            res.status(404).send('No such article!');
        } else {
            res.send(doc.data());
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getArticlesByCategory', async (req, res) => {
    try {
        const category = req.query.category;
        const articleRef = db.collection('articles');
        const response = await articleRef.where('category', '==', category).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/getArticleByIdAndCategory/:id', async (req, res) => {
    try {
        const articleId = req.params.id;
        const category = req.query.category;
        const articleRef = db.collection('articles').doc(articleId);
        const doc = await articleRef.get();
        if (!doc.exists) {
            res.status(404).send('No such article!');
        } else {
            const data = doc.data();
            if (data.category === category) {
                res.send(data);
            } else {
                res.status(404).send('No article found for the given category!');
            }
        }
    } catch (error) {
        res.status(500).send(error);
    }
});

const db = admin.firestore();

app.use(express.json());

app.unsubscribe(express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);
})