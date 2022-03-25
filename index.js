const fs = require('fs');
const readLineSync = require('readline-sync')


let menu = [
    'Refine unique item same file',
    'Find Abandone items between two file '
];

let menuIndex = readLineSync.keyInSelect(menu, "Choose your options: ");

if (menu[menuIndex] == "Refine unique item same file") {
    let fileToRead = readLineSync.question('write the file to refine: ');
    let result = refineData(fileToRead);
    console.log(`Total ${result.total} item found. Unique item- ${result.unique}`);
    if (readLineSync.keyInYN('Do you want to write the unique item in a new file? ')) {
        let newFileName = readLineSync.question('Write the new filename: ');
        writeToNewFile(newFileName, result.data);
        console.log(`A new file called ${newFileName} with ${result.data.length} items is written.`);
        console.log('Thank you so much Mr. shajib')
    } else {
        console.log('Thank you so much Mr. shajib');
    }
} else {
    let sourceFile = readLineSync.question('write the  source file name: ');
    let fileToMatch = readLineSync.question('write the file name to match data: ');
    let result = abandonedItems(sourceFile, fileToMatch);
    console.log(`Total ${result.total} item found. abandone item- ${result.unique}`);
    if (readLineSync.keyInYN('Do you want to write the abandone item in a new file? ')) {
        let newFileName = readLineSync.question('Write the new filename: ');
        writeToNewFile(newFileName, result.data);
        console.log(`A new file called ${newFileName} with ${result.data.length} items is written.`);
        console.log('Thank you so much Mr. shajib')
    } else {
        console.log('Thank you so much Mr. shajib');
    }

}



// const readFile = fs.readFileSync('./File/test.txt').toString().toLowerCase().split(',');
// const unquieItem = [...new Set(readFile)];
// let writeFIle = fs.writeFileSync('./File/output.txt', unquieItem.toString());

function refineData(fileToRead) {
    let unrefineData = fs.readFileSync(`./File/${fileToRead}`).toString().toLowerCase().split(',');
    let refineData = [...new Set(unrefineData)];
    return {
        total: unrefineData.length,
        unique: refineData.length,
        data: refineData
    }
};

function writeToNewFile(newFile, data) {
    fs.writeFileSync(`./File/${newFile}`, data.join(','));
    return true
}

function abandonedItems(sourcesFile, fileToMatch) {
    let sourcesFileItems = fs.readFileSync(`./File/${sourcesFile}`).toString().toLowerCase().split(',');
    let fileToMatchItems = fs.readFileSync(`./File/${fileToMatch}`).toString().toLowerCase().split(',');
    let abandonedItems = sourcesFileItems.filter(item => fileToMatchItems.indexOf(item) == -1);
    return {
        total: sourcesFileItems.length,
        abandonedItems: abandonedItems.length,
        data: abandonedItems
    }
}

// let refineDatas = refineData('test.txt')
// let writeFile = ('output.txt', refineDatas.toString());
// console.log(abandonedItems('test.txt', 'optedEmail.txt'));