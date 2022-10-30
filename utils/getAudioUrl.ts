export function getAudioURl(asset: any) {
  const ref = asset?.asset?._ref;
  const assetRefParts = ref?.split("-");
  const id = assetRefParts ? assetRefParts[1] : undefined;
  const format = assetRefParts ? assetRefParts[2] : undefined;
  const assetUrl = `https://cdn.sanity.io/files/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}.${format}`;
  return assetUrl;
}
