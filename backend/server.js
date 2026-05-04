const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        if (result.rows.length === 0)
            return res.status(401).json({ error: 'Usuario no encontrado' });

        const user = result.rows[0];

        const valid = await bcrypt.compare(password, user.password);

        if (!valid)
            return res.status(401).json({ error: 'Password incorrecta' });

        // 🔥 AQUÍ LO NUEVO
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            'secreto_super_seguro',
            { expiresIn: '1h' }
        );

        res.json({ message: 'Login correcto', token });

    } catch (err) {
        res.status(500).json({ error: 'Error en login' });
    }
};