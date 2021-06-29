const express = require('express');
const route = express.Router();
const request = require('request');

require('./path')();
require('./function')();

route.all('/list', (req, res) => {
    const method = req.method;
    const path = req.path;
    const body = req.body;
    const genre = body.genre;
    const type = {};

    if(body.type === "movie"){
        type.type = "Movies";
    }else{
        type.type = "Series";
    }

    if (method === "POST") {
        if (itsOk(body, path)) {
            const options = {
                method: 'GET',
                url: 'https://data-imdb1.p.rapidapi.com/'+body.type+'/byGen/'+genre+'/',
                headers: {
                    'x-rapidapi-key': '6827a8ff83msh340125ad79dddc8p1a96a8jsn5ae8973e521d',
                    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
                    useQueryString: true
                }
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                var data = JSON.parse(body);
                const sizeData = data[type.type +' '+genre].length;

                const json =
                    {
                        error: 0,
                        message: "Found list !",
                        numberMovieFound: sizeData,
                        randomMovie: data[type.type+' '+genre]
                    };
                res.status(200).json(json);
            });
        }else {
            const json =
                {
                    error: 400,
                    message: "Bad Request !"
                };
            res.status(400).json(json);
        }
    } else {
        const json =
            {
                error: 405,
                message: "Method Not Allowed"
            }
        res.status(405).json(json)
    }
});

route.all('/random', (req, res) => {
    const method = req.method;
    const path = req.path;
    const body = req.body;
    const genre = body.genre;
    const type = {};

    if(body.type === "movie"){
        type.type = "Movies";
    }else{
        type.type = "Series";
    }

    if (method === "POST") {
        if (itsOk(body, path)) {
            const options = {
                method: 'GET',
                url: 'https://data-imdb1.p.rapidapi.com/'+body.type+'/byGen/'+genre+'/',
                headers: {
                    'x-rapidapi-key': '6827a8ff83msh340125ad79dddc8p1a96a8jsn5ae8973e521d',
                    'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
                    useQueryString: true
                }
            };
            request(options, function (error, response, body) {
                if (error) throw new Error(error);

                var data = JSON.parse(body);
                const randomData = data[type.type +' '+genre][Math.floor(Math.random() * data[type.type +' '+genre].length)];

                const json =
                    {
                        error: 0,
                        message: 'Found !',
                        randomTitle: randomData,
                        info: "https://www.google.com/search?q="+removeChara(randomData.title, " ", "+", 20)
                    };
                res.status(200).json(json);
            });
        }else {
            const json =
                {
                    error: 400,
                    message: "Bad Request !"
                };
            res.status(400).json(json);
        }
    } else {
        const json =
            {
                error: 405,
                message: "Method Not Allowed"
            }
        res.status(405).json(json)
    }
});

route.all('*', (req, res) => {
    res.end();
});
module.exports = route;