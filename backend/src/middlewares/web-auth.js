// Block access to a page unless logged in
export const requireAuth = (req, res, next) => {
  if (!req.session.userId) return res.redirect("/login");
  next();
};

// Keep logged-in users off the login/register pages
export const redirectIfAuth = (req, res, next) => {
  if (req.session.userId) return res.redirect("/dashboard");
  next();
};