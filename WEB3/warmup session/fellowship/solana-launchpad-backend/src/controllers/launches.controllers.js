const {
  computeLaunchStatus,
  computeTotalCost,
  formatLaunch,
  computeVesting,
} = require("../utils");
const prisma = require("../prisma");


const getLaunchWithTotals = async (launchId) => {
        const launch = await prisma.launch.findUnique({ where: { id: Number(launchId) } });
        if (!launch) return null;

        const totalPurchasedRes = await prisma.purchase.aggregate({
        where: { launchId: launch.id },
        _sum: { amount: true },
        });
        const totalPurchased = totalPurchasedRes._sum.amount ?? 0;

        return { launch, totalPurchased };
}

const requireCreator = (launch, userId, res) => {
        if (launch.creatorId !== userId) {
        res.status(403).json({ error: "Forbidden" });
        return false;
        }
        return true;
}

const parsePagination = (query) => {
        const page = Math.max(1, parseInt(query.page, 10) || 1);
        const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 10));
        const skip = (page - 1) * limit;
        return { page, limit, skip };
}

async function createLaunch(req,res){
      
        const {
                name,
                symbol,
                totalSupply,
                pricePerToken,
                startsAt,
                endsAt,
                maxPerWallet,
                description,
                tiers,
                vesting,
        } = req.body || {};

        if (
          name == null ||
          symbol == null ||
          totalSupply == null ||
          pricePerToken == null ||
          startsAt == null ||
          endsAt == null ||
          maxPerWallet == null
        ) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const startsAtDate = new Date(startsAt);
        const endsAtDate = new Date(endsAt);
        if (Number.isNaN(startsAtDate.getTime()) || Number.isNaN(endsAtDate.getTime())) {
          return res.status(400).json({ error: "Invalid dates" });
        }
        if (startsAtDate >= endsAtDate) {
          return res.status(400).json({ error: "startsAt must be before endsAt" });
        }

        if (Number(totalSupply) <= 0 || Number(maxPerWallet) <= 0 || Number(pricePerToken) < 0) {
          return res.status(400).json({ error: "Invalid numeric values" });
        }

        if (tiers != null) {
          if (!Array.isArray(tiers)) {
            return res.status(400).json({ error: "Invalid tiers" });
          }
          for (const tier of tiers) {
            if (
              tier == null ||
              tier.minAmount == null ||
              tier.maxAmount == null ||
              tier.pricePerToken == null
            ) {
              return res.status(400).json({ error: "Invalid tiers" });
            }
            if (
              Number(tier.minAmount) < 0 ||
              Number(tier.maxAmount) <= Number(tier.minAmount) ||
              Number(tier.pricePerToken) < 0
            ) {
              return res.status(400).json({ error: "Invalid tiers" });
            }
          }
        }

        if (vesting != null) {
          if (
            vesting.cliffDays == null ||
            vesting.vestingDays == null ||
            vesting.tgePercent == null
          ) {
            return res.status(400).json({ error: "Invalid vesting" });
          }
          if (
            Number(vesting.cliffDays) < 0 ||
            Number(vesting.vestingDays) < 0 ||
            Number(vesting.tgePercent) < 0 ||
            Number(vesting.tgePercent) > 100
          ) {
            return res.status(400).json({ error: "Invalid vesting" });
          }
        }

        const launch = await prisma.launch.create({
          data: {
            creatorId: req.user.id,
            name,
            symbol,
            totalSupply: Number(totalSupply),
            pricePerToken: Number(pricePerToken),
            startsAt: startsAtDate,
            endsAt: endsAtDate,
            maxPerWallet: Number(maxPerWallet),
            description: description ?? null,
            tiers: tiers ?? null,
            vesting: vesting ?? null,
          },
        });

        const formatted = await formatLaunch({ launch, totalPurchased: 0 });
        return res.status(201).json(formatted);

}

 async function listLaunch(req, res)  {
        const { page, limit } = parsePagination(req.query);
        const statusFilter = typeof req.query.status === "string" ? req.query.status.toUpperCase() : undefined;

        const launches = await prisma.launch.findMany({
        orderBy: { createdAt: "desc" },
        });

        const formattedAll = [];
        for (const launch of launches) {
        const totalPurchasedRes = await prisma.purchase.aggregate({
        where: { launchId: launch.id },
        _sum: { amount: true },
        });
        const totalPurchased = totalPurchasedRes._sum.amount ?? 0;
        const status = await computeLaunchStatus({ launch, totalPurchased });
        if (statusFilter && statusFilter !== status) {
        continue;
        }
        formattedAll.push(await formatLaunch({ launch, totalPurchased }));
        }

        const total = formattedAll.length;
        const startIdx = (page - 1) * limit;
        const paginated = formattedAll.slice(startIdx, startIdx + limit);

        return res.status(200).json({ launches: paginated, total, page, limit });
}

 async function getLaunchWithComputedStatus (req, res)  {
  const launchId = Number(req.params.id);
  const data = await getLaunchWithTotals(launchId);
  if (!data) return res.status(404).json({ error: "Launch not found" });
  const formatted = await formatLaunch(data);
  return res.status(200).json(formatted);
}

 async function updateLaunch (req, res) {
  const launchId = Number(req.params.id);
  const existing = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!existing) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(existing, req.user.id, res)) return;

  const {
    name,
    symbol,
    totalSupply,
    pricePerToken,
    startsAt,
    endsAt,
    maxPerWallet,
    description,
    tiers,
    vesting,
  } = req.body || {};

  const updatedData = {
    name: name ?? existing.name,
    symbol: symbol ?? existing.symbol,
    totalSupply: totalSupply != null ? Number(totalSupply) : existing.totalSupply,
    pricePerToken: pricePerToken != null ? Number(pricePerToken) : existing.pricePerToken,
    startsAt: startsAt ? new Date(startsAt) : existing.startsAt,
    endsAt: endsAt ? new Date(endsAt) : existing.endsAt,
    maxPerWallet: maxPerWallet != null ? Number(maxPerWallet) : existing.maxPerWallet,
    description: description ?? existing.description,
    tiers: tiers != null ? tiers : existing.tiers,
    vesting: vesting != null ? vesting : existing.vesting,
  };

  if (updatedData.totalSupply <= 0 || updatedData.maxPerWallet <= 0 || updatedData.pricePerToken < 0) {
    return res.status(400).json({ error: "Invalid numeric values" });
  }

  if (tiers != null) {
    if (!Array.isArray(tiers)) {
      return res.status(400).json({ error: "Invalid tiers" });
    }
    for (const tier of tiers) {
      if (
        tier == null ||
        tier.minAmount == null ||
        tier.maxAmount == null ||
        tier.pricePerToken == null
      ) {
        return res.status(400).json({ error: "Invalid tiers" });
      }
      if (
        Number(tier.minAmount) < 0 ||
        Number(tier.maxAmount) <= Number(tier.minAmount) ||
        Number(tier.pricePerToken) < 0
      ) {
        return res.status(400).json({ error: "Invalid tiers" });
      }
    }
  }

  if (vesting != null) {
    if (
      vesting.cliffDays == null ||
      vesting.vestingDays == null ||
      vesting.tgePercent == null
    ) {
      return res.status(400).json({ error: "Invalid vesting" });
    }
    if (
      Number(vesting.cliffDays) < 0 ||
      Number(vesting.vestingDays) < 0 ||
      Number(vesting.tgePercent) < 0 ||
      Number(vesting.tgePercent) > 100
    ) {
      return res.status(400).json({ error: "Invalid vesting" });
    }
  }

  const startsAtDate = new Date(updatedData.startsAt);
  const endsAtDate = new Date(updatedData.endsAt);
  if (Number.isNaN(startsAtDate.getTime()) || Number.isNaN(endsAtDate.getTime())) {
    return res.status(400).json({ error: "Invalid dates" });
  }
  if (startsAtDate >= endsAtDate) {
    return res.status(400).json({ error: "startsAt must be before endsAt" });
  }

  const updated = await prisma.launch.update({
    where: { id: launchId },
    data: updatedData,
  });

  const totalPurchasedRes = await prisma.purchase.aggregate({
    where: { launchId: updated.id },
    _sum: { amount: true },
  });
  const totalPurchased = totalPurchasedRes._sum.amount ?? 0;

  const formatted = await formatLaunch({ launch: updated, totalPurchased });
  return res.status(200).json(formatted);
}




