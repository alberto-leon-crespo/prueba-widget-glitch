module.exports = function override(config) {
    if (process.env.NODE_ENV === 'production') {
        config.optimization.minimize = false;
    }
    return config;
};