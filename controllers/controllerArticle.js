const db = require('../config/firestoreDb.js');

exports.getArticles = async (req, res) => {
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
};

exports.getArticleById = async (req, res) => {
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
};

exports.getArticlesByCategory = async (req, res) => {
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
};

exports.getArticleByIdAndCategory = async (req, res) => {
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
};

exports.getArticleByLabel = async (req, res) => {
    try {
        const label = req.query.label;
        const articleRef = db.collection('articles');
        const response = await articleRef.where('articlelabel', '==', label).get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.status(500).send(error);
    }
};