async function addWhiteListAddress (req, res){
  const launchId = Number(req.params.id);
  const addresses = Array.isArray(req.body.addresses) ? req.body.addresses : [];

  if (addresses.length === 0) {
    return res.status(400).json({ error: "Missing addresses" });
  }

  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(launch, req.user.id, res)) return;

  const toCreate = addresses.map((address) => ({ launchId, address }));
  const result = await prisma.whitelistEntry.createMany({
    data: toCreate,
    skipDuplicates: true,
  });

  const total = await prisma.whitelistEntry.count({ where: { launchId } });
  return res.status(200).json({ added: result.count, total });
}


async function getWhitelist (req, res)  {
  const launchId = Number(req.params.id);
  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(launch, req.user.id, res)) return;

  const entries = await prisma.whitelistEntry.findMany({
    where: { launchId },
    orderBy: { address: "asc" },
  });

  const addresses = entries.map((e) => e.address);
  return res.status(200).json({ addresses, total: addresses.length });
}

async function deleteWhitelistAddress (req, res)  {
  const launchId = Number(req.params.id);
  const address = req.params.address;

  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(launch, req.user.id, res)) return;

  const existing = await prisma.whitelistEntry.findUnique({
    where: { launchId_address: { launchId, address } },
  });
  if (!existing) {
    return res.status(404).json({ error: "Not found" });
  }

  await prisma.whitelistEntry.delete({ where: { id: existing.id } });
  return res.status(200).json({ removed: true });
}



