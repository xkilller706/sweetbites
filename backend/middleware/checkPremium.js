// Middleware para verificar si el usuario tiene plan Premium
const checkPremium = (req, res, next) => {
  if (!req.user || req.user.plan !== 'premium') {
    return res.status(403).json({
      success: false,
      message: 'Esta función requiere plan Premium',
      requiresPremium: true
    });
  }
  next();
};

module.exports = { checkPremium };
