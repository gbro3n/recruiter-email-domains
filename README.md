# Recruiter Email Domains

This is a list of recruiter email domains to assist with the filtering of email as a result of job searches. **This is NOT a spam list** - recruiter contact is welcome and essential for my work, but filtering makes it much easier to separate recruiter email so I can review at a convenient time.

Other means of managing excessive email from job / contract searches might include maintaining alternate email accounts.

This repository is an invite for others to share domains via pull request. Please try to order alphabetically check for duplicatesand before creating pull requests as I have not yet built a means of doing so.

## Creating a filter in GMail

To create a filter in GMail, go to `Settings > Filters and blocked addresses` and create a filter in the form below. From there you can opt to label etc.

```
from:(*@domain1.ie OR *@domain2.com ... )
```

You can automate the generation of the filter string using `GenerateGMailFilter.js`

```
node GenerateGMailFilter.js uk-recruiter-email-domains.txt
```
