export const getSerieAttributes = (nft) => {
  const attributes = nft.metadata?.attributes;
  const serie = attributes.filter((item) => item.trait_type === "Series");
  return serie[0].value;
};

export const getBoostAttributes = (nft) => {
  const attributes = nft.metadata?.attributes;
  const boost = attributes.filter((item) => item.display_type === "Booster");
  return boost[0].value;
};

export const getLevelAttributes = (nft) => {
  const attributes = nft.metadata?.attributes;
  const boost = attributes.filter((item) => item.trait_type === "Level");
  return boost[0].value;
};

export const getTypeAttributes = (nft) => {
  const attributes = nft.metadata?.attributes;
  const type = attributes.filter((item) => item.display_type === "Booster" && item.trait_type === "Time");
  return type.length > 0 ? "s" : "%";
};

export const getLevelForTitle = (nft) => {
  const level = getLevelAttributes(nft);
  if (level === "1") return "I";
  if (level === "2") return "II";
  if (level === "3") return "III";
};
