
exports.API_KEY = process.env.API_KEY;

exports.PORT = process.env.PORT || 8080;

exports.SERVER = process.env.NODE_ENV === 'production' ? 'volingo.herokuapp.com' : require('os').hostname() + ':' + exports.PORT;

exports.CONTACT_URL = process.env.CONTACT_URL || 'javascript:void(0);';

exports.CONTACT_TEXT = process.env.CONTACT_TEXT || 'contact';

exports.HWR_URL = process.env.HWR_URL || '/hwr';
