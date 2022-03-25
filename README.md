# Recruiter Email Domains

This is a list of technical recruiter email domains to assist with the filtering of email from recruitment companies. **This is NOT a spam list** - recruiter contact is welcome and essential for many tech workers, but filtering makes it much easier to separate recruiter email for review at a convenient time.

Other means of managing excessive email from job / contract searches might include maintaining alternate email accounts.


You can automate the generation of a GMail filter string file using `generateGMailFilter.js`.

Run with:

```
$ node generateGMailFilter.js uk-recruiter-email-domains.txt
```

Note that upto date output import files are included in this repository under the `output` folder so you do not need to run the above script if you are not modifying the `<list>-domains.txt` file. 

## Creating Filters From Output in GMail

### Using Import XML Output File

- In GMail, in the top-right corner, click the gear icon to access your "Settings"
- Click "Settings"
- Navigate to the "Filters and Blocked Addresses" tab.
- Click the 'Import filters' link.
- Select the file `gmailFilterImportXml.xml` from the output folder.
- Click 'Open file' button.

You will see a new filter with a collection of email domains as below.

![](https://raw.githubusercontent.com/garethrbrown/recruiter-email-domains/main/images/example-gmail-import.png)

### Using Copy Paste Filter Output File

Note that GMail has a 1500 character limit on filters where, so this script splits the filter string at the 1500 character limit. This limit does not appear to apply when using import XML file below.

- In GMail, in the top-right corner, click the gear icon to access your "Settings"
- Click "Settings"
- Navigate to the "Filters and Blocked Addresses" tab.
- Click the 'Create new filter' link.
- In the 'From' field, paste each import string from `gmailFilterCopyPaste.txt` in the output folder.
- Click the 'Search' button.
- From there you can continue to apply labels etc and create the filter.

## Contributing

This repository is an invite for others to share domains via pull request. Please try to order alphabetically before submitting pull requests (you can use the `orderDomainFile.js` script to sort domains in the file if required).

```
$ node orderDomainFile.js uk-recruiter-email-domains.txt 
```