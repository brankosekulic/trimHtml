# trim-html #
Cutting a HTML String without breaking HTML Tags

[![Build Status](https://travis-ci.org/brankosekulic/trimHtml.svg?branch=master)](https://travis-ci.org/brankosekulic/trimHtml)

## Installation ##

### Node.js ###

**npm package**
```js
    npm install trim-html
```

**use in node.js**
```js
    var trimHtml = require('trim-html');
```
## Usage ##

### node.js
```js
    var trimmed = trimHtml(html);
 ```
## Options ##

### limit
Char limit (default 100)

### wordBreak
Break text on half of word (default false)

### preserveTags
Strip HTML tags (default true)

### suffix
string that will be appended at the end

### moreLink
link to full content

example:
```js
var html = `<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p><p>Ut 
            enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
            ex ea commodo consequat. </p><p>Duis aute irure dolor in reprehenderit in 
            voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p><p>Excepteur 
            sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit 
            anim id est laborum.</p></div>`;
```
```js
var trim = trimHtml(html, { limit: 200 });
```
```js
// returns object
{
   html: `<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
   sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p><p>Ut
   enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut...
   </p></div>`,
   more: true // indicates if limit is reached
}
```
