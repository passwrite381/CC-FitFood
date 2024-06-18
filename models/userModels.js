// models/userModel.js
const db = require('../config/firestoreDb');
const bcrypt = require('bcrypt');

const userCollection = db.collection('users');

const User = {
  async createUser(data) {
    const { id, fullName, email, password, gender } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id,
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
      gender
    };

    const userRef = userCollection.doc(id);
    await userRef.set(newUser);
    return { id, ...newUser };
  },

  async findUserByEmail(email) {
    const snapshot = await userCollection.where('email', '==', email).get();
    if (snapshot.empty) return null;

    const userDoc = snapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() };
  },

  async findUserById(id) {
    const userDoc = await userCollection.doc(id).get();
    if (!userDoc.exists) return null;
    
    return { id: userDoc.id, ...userDoc.data() };
  },

  async updateUser(id, data) {
    const { fullName, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = {
      fullName,
      email,
      password: hashedPassword,
      updatedAt: new Date(),
    };

    await userCollection.doc(id).update(updatedUser);
    return { id, ...updatedUser };
  },

  async deleteUser(id) {
    await userCollection.doc(id).delete();
    return { message: 'User deleted successfully' };
  },

  async getAllUsers() {
    const snapshot = await userCollection.get();
    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
};

module.exports = User;
