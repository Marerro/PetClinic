const fs = require('fs');
const path = require('path');
 
console.log(__dirname); // gauname path iki direktorijos.

const dir = path.join(__dirname, "data.txt"); // kelia sujungiame su direktorija ir sukuriame data.txt

console.log(dir);

// Write
const writeToFile = () => {
    fs.writeFile(dir, "Hello", (error) => {
        if(error){
            console.log(error);
            return;
        }

        console.log("File successfully written");
        
    })
}

// Append - prideti įraša.
const appendFile = () => {
    fs.appendFile(dir, "Hello", (error) => {
        if(error){
            console.log(error);
            return;
        }

        console.log("added Hello");
        
    })
}

// DeleteFile
const deleteFile = () => {
    fs.unlink(dir, (error) => {
        if(error){
            console.log(error);
            return;
        }

        console.log("data.txt was deleted");
        
    })
}


// Read
const readToFile = () => {
    fs.readFile(dir, "utf8", (error, data) => {
        if(error){
            console.log(error);
            return;
        }

        console.log(data);
        
    })
}

appendFile();
writeToFile();
readToFile();
deleteFile();