const webConfig = {
  target: 'web',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build/node`,
  }
};

const nodeConfig = {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: `${__dirname}/build/web`,
  },
};

module.exports = [webConfig, nodeConfig];
