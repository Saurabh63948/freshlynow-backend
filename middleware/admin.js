const admin = (req, res, next) => {
  if (req.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "Admin access denied",
    });
  }
  next();
};

export default admin;
