var fs = require('fs');

const argsArray = process.argv.slice(2);

if (argsArray.length === 1) {
    const domainsFile = argsArray[0];

    if (domainsFile.endsWith('.txt')) {

        // Read file and split into line data

        const fileText = fs.readFileSync(`./${domainsFile}`, 'utf8');

        const lineTextArray = fileText.split(/\r?\n/);

        let elementsArray = [];

        for (let i = 0; i < lineTextArray.length; i++) {
            let lineText = lineTextArray[i];

            if (lineText) {
                lineText = lineText.trim();

                if (lineText.length > 0) {
                    // Check line is not comment

                    if (!lineText.startsWith('#')) {
                        elementsArray.push(lineText);
                    }
                }
            }
        }

        // Remove duplicates

        elementsArray = [...new Set(elementsArray)];

        // Sort

        elementsArray.sort();

        let fileString = '';

        for(var i = 0; i < elementsArray.length; i++)
        {
            fileString += `${elementsArray[i]}\n`
        }

        const outputFileName = domainsFile;

        fs.writeFileSync(outputFileName, fileString);

        console.log(fileString);
        console.log(`Output to ${outputFileName}`);
    }
    else
    {
        console.log(`Expected .txt file (domains files)`);
    }
}
else
{
    console.log(`No domain file argument supplied`);
}