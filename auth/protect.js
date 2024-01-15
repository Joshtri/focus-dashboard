const isLoggedIn = (req, res, next) => {
  const { userId } = req.session;

  if (userId) {
    // Pengguna sudah login, lanjutkan ke halaman yang diminta
    next();
  } else {
    // Pengguna belum login, redirect ke halaman login atau halaman yang ditentukan
    const redirectUrl = req.query.redirect || "/login";
    res.redirect(redirectUrl);
  }
};

module.exports = {
  isLoggedIn,
};
