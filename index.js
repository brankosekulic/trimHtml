/**
 * [trimHtml description]
 * @param  {[type]} html  [description]
 * @param  {[type]} limit [description]
 * @return {[type]}       [description]
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
        row, cut, add;
                                                         
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
        }
    }
    
    return arr.join("\n").replace(/\n/g, "");
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = trimHtml;
}