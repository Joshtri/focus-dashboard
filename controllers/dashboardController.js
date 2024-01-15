const db = require('../utils/dbConfig')

exports.dashboardView = (req, res) => {
    if (!req.session.userData || !req.session.userData.id_user) {
        // Jika pengguna belum login, redirect ke halaman login
        return res.redirect('/login');
    }

    const { id_user } = req.session.userData;
    const queryUserData = "SELECT * FROM users WHERE id_user = ?";

    db.query(queryUserData, [id_user], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            return res.render('dashboard', {
                userData: results[0]
            });
        } else {
            return res.status(404).send('User not found');
        }
    });
};
