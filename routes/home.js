const {Router} = require('express');
const router = Router();
const Task = require('../models/Task');

router.get('/', async (req, res) => {
    const tasks = await Task.scope('ordered').findAll();
    res.render('home', {
        pageTitle: 'Home',
        tasks: tasks
    });
});

module.exports = router;