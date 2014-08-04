#trim-html#

##Installation##

###Node.js###

**npm package**

    npm install trim-html


**use in node.js**

    var trimHtml = require('trim-html');

##Usage##

###node.js

    var trimmed = trimHtml(html);
    
##Options##

###limit
Char limit (default 100)

###preserveTags
Strip HTML tags (default false)

examples:

    var html = '<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p></div>';

    var trim = trimHtml(html, { limit: 200 });

    // returns object
    {
        html: '<div><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut...</p></div>',
        more: true // indicates if limit is reached
    }