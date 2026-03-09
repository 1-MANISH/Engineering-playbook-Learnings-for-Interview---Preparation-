const computeLaunchStatus = async ({ launch, totalPurchased }) => {
  const now = new Date();
  const startsAt = new Date(launch.startsAt);
  const endsAt = new Date(launch.endsAt);

  const isSoldOut = totalPurchased >= launch.totalSupply;
  if (isSoldOut) return "SOLD_OUT";
  if (now < startsAt) return "UPCOMING";
  if (now > endsAt) return "ENDED";
  return "ACTIVE";
};

const computeTotalCost = ({ launch, amount, soldSoFar = 0 }) => {
  const tiers = Array.isArray(launch.tiers) ? launch.tiers : [];
  let remaining = amount;
  let cost = 0;
  let cursor = soldSoFar;

  if (tiers.length > 0) {
    const sortedTiers = [...tiers].sort((a, b) => a.minAmount - b.minAmount);
    for (const tier of sortedTiers) {
      if (remaining <= 0) break;
      const tierStart = tier.minAmount;
      const tierEnd = tier.maxAmount;
      const tierCapacity = Math.max(0, tierEnd - tierStart);
      if (tierCapacity <= 0) continue;

      const tierAvailable = Math.max(0, tierEnd - Math.max(tierStart, cursor));
      if (tierAvailable <= 0) {
        cursor = Math.max(cursor, tierEnd);
        continue;
      }

      const take = Math.min(remaining, tierAvailable);
      cost += take * tier.pricePerToken;
      remaining -= take;
      cursor += take;
    }
  }

  if (remaining > 0) {
    cost += remaining * launch.pricePerToken;
  }

  return cost;
};

const formatLaunch = async ({ launch, totalPurchased }) => {
  const status = await computeLaunchStatus({ launch, totalPurchased });
  return {
    id: launch.id,
    creatorId: launch.creatorId,
    name: launch.name,
    symbol: launch.symbol,
    totalSupply: launch.totalSupply,
    pricePerToken: launch.pricePerToken,
    startsAt: launch.startsAt,
    endsAt: launch.endsAt,
    maxPerWallet: launch.maxPerWallet,
    description: launch.description,
    tiers: launch.tiers ?? null,
    vesting: launch.vesting ?? null,
    createdAt: launch.createdAt,
    updatedAt: launch.updatedAt,
    status,
    totalPurchased,
  };
};

const roundTwo = (value) => {
  return Math.round(value * 100) / 100;
};

const computeVesting = ({ launch, totalPurchased }) => {
  const vesting = launch.vesting;
  const now = new Date();

  if (!vesting) {
    return {
      totalPurchased,
      tgeAmount: totalPurchased,
      cliffEndsAt: null,
      vestedAmount: totalPurchased,
      lockedAmount: 0,
      claimableAmount: totalPurchased,
    };
  }

  const startsAt = new Date(launch.startsAt);
  const cliffEndsAt = new Date(startsAt.getTime() + vesting.cliffDays * 24 * 60 * 60 * 1000);
  const vestingEndsAt = new Date(cliffEndsAt.getTime() + vesting.vestingDays * 24 * 60 * 60 * 1000);

  const tgeAmount = Math.floor((totalPurchased * vesting.tgePercent) / 100);

  let vestedAmount;
  if (now < cliffEndsAt) {
    vestedAmount = tgeAmount;
  } else if (now >= vestingEndsAt) {
    vestedAmount = totalPurchased;
  } else {
    const linearTotal = totalPurchased - tgeAmount;
    const elapsedMs = now.getTime() - cliffEndsAt.getTime();
    const vestingMs = vestingEndsAt.getTime() - cliffEndsAt.getTime();
    const vestedLinear = Math.floor((linearTotal * elapsedMs) / vestingMs);
    vestedAmount = tgeAmount + vestedLinear;
  }

  vestedAmount = Math.min(vestedAmount, totalPurchased);
  const lockedAmount = Math.max(0, totalPurchased - vestedAmount);
  const claimableAmount = vestedAmount;

  return {
    totalPurchased,
    tgeAmount,
    cliffEndsAt: cliffEndsAt.toISOString(),
    vestedAmount,
    lockedAmount,
    claimableAmount,
  };
};

module.exports = {
  computeLaunchStatus,
  computeTotalCost,
  formatLaunch,
  computeVesting,
  roundTwo,
};
