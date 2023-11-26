const { useMemo } = require("react");

export const useAssetsIds = (assets) => {
  return useMemo(() => {
    return assets.map((asset) => asset.id);
  }, [assets]);
};
