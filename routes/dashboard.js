const express = require('express');
const { db } = require('../firebaseConfig');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'dashboard.html'));
});

router.get('/all-skills', (req, res) => {
    res.sendFile(path.join(__dirname, '../views', 'allSkills.html'));
});

router.post('/offer', async (req, res) => {
    const { skill } = req.body;
    const email = req.session.email; // Get the email from session
    try {
        await db.collection('skills').add({
            email,
            skill,
            type: 'offer'
        });
        res.json({ message: 'Skill offered successfully' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/request', async (req, res) => {
    const { skill } = req.body;
    const email = req.session.email; 
    try {
        await db.collection('skills').add({
            email,
            skill,
            type: 'request'
        });
        res.json({ message: 'Skill requested successfully' });
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/skills', async (req, res) => {
    const userEmail = req.session.email; 
    try {
        const skillsSnapshot = await db.collection('skills').where('email', '==', userEmail).get();
        const skillsData = skillsSnapshot.docs.map(doc => doc.data());

        const userSkills = {
            email: userEmail,
            offered: [],
            requested: []
        };

        skillsData.forEach(skill => {
            if (skill.type === 'offer') {
                userSkills.offered.push(skill.skill);
            } else if (skill.type === 'request') {
                userSkills.requested.push(skill.skill);
            }
        });

        res.json([userSkills]);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/all-skills-data', async (req, res) => {
    try {
        const skillsSnapshot = await db.collection('skills').get();
        const skillsData = skillsSnapshot.docs.map(doc => doc.data());

        const userSkills = {};

        skillsData.forEach(skill => {
            if (!userSkills[skill.email]) {
                userSkills[skill.email] = { email: skill.email, offered: [], requested: [] };
            }
            if (skill.type === 'offer') {
                userSkills[skill.email].offered.push(skill.skill);
            } else if (skill.type === 'request') {
                userSkills[skill.email].requested.push(skill.skill);
            }
        });

        res.json(Object.values(userSkills));  
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router;
