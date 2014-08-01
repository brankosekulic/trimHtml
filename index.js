/**
 * [trimHtml description]
 * @param  {String} html
 * @param  {Object} options
 * @return {String}
 */
function trimHtml(html, options){

    options = options || {};

    limit = options.limit || 100;
    preserveTags = (typeof options.preserveTags !== 'undefined') ? options.preserveTags : true;

    var arr = html.replace(/</g, "\n<")
                  .replace(/>/g, ">\n")
                  .replace(/\n\n/g, "\n")
                  .replace(/^\n/g, "")
                  .replace(/\n$/g, "")
                  .split("\n");
    
    var sum = 0,
        row, cut, add,
        tagName,
        tagStack = [];
                                                         
    for(var i = 0; i < arr.length; i++){
    
        row = arr[i];
    
        if(row.length && (row[0] !== "<")){
        
            if(sum >= limit){
                arr[i] = "";   
            }else if((sum + row.length) >= limit) {

                cut = limit - sum;

                if(arr[i][cut - 1] === ' '){
                  cut -= 1;
                }else{

                  add = arr[i].substring(cut).split('').indexOf(' ');

                  if(add !== -1){
                    cut += add;
                  }else{
                    cut = arr[i].length;
                  }
                }

                arr[i] = arr[i].substring(0, cut) + '...';
                sum = limit;
            }else{
                sum += row.length;
            }
        }else if(!preserveTags){
            arr[i] = ' ';
        }else if(sum >= limit){

          tagName = arr[i].match(/[a-zA-Z]+/)[0];

          if(row.length > 1 && row.substring(0, 2) !== '</'){

            tagStack.push(tagName);
            arr[i] = ' ';
          }else{

            while(tagStack[tagStack.length - 1] !== tagName && tagStack.length){
              tagStack.pop();
            }

            if(tagStack.length){
              arr[i] = ' ';
            }
          }
        }
    }
    
    return arr.join("\n").replace(/\n/g, "");
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = trimHtml;
}