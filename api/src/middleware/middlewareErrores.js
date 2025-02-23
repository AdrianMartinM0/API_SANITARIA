const errores = (err, req, res, next ) => {
    if (err.status === 400) {
        res.status(400).send({ error: 'Bad Request', details: err.message });
    } else {
        res.status(500).send({ error: 'Internal Server Error', details: err.message });
    }
}

module.exports = { 
    errores,
};