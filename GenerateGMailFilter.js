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

        // GMail has a filter limit of 1500 characters.

        const splitFilterStrings = []; 

        let currentSplitFilterString = '';

        for (var i = 0; i < filterElementsArray.length; i++)
        {
            if(currentSplitFilterString.length < 1500 && i < filterElementsArray.length - 1)
            {
                currentSplitFilterString += ' OR ' + filterElementsArray[i];
            }
            else
            {
                // Append string less leading ' OR '

                splitFilterStrings.push(currentSplitFilterString.substring(4));

                // Reset string

                currentSplitFilterString = '';
            }   
        }

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