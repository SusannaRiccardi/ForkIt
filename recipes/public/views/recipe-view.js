function pug_attr(t,e,n,f){return e!==!1&&null!=e&&(e||"class"!==t&&"style"!==t)?e===!0?" "+(f?t:t+'="'+t+'"'):("function"==typeof e.toJSON&&(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||e.indexOf('"')===-1)?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"):""}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function recipeTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (recipe) {pug_html = pug_html + "\u003Cdiv id=\"recipe-view\"\u003E\u003Cdiv id=\"recipe-title\"\u003E" + (pug_escape(null == (pug_interp = recipe.title) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv id=\"recipe-subtitle\"\u003E" + (pug_escape(null == (pug_interp = recipe.author) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003Cdiv id=\"recipes-swipe\"\u003E\u003Cimg class=\"arrow\" id=\"arrow-back\" src=\"images\u002Fleft_arrow.png\" alt=\"Food\"\u002F\u003E\u003Cdiv class=\"recipe-preview\" id=\"image-back\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", recipe.image.back, true, false)+" alt=\"Food\"") + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"recipe-preview\" id=\"image-actual\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", recipe.image.actual, true, false)+" alt=\"Food\"") + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"recipe-preview\" id=\"image-next\"\u003E\u003Cimg" + (" class=\"recipe-picture\""+pug_attr("src", recipe.image.next, true, false)+" alt=\"Food\"") + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cimg class=\"arrow\" id=\"arrow-next\" src=\"images\u002Fright_arrow.png\" alt=\"Food\"\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"recipe-text\"\u003E\u003Cdiv id=\"recipe-ingredients\"\u003E\u003Cb\u003EIngredients\u003C\u002Fb\u003E\u003Cbr\u002F\u003E\u003Cspan id=\"ingredients\"\u003E\u003Cul\u003E";
// iterate recipe.ingredients
;(function(){
  var $$obj = recipe.ingredients;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var ingredient = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E" + (pug_escape(null == (pug_interp = ingredient.quantity + ' ' + ingredient.name) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var ingredient = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E" + (pug_escape(null == (pug_interp = ingredient.quantity + ' ' + ingredient.name) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"recipe-division\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"recipe-preparation\"\u003E\u003Cb\u003EPreparation\u003C\u002Fb\u003E\u003Cbr\u002F\u003E\u003Cspan id=\"preparation\"\u003E\u003C\u002Fspan\u003E\u003Cp\u003E" + (pug_escape(null == (pug_interp = recipe.instructions) ? "" : pug_interp)) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"recipe" in locals_for_with?locals_for_with.recipe:typeof recipe!=="undefined"?recipe:undefined));;return pug_html;}