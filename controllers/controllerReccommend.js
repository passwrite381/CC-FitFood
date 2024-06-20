const db = require('../config/firestoreDb.js');

exports.getFood = async (req, res) => {
    try {
        const articleRef = db.collection("food-data");
        const response = await articleRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.status(500).send(error);
    }
}


exports.getExercise = async (req, res) => {
    try {
        const articleRef = db.collection("exercise-desc");
        const response = await articleRef.get();
        let responseArr = [];
        response.forEach(doc => {
            responseArr.push(doc.data());
        });
        res.send(responseArr);
    } catch (error) {
        res.status(500).send(error);
    }
}

