import express from 'express'

export const orangeRoute = express.Router()

orangeRoute.get('/apple', function(req, res) {
    res.send('Birds home page');
});