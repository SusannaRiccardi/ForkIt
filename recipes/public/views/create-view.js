function createTemplate(locals) { var pug_html = "",
        pug_mixins = {},
        pug_interp;
    pug_html = pug_html + "\u003Cdiv id=\"create-view\"\u003E\u003Cdiv id=\"create-title\"\u003ECREATE\u003C\u002Fdiv\u003E\u003Cdiv id=\"create-subtitle\"\u003ECreate your recipe\u003C\u002Fdiv\u003E\u003Cbr\u002F\u003E\u003Cform\u003E\u003Clabel class=\"input-label\"\u003ETitle\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cinput class=\"large-input\" id=\"create-name\" name=\"recipe-name\" type=\"text\"\u002F\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"input-label\"\u003EIngredients\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cdiv id=\"recipe-create-ingredients\"\u003E\u003Cdiv class=\"recipe-create-single-ing\"\u003E\u003Cinput class=\"create-ingredient-name\" name=\"recipe-ingredient\" placeholder=\"Ingredient\" type=\"text\"\u002F\u003E\u003Cinput class=\"create-ingredient-quantity\" name=\"recipe-ingredient-quantity\" placeholder=\"Quantity\" type=\"text\"\u002F\u003E\u003Cdiv id=\"btnAddIngredient\"\u003E\u003Cspan\u003E\u003Cimg src=\".\u002Fimages\u002Fadd.png\"\u002F\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cbr\u002F\u003E\u003Cinput class=\"load-file\" name=\"picture\" type=\"file\" size=\"50\" accept=\"image\u002F*\"\u002F\u003E\u003Clabel class=\"input-label\"\u003EPreparation\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Ctextarea id=\"create-description\" rows=\"4\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003Cdiv id=\"submit-bar\"\u003E\u003Clabel class=\"custom-label-left\" for=\"file-upload\"\u003ELoad Image\u003C\u002Flabel\u003E\u003Cinput id=\"file-upload\" type=\"file\" accept=\"image\u002F*\"\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"custom-label-right\" for=\"submit-recipe\"\u003ESubmit\u003C\u002Flabel\u003E\u003Cbutton id=\"submit-recipe\" type=\"submit\"\u003E\u003Cbr\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";; return pug_html; }