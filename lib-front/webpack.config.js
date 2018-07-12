const env = process.env.NODE_ENV

function buildConfig(env) {
    return require('./config/' + env + '.js')({ env: env })
}
console.log('=====env=',env)
module.exports = buildConfig(env);