async function createReferralCode (req, res) {
  const launchId = Number(req.params.id);
  const { code, discountPercent, maxUses } = req.body || {};
  if (!code || discountPercent == null || maxUses == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(launch, req.user.id, res)) return;

  try {
    const referral = await prisma.referralCode.create({
      data: {
        launchId,
        code,
        discountPercent: Number(discountPercent),
        maxUses: Number(maxUses),
      },
    });

    return res.status(201).json({
      id: referral.id,
      code: referral.code,
      discountPercent: referral.discountPercent,
      maxUses: referral.maxUses,
      usedCount: referral.usedCount,
    });
  } catch (err) {
    // Assume unique constraint violation
    return res.status(409).json({ error: "Referral code already exists" });
  }
}


 async function listReferralCodes (req, res)  {
  const launchId = Number(req.params.id);
  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });
  if (!requireCreator(launch, req.user.id, res)) return;

  const referrals = await prisma.referralCode.findMany({
    where: { launchId },
    orderBy: { id: "asc" },
  });

  const formatted = referrals.map((r) => ({
    id: r.id,
    code: r.code,
    discountPercent: r.discountPercent,
    maxUses: r.maxUses,
    usedCount: r.usedCount,
  }));
  return res.status(200).json({ referrals: formatted });
}



