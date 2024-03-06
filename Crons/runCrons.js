const cron = require('node-cron');
const projects = require('./projects');


function runCrons() {
    cron.schedule('*/20 * * * * *', projects);
 
}

module.exports = runCrons;