function ingredientTemplate(locals) { var pug_html = "",
        pug_mixins = {},
        pug_interp;
    pug_html = pug_html + "\u003Cdiv class=\"recipe-create-single-ing\"\u003E\u003Cinput name=\"recipe-ingredient\" placeholder=\"Ingredient\" type=\"text\"\u002F\u003E\u003Cinput name=\"recipe-ingredient-quantity\" placeholder=\"Quantity\" type=\"text\"\u002F\u003E\u003Cdiv id=\"btnAddIngredient\"\u003E\u003Cspan\u003E\u003Cimg src=\".\u002Fimages\u002Fadd.png\"\u002F\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";; return pug_html; }