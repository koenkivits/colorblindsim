module.exports = function (bundler) {
	bundler.addAssetType('.vert', require.resolve('./ShaderAsset'));
	bundler.addAssetType('.frag', require.resolve('./ShaderAsset'));
};
