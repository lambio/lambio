import React from 'react';
import AssetCard from './AssetCard';

const dockerAsset = {
  name: "Docker",
  lastUpdated: '2020/09/23 18:54'
}

const AssetCardTester = () => {
  return <AssetCard asset={dockerAsset} />;
}

export default AssetCardTester;