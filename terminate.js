const fs = require('fs')
function terminate (server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = code => {
      options.coredump ? process.abort() : process.exit(code)
    }
  
    return (code, reason) => (err, promise) => {
      if (err && err instanceof Error) {
      // Log error information, use a proper logging library here :)
      let content = `{
        Exception_Date:${new Date()}
        Exception_Message:\t${err.message}
        Exception_StackTrace:${err.stack}
      }
      ------------------------------------------------`
    fs.appendFileSync('public/error/error.txt', content + '\n');
      }
  
      // Attempt a graceful shutdown
      server.close(exit)
      setTimeout(exit, options.timeout).unref()
    }
  }
  
  module.exports = terminate