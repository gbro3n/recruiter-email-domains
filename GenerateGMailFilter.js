var fs = require('fs');

const argsArray = process.argv.slice(2);

if (argsArray.length === 1) {
    const domainsFile = argsArray[0];

    if (domainsFile.endsWith('.txt')) {

        const outputFolderName = 'output';

        // Create output folder if doesn't exist

        if (!fs.existsSync(outputFolderName)){
            fs.mkdirSync(outputFolderName);
        }

        // Read file and split into line data

        const fileText = fs.readFileSync(`./${domainsFile}`, 'utf8');

        const lineTextArray = fileText.split(/\r?\n/);

        let emailFilterElementsArray = [];

        for (let i = 0; i < lineTextArray.length; i++) {
            let lineText = lineTextArray[i];

            if (lineText) {
                lineText = lineText.trim();

                if (lineText.length > 0) {
                    // Check line is not comment

                    if (!lineText.startsWith('#')) {
                        emailFilterElementsArray.push('*@' + lineText);
                    }
                }
            }
        }

        const copyPasteFilterStrings = []; 

        let currentCopyPasteFilterString = '';

        let importFileFilterString = '';

        // GMail has a filter limit of 1500 characters where filter string is copied manually into filters UI.

        for (var i = 0; i < emailFilterElementsArray.length; i++)
        {
            // Append until 1500 char limit and then push, reset

            if(currentCopyPasteFilterString.length < 1500 && i < emailFilterElementsArray.length - 1)
            {
                currentCopyPasteFilterString += ' OR ' + emailFilterElementsArray[i];
            }
            else
            {
                // Append string less leading ' OR '

                copyPasteFilterStrings.push(currentCopyPasteFilterString.substring(4));

                // Reset string

                currentCopyPasteFilterString = '';
            }   
        }

        // There does not appear to be such a limit for import filter files, so append all

        for (var i = 0; i < emailFilterElementsArray.length; i++)
        {
            importFileFilterString += ' OR ' + emailFilterElementsArray[i];
        }

        // Trim leading leading ' OR '

        if(importFileFilterString.length > 0)
        {
            importFileFilterString = importFileFilterString.substring(4);
        }

        // Output copy past filters file ...

        let fileString = 'Filters are split according to GMails 1500 character limit.\n\n';

        for(var i = 0; i < copyPasteFilterStrings.length; i++)
        {
            fileString += `Filter ${i + 1}:\n`
            fileString += copyPasteFilterStrings[i] + '\n\n';
        }

        fs.writeFileSync(`${outputFolderName}/gmailFilterCopyPaste.txt`, fileString);

        // Output XML import file ...

        const filterImportTemplateText = fs.readFileSync(`./gmailFilterImportTemplate.xml`, 'utf8');

        const gmailFilterImportXml = filterImportTemplateText.replace('${filters}', importFileFilterString);

        fs.writeFileSync(`${outputFolderName}/gmailFilterImportXml.xml`, gmailFilterImportXml);

        // Finished

        console.log(`Complete. Check output folder.`);
    }
    else
    {
        console.log(`Expected .txt file (domains files)`);
    }
}