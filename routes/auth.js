const express = require('express');
const { admin, db } = require('../firebaseConfig');
const path = require('path');
const router = express.Router();


router.get('/signup', (req, res) => {
    console.log('Serving signup page');
    res.sendFile(path.join(__dirname, '../views', 'signup.html'));
});


router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting signup for email: ${email}`);
    try {
        const user = await admin.auth().createUser({
            email,
            password
        });
        console.log(`User created: ${user.email}`);
        
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});

router.get('/login', (req, res) => {
    console.log('Serving login page');
    res.sendFile(path.join(__dirname, '../views', 'login.html'));
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`);
    try {
        const user = await admin.auth().getUserByEmail(email);
        console.log(`User found: ${user.email}`);
        
        if (user.email === email) {
            req.session.email = email;
            
            res.redirect('/dashboard');
        } else {
            res.send('Invalid credentials');
        }
    } catch (error) {
        console.error(error);
        res.send(error.message);
    }
});

module.exports = router;
