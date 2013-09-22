
exports.API_KEY = process.env.API_KEY;

exports.PORT = process.env.PORT || 8080;

exports.SERVER = process.env.NODE_ENV === 'production' ? 'volingo.herokuapp.com' : require('os').hostname() + ':' + exports.PORT;
