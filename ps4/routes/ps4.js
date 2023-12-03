const express = require('express');
const router = express.Router();
const request = require('request');

// Promise-based Route
router.post('/pokemon-promise', (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;
    new Promise((resolve, reject) => {
        request({ url: apiUrl, json: true }, (error, response, body) => {
            if (error) {
                reject(error);
            } else if (response.statusCode !== 200) {
                reject('Failed to fetch data');
            } else {
                const result = {
                    id: body.id,
                    name: body.name,
                    abilities: body.abilities
                };
                resolve(result);
            }
        });
    })
    .then(result => {
        res.render('pokemon', { pokemon: result });
    })
    .catch(error => {
        res.render('pokemon', { pokemon: null, error: error });
    });
});

// Async/Await-based Route
router.post('/pokemon-async', async (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        res.render('pokemon', { pokemon: data });
    } catch (error) {
        res.render('pokemon', { pokemon: null, error: error.message });
    }
});


// Callback-based Route
router.post('/pokemon-callback', (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;
    request({ url: apiUrl, json: true }, (error, response, body) => {
        if (error) {
            res.status(500).send(error);
        } else if (response.statusCode !== 200) {
            res.render('pokemon', { pokemon: null, error: error || 'Failed to fetch data' });
        } else {
            result = body
            res.render('pokemon', { pokemon: result });
        }
    });
});

module.exports = router;
