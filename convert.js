const prompt = require('prompt'),
    fs = require('fs');
prompt.start();

console.log(`Enter file name with path (ex: c:\\user\\file.json):`)
prompt.get("file", (error, result) => {
   if(error) return console.error(error);
   const path = result.file;
   if(!path.endsWith(".json")) return console.error("Please enter json file.")
   const filePath = path.includes("\\") ? path.replace(/\\/gm, '/') : path,
       dataFile = fs.readFileSync(filePath),
       data = JSON.parse(dataFile),
       csvFileName = path.replace(/[A-Z].\\(.)*\\/g, '').split('.').shift();

   fs.appendFile(`${csvFileName}.csv`, convertFile(data),error => {
      if(error) return console.error(error);
      console.log(`file generated with name: ${csvFileName}`)
   });
});

function convertFile(data) {
   let fileContent = "";

   for(const property in data) {
      const dataProperty = data[property];
      if(dataProperty.constructor === ({}).constructor) {
         fileContent += `${property};`;
         for(const j in dataProperty) {
            const k = dataProperty[j];
            fileContent += `${k},`
         }
         fileContent += ";\n";
      } else fileContent += `${property};${dataProperty};\n`;
   }

   return fileContent;
}