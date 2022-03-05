# Recruiter Email Domains

This is a list of technical recruiter email domains to assist with the filtering of email from recruitment companies. **This is NOT a spam list** - recruiter contact is welcome and essential, but filtering makes it much easier to separate recruiter email for review at a convenient time.

Other means of managing excessive email from job / contract searches might include maintaining alternate email accounts.

This repository is an invite for others to share domains via pull request. Please try to order alphabetically before submitting pull requests (you can use the `orderDomainFile.js` script to sort domains in the file if required).

```
$ node orderDomainFile.js uk-recruiter-email-domains.txt 
```

## Creating a filter in GMail

To create a filter in GMail, go to `Settings > Filters and blocked addresses` and create a filter in the form below. From there you can opt to label etc.

```
from:(*@domain1.ie OR *@domain2.com ... )
```

You can automate the generation of a GMail filter string using `generateGMailFilter.js`. Note GMail has a 1500 character limit on filters, so this script splits the filter string at the 1500 character limit.

Run with:

```
$ node generateGMailFilter.js uk-recruiter-email-domains.txt
```

Updated output is maintained in this repository at `gmail-filters-from-<domains file>.txt`
