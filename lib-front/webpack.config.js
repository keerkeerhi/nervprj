
function buildConfig(env) {
    return require('./config/' + env + '.js')({ env: env })
}

module.exports = env=>{
    console.log('=====env=',env.NODE_ENV,process.env.NODE_ENV)
    return buildConfig(env.NODE_ENV)
}