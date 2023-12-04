const express = require('express');
const router = express.Router();
const request = require('request');

const redis = require('redis');
const redisClient = redis.createClient({
    // your Redis configuration
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect();

// Promise-based Route
router.post('/pokemon-promise', async (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const cacheKey = `pokemon:${pokemonIdOrName}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json({ data: JSON.parse(cachedData), source: 'cache' });
        }

        new Promise((resolve, reject) => {
            const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;
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
            redisClient.setEx(cacheKey, 15, JSON.stringify(result));
            res.json({ data: result, source: 'api' });
        })
        .catch(error => {
            res.status(500).send(error);
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Async/Await-based Route
router.post('/pokemon-async', async (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const cacheKey = `pokemon:${pokemonIdOrName}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.json({ data: JSON.parse(cachedData), source: 'cache' });
        }

        const fetch = (await import('node-fetch')).default;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const result = {
            id: data.id,
            name: data.name,
            abilities: data.abilities
        };

        await redisClient.setEx(cacheKey, 15, JSON.stringify(result));
        res.json({ data: result, source: 'api' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Callback-based Route
router.post('/pokemon-callback', (req, res) => {
    const pokemonIdOrName = req.body.pokemon;
    const cacheKey = `pokemon:${pokemonIdOrName}`;

    console.log('Attempting to retrieve from Redis...');

    redisClient.get(cacheKey, (err, cachedData) => {
        if (err) {
            console.error('Redis error:', err);
            return res.status(500).send('Redis error');
        }
        if (cachedData) {
            console.log('Found in cache');
            return res.json({ data: JSON.parse(cachedData), source: 'cache' });
        }
    });

        console.log('Not found in cache, fetching from API...');

        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIdOrName}`;
        request({ url: apiUrl, json: true }, (error, response, body) => {
            if (error) {
                console.error('API request error:', error);
                return res.status(500).send(error);
            }
            if (response.statusCode !== 200) {
                console.error('API response error:', response.statusCode);
                return res.status(response.statusCode).send('Error fetching data from API');
            }

            const result = {
                id: body.id,
                name: body.name,
                abilities: body.abilities
            };

            console.log('Caching result in Redis...');

            redisClient.setEx(cacheKey, 15, JSON.stringify(result), (cacheError) => {
                if (cacheError) {
                    console.error('Redis caching error:', cacheError);
                }
            });

            res.json({ data: result, source: 'api' });
        });
});


module.exports = router;
