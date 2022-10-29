const fs = require("fs");
const crypto = require("crypto");
const globalMethods = {
  saveException: (err, ip) => {
    let content = `{
        Exception_Date:${new Date()}
        Client_ip:${ip}
        Exception_Message:\t${err.message}
        Exception_StackTrace:${err.stack}
      }
      ------------------------------------------------`;
    fs.appendFileSync("public/error/error.txt", content + "\n");
  },
  encrypt: function (data) {
    const cipher = crypto.createCipheriv(
      process.env.ALGORITHM,
      Buffer.from(process.env.SECRETKEY),
      Buffer.from(process.env.IV)
    );
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
  },
  decrypt: (encrypt_data) => {
    const decipher = crypto.createDecipheriv(
      process.env.ALGORITHM,
      Buffer.from(process.env.SECRETKEY),
      Buffer.from(process.env.IV)
    );
    let decryptedData = decipher.update(encrypt_data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  },
  replaceSpecialCharacters: (text) => {
    return text
      .toString()
      .replace("+", "1")
      .replace("/", "2")
      .replace("=", "3");
  },
};

module.exports = globalMethods;
