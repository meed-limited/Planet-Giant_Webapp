interface Attributes {
  display_type?: string;
  trait_type: string;
  value: string;
}

export const getSerieAttributes = (nft: NFTinDB) => {
  const attributes = nft.metadata?.attributes;
  const serie = attributes.filter((item: Attributes) => item.trait_type === "Series");
  return serie[0].value;
};

export const getBoostAttributes = (nft: NFTinDB) => {
  const attributes = nft.metadata?.attributes;
  const boost = attributes.filter((item: Attributes) => item.display_type === "Booster");
  return boost[0].value;
};

export const getLevelAttributes = (nft: NFTinDB) => {
  const attributes = nft.metadata?.attributes;
  const boost = attributes.filter((item: Attributes) => item.trait_type === "Level");
  return boost[0].value;
};

export const getTypeAttributes = (nft: NFTinDB) => {
  const attributes = nft.metadata?.attributes;
  const type = attributes.filter(
    (item: { display_type: string; trait_type: string }) =>
      item.display_type === "Booster" && item.trait_type === "Time"
  );
  return type.length > 0 ? "s" : "%";
};

export const getLevelForTitle = (nft: NFTinDB) => {
  const level = getLevelAttributes(nft);
  if (level === "2") return "II";
  if (level === "3") return "III";
  return "I";
};