async function createPurchase (req, res)  {
  const launchId = Number(req.params.id);
  const { walletAddress, amount, txSignature, referralCode } = req.body || {};

  if (!walletAddress || amount == null || !txSignature) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (Number(amount) <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  const data = await getLaunchWithTotals(launchId);
  if (!data) return res.status(404).json({ error: "Launch not found" });

  const { launch, totalPurchased } = data;
  const status = await computeLaunchStatus({ launch, totalPurchased });
  if (status !== "ACTIVE") {
    return res.status(400).json({ error: "Launch is not active" });
  }

  const whitelistCount = await prisma.whitelistEntry.count({ where: { launchId } });
  if (whitelistCount > 0) {
    const found = await prisma.whitelistEntry.findFirst({
      where: { launchId, address: walletAddress },
    });
    if (!found) {
      return res.status(400).json({ error: "Wallet not whitelisted" });
    }
  }

  const existingTx = await prisma.purchase.findUnique({
    where: { launchId_txSignature: { launchId, txSignature } },
  });
  if (existingTx) {
    return res.status(400).json({ error: "Duplicate txSignature" });
  }

  const userPurchasedRes = await prisma.purchase.aggregate({
    where: { launchId, userId: req.user.id },
    _sum: { amount: true },
  });
  const userPurchased = userPurchasedRes._sum.amount ?? 0;
  if (userPurchased + Number(amount) > launch.maxPerWallet) {
    return res.status(400).json({ error: "Exceeds maxPerWallet" });
  }

  if (totalPurchased + Number(amount) > launch.totalSupply) {
    return res.status(400).json({ error: "Exceeds totalSupply" });
  }

  const totalCost = computeTotalCost({
    launch,
    amount: Number(amount),
    soldSoFar: totalPurchased,
  });
  let referral = null;
  if (referralCode) {
    referral = await prisma.referralCode.findFirst({
      where: { launchId, code: referralCode },
    });
    if (!referral) {
      return res.status(400).json({ error: "Invalid referral code" });
    }
    if (referral.usedCount >= referral.maxUses) {
      return res.status(400).json({ error: "Referral code exhausted" });
    }
    totalCost = totalCost * (1 - referral.discountPercent / 100);
  }

  totalCost = roundTwo(totalCost);

  const purchase = await prisma.purchase.create({
    data: {
      launchId,
      userId: req.user.id,
      walletAddress,
      amount: Number(amount),
      totalCost,
      txSignature,
      referralCodeId: referral ? referral.id : null,
    },
  });

  if (referral) {
    await prisma.referralCode.update({
      where: { id: referral.id },
      data: { usedCount: { increment: 1 } },
    });
  }

  return res.status(201).json({
    id: purchase.id,
    launchId: purchase.launchId,
    userId: purchase.userId,
    walletAddress: purchase.walletAddress,
    amount: purchase.amount,
    totalCost: purchase.totalCost,
    txSignature: purchase.txSignature,
    createdAt: purchase.createdAt,
  });
}


async function listPurchases (req, res)  {
  const launchId = Number(req.params.id);
  const launch = await prisma.launch.findUnique({ where: { id: launchId } });
  if (!launch) return res.status(404).json({ error: "Launch not found" });

  const isCreator = launch.creatorId === req.user.id;
  const where = isCreator ? { launchId } : { launchId, userId: req.user.id };

  const purchases = await prisma.purchase.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const total = await prisma.purchase.count({ where });

  const formatted = purchases.map((p) => ({
    id: p.id,
    userId: p.userId,
    walletAddress: p.walletAddress,
    amount: p.amount,
    totalCost: p.totalCost,
    txSignature: p.txSignature,
    createdAt: p.createdAt,
  }));

  return res.status(200).json({ purchases: formatted, total });
}


async function getVestingSchedule (req, res)  {
  const launchId = Number(req.params.id);
  const walletAddress = req.query.walletAddress;
  if (!walletAddress) {
    return res.status(400).json({ error: "Missing walletAddress" });
  }

  const data = await getLaunchWithTotals(launchId);
  if (!data) return res.status(404).json({ error: "Launch not found" });

  const totalPurchasedRes = await prisma.purchase.aggregate({
    where: { launchId, walletAddress },
    _sum: { amount: true },
  });
  const totalPurchased = totalPurchasedRes._sum.amount ?? 0;

  const schedule = computeVesting({
    launch: data.launch,
    totalPurchased,
  });

  return res.status(200).json(schedule);
}
module.exports = {
        createLaunch,
        listLaunch,
        getLaunchWithComputedStatus,

        updateLaunch,
        addWhiteListAddress,
        getWhitelist,
        deleteWhitelistAddress,

        createReferralCode,
        listReferralCodes,


        createPurchase,
        listPurchases,
        getVestingSchedule

}