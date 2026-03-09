const prisma = require("../prisma");

const authorizeLaunchCreator = async (req, res, next) => {
  const launchId = Number(req.params.id);
  if (Number.isNaN(launchId)) {
    return res.status(404).json({ error: "Launch not found" });
  }

  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) {
    return res.status(404).json({ error: "Launch not found" });
  }

  if (!req.user || req.user.id !== launch.creatorId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  req.launch = launch;
  return next();
};

module.exports = {
  authorizeLaunchCreator,
};
