function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function discoverTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (results) {pug_html = pug_html + "\u003Cdiv class=\"content\" id=\"discover-view\"\u003E\u003Cdiv class=\"grid-block\"\u003E";
// iterate results
;(function(){
  var $$obj = results;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var recipe = $$obj[pug_index0];
if(recipe.id){
  pug_html = pug_html + "\u003Cdiv class=\"grid-cell\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", 'https://spoonacular.com/recipeImages/' + recipe.image, true, false)+pug_attr("id", (recipe.id), true, false)+" alt=\"Food\"") + "\u002F\u003E\u003Cdiv class=\"category-title\"\u003E\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
else {
  pug_html = pug_html + "\u003Cdiv class=\"grid-cell\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", './uploads/' + recipe._id + '.' + recipe.image, true, false)+pug_attr("id", (recipe._id), true, false)+" alt=\"Food\"") + "\u002F\u003E\u003Cdiv class=\"category-title\"\u003E\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var recipe = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"grid-cell\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", 'https://spoonacular.com/recipeImages/' + recipe.image, true, false)+pug_attr("id", (recipe.id || recipe._id), true, false)+" alt=\"Food\"") + "\u002F\u003E\u003Cdiv class=\"category-title\"\u003E\u003Cdiv\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003Cdiv id=\"arrow-down\"\u003E\u003Cimg src=\"images\u002Farrow_down.png\"\u002F\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"results" in locals_for_with?locals_for_with.results:typeof results!=="undefined"?results:undefined));;return pug_html;}
