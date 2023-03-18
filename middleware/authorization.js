module.exports = (...role) => {
  return (req, res, next) => {
    const userRole = req.use.role;
    if (!role.includes(userRole)) {
      return res.send(403).json({
        status: "Failed",
        error:
          "You are not authorized to access this content. Contact with your admin",
      });
    }

    next();
  };
};
