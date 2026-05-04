const pool = require('../db');

exports.register = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan datos' });
    }

    return res.json({
        message: 'Usuario registrado (fake)',
        user: { username }
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'test' && password === '1234') {
        return res.json({ message: 'Login correcto' });
    }

    return res.status(401).json({ error: 'Credenciales incorrectas' });
};