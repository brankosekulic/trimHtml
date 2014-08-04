/**
 * [trimHtml description]
 * @param  {String} html
 * @param  {Object} options
 * @return {Object}
 */
function trimHtml(html, options){

    options = options || {};

    var limit = options.limit || 100,
        preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true,
        sufix = options.sufix || '...';

    var arr = html.replace(/</g, "\n<")
                  .replace(/>/g, ">\n")
                  .replace(/\n\n/g, "\n")
                  .replace(/^\n/g, "")
                  .replace(/\n$/g, "")
                  .split("\n");
    
    var sum = 0,
        row, cut, add,
        tagName,
        tagStack = [],
        more = false;
                                                         
    for(var i = 0; i < arr.length; i++){
    
        row = arr[i].replace(/[ ]+/g, ' ');
    
        if(!row.length){
          continue;
        }

        if(row[0] !== "<"){
        
            if(sum >= limit){
                row = "";   
            }else if((sum + row.length) >= limit) {

                cut = limit - sum;

                if(row[cut - 1] === ' '){
                  cut -= 1;
                }else{

                  add = row.substring(cut).split('').indexOf(' ');

                  if(add !== -1){
                    cut += add;
                  }else{
                    cut = row.length;
                  }
                }

                row = row.substring(0, cut) + sufix;
                sum = limit;
                more = true;
            }else{
                sum += row.length;
            }
        }else if(!preserveTags){
            row = '';
        }else if(sum >= limit){

          tagName = row.match(/[a-zA-Z]+/)[0];

          if(row.length > 1 && row.substring(0, 2) !== '</'){

            tagStack.push(tagName);
            row = '';
          }else{

            while(tagStack[tagStack.length - 1] !== tagName && tagStack.length){
              tagStack.pop();
            }

            if(tagStack.length){
              row = '';
            }

            tagStack.pop();
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