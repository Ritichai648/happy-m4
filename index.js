const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const bodyParser = require('body-parser');


const app = express();
const PORT = 6656;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'rakfanmakmak',
    resave: false,
    saveUninitialized: false,
}));

app.get('/', (req, res, next) => {
    res.render('index', { loggedIn: req.session.loggedIn });
});

app.get('/incorrect', (req, res, next) => {
    res.render('incorrect', { loggedIn: req.session.loggedIn });
});

app.get('/HAM4', (req, res) => {
    if (req.session.loggedIn) {
        res.render('hamfour');
    } else {
        res.redirect('/incorrect');
    };
});

app.post('/verify', (req, res) => {
    const { code } = req.body;
    if (!code) {
        res.redirect('/incorrect');
    } else if (code === '280124') {
        req.session.loggedIn = true;
        res.redirect('/HAM4');
    } else {
        res.redirect('/incorrect');
    }
});

app.post('/byeee', (req, res) => {
    res.redirect('https://google.com')
})

app.listen(PORT, () => {
    console.log(`WebSite is running on http://localhost:${PORT}`)
})