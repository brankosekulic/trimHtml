/**
 * [trimHtml description]
 * @param  {String} html
 * @param  {Object} options
 * @return {Object}
 */
function trimHtml(html, options) {

    options = options || {};

    var limit = options.limit || 100,
        preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true,
        sufix = options.sufix || '...',
        moreLink = options.moreLink || '';

    var arr = html.replace(/</g, "\n<")
        .replace(/>/g, ">\n")
        .replace(/\n\n/g, "\n")
        .replace(/^\n/g, "")
        .replace(/\n$/g, "")
        .split("\n");

    var sum = 0,
        row, cut, add,
        tagMatch,
        tagName,
        tagStack = [],
        more = false;

    for (var i = 0; i < arr.length; i++) {

        row = arr[i].replace(/[ ]+/g, ' ');

        if (!row.length) {
            continue;
        }

        if (row[0] !== "<") {

            if (sum >= limit) {
                row = "";
            } else if ((sum + row.length) >= limit) {

                cut = limit - sum;

                if (row[cut - 1] === ' ') {
                    cut -= 1;
                } else {

                    add = row.substring(cut).split('').indexOf(' ');

                    if (add !== -1) {
                        cut += add;
                    } else {
                        cut = row.length;
                    }
                }

                row = row.substring(0, cut) + sufix;

                if (moreLink) {
                    row += '<a href="' + moreLink + '" style="display:inline">»</a>';
                }

                sum = limit;
                more = true;
            } else {
                sum += row.length;
            }
        } else if (!preserveTags) {
            row = '';
        } else if (sum >= limit) {

            tagMatch = row.match(/[a-zA-Z]+/);
            tagName = tagMatch ? tagMatch[0] : '';

            if (tagName) {
                if (row.substring(0, 2) !== '</') {

                    tagStack.push(tagName);
                    row = '';
                } else {

                    while (tagStack[tagStack.length - 1] !== tagName && tagStack.length) {
                        tagStack.pop();
                    }

                    if (tagStack.length) {
                        row = '';
                    }

                    tagStack.pop();
                }
            } else {
                row = '';
            }
        }

        arr[i] = row;
    }

    return {
        html: arr.join("\n").replace(/\n/g, ""),
        more: more
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = trimHtml;
}
