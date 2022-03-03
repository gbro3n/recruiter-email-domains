var fs = require('fs');

const argsArray = process.argv.slice(2);

if (argsArray.length === 1) {
    const domainsFile = argsArray[0];

    if (domainsFile.endsWith('.txt')) {

        // Read file and split into line data

        const envVariablesFileText = fs.readFileSync(`./${domainsFile}`, 'utf8');

        const lineTextArray = envVariablesFileText.split(/\r?\n/);

        let filterElementsArray = [];

        for (let i = 0; i < lineTextArray.length; i++) {
            let lineText = lineTextArray[i];

            if (lineText) {
                lineText = lineText.trim();

                if (lineText.length > 0) {
                    // Check line is not comment

                    if (!lineText.startsWith('#')) {
                        filterElementsArray.push('*@' + lineText);
                    }
                }
            }
        }

        const filterString = `${filterElementsArray.join(' OR ')}`;

        // GMail has a filter limit of 1500 characters.

        // TODO: Split on element boundary, not just on 1500 character limit

        const splitFilterStrings = filterString.match(/.{1,1500}/g)

        let fileString = 'Filters are split according to GMails 1500 character limit.\n\n';

        for(var i = 0; i < splitFilterStrings.length; i++)
        {
            fileString += `Filter ${i + 1}:\n`
            fileString += splitFilterStrings[i] + '\n\n';
        }

        console.log(splitFilterStrings);

        const outputFileName = `filter-string-output.txt`;

        fs.writeFileSync(outputFileName, fileString);

        console.log(fileString);
        console.log(`Output to ${outputFileName}`);
    }
    else
    {
        console.log(`Expected .txt file (domains files)`);
    }
}