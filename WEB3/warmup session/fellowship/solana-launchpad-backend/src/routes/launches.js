const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { authorizeLaunchCreator } = require("../middleware/authorizeLaunchCreator");
const {
  createLaunch,
  listLaunch,
  getLaunchWithComputedStatus,
  updateLaunch,
  addWhiteListAddress,
  getWhitelist,
  deleteWhitelistAddress,
  createReferralCode,
  listReferralCodes,
  listPurchases,
  getVestingSchedule,
  createPurchase,
} = require("../controllers/launches.controllers");

const router = express.Router();

router.post("/", authMiddleware, createLaunch);

router.get("/", listLaunch);

router.get("/:id", getLaunchWithComputedStatus);

router.put("/:id", authMiddleware, authorizeLaunchCreator, updateLaunch);

// Whitelist
router.post("/:id/whitelist", authMiddleware, authorizeLaunchCreator, addWhiteListAddress);

router.get("/:id/whitelist", authMiddleware, authorizeLaunchCreator, getWhitelist);

router.delete(
  "/:id/whitelist/:address",
  authMiddleware,
  authorizeLaunchCreator,
  deleteWhitelistAddress
);

// Referral codes
router.post("/:id/referrals", authMiddleware, authorizeLaunchCreator, createReferralCode);

router.get("/:id/referrals", authMiddleware, authorizeLaunchCreator, listReferralCodes);

// Purchases
router.post("/:id/purchase", authMiddleware, createPurchase);

router.get("/:id/purchases", authMiddleware, listPurchases);

router.get("/:id/vesting", getVestingSchedule);

module.exports = router;
