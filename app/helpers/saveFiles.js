const fs = require("fs");
module.exports = async (prodObj, recordLength, fileName) => {
  const firstFile = [];
  const secondFile = [];
  for (const key in prodObj) {
    if (prodObj.hasOwnProperty(key)) {
      const element = prodObj[key];
      element.avarage = element.number / recordLength;
      firstFile.push(key, element.avarage, "\n");
      secondFile.push(
        key,
        Object.keys(element.brand).reduce(function (a, b) {
          return element.brand[a] > element.brand[b] ? a : b;
        }),
        "\n"
      );
    }
  }
  const file1name = "public/files/0" + fileName;
  const file2name = "public/files/1" + fileName;
  fs.writeFile(file1name, firstFile.toString().replace(",\n,", ",\n"), (err) => {
    if (err) {
      console.log("Error writing to csv file", err);
    } else {
      console.log(`saved as ${file1name}`);
    }
  });
  fs.writeFile(file2name, secondFile.toString().replace(",\n,", ",\n"), (err) => {
    if (err) {
      console.log("Error writing to csv file", err);
    } else {
      console.log(`saved as ${file2name}`);
    }
  });
  if (fs.existsSync("public/files/" + fileName)) {
    fs.unlinkSync("public/files/" + fileName);
  }
};
