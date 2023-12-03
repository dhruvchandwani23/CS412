const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ps4Router = require('./routes/ps4'); 

// Set Pug as the view engine
app.set('view engine', 'pug');
app.set('views', './views');

// Middleware to parse request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Mounting the PS4 router
app.use('/ps4', ps4Router);

// Route to display the search form
app.get('/search-pokemon', (req, res) => {
    res.render('searchForm');
});

// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
