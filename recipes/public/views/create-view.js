function createTemplate(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv id=\"create-view\"\u003E\u003Cdiv id=\"create-title\"\u003ECREATE\u003C\u002Fdiv\u003E\u003Cdiv id=\"create-subtitle\"\u003ECreate your recipe\u003C\u002Fdiv\u003E\u003Cbr\u002F\u003E\u003Cform\u003E\u003Clabel class=\"input-label\"\u003EYour name\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cinput class=\"large-input\" id=\"user-name\" name=\"user-name\" type=\"text\"\u002F\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"input-label\"\u003ETitle of the recipe\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cinput class=\"large-input\" id=\"create-name\" name=\"recipe-name\" type=\"text\"\u002F\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"input-label\"\u003ECategory\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cselect class=\"select-style\" id=\"selectCategory\"\u003E\u003Coption value=\"greek\"\u003EGreek\u003C\u002Foption\u003E\u003Coption value=\"british\"\u003EBritish\u003C\u002Foption\u003E\u003Coption value=\"indian\"\u003EIndian\u003C\u002Foption\u003E\u003Coption value=\"japanese\"\u003EJapanese\u003C\u002Foption\u003E\u003Coption value=\"chinese\"\u003EChinese\u003C\u002Foption\u003E\u003Coption value=\"thai\"\u003EThai\u003C\u002Foption\u003E\u003Coption value=\"italian\"\u003EItalian\u003C\u002Foption\u003E\u003Coption value=\"mexican\"\u003EMexican\u003C\u002Foption\u003E\u003Coption value=\"french\"\u003EFrench\u003C\u002Foption\u003E\u003Coption value=\"spanish\"\u003ESpanish\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"input-label\"\u003ERequired Time\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cselect class=\"select-style\" id=\"selectTime\"\u003E\u003Coption value=\"5\"\u003E5 min\u003C\u002Foption\u003E\u003Coption value=\"10\"\u003E10 min\u003C\u002Foption\u003E\u003Coption value=\"15\"\u003E15 min\u003C\u002Foption\u003E\u003Coption value=\"20\"\u003E20 min\u003C\u002Foption\u003E\u003Coption value=\"25\"\u003E25 min\u003C\u002Foption\u003E\u003Coption value=\"30\"\u003E30 min\u003C\u002Foption\u003E\u003Coption value=\"35\"\u003E35 min\u003C\u002Foption\u003E\u003Coption value=\"40\"\u003E40 min\u003C\u002Foption\u003E\u003Coption value=\"45\"\u003E45 min\u003C\u002Foption\u003E\u003Coption value=\"100\"\u003E1 h\u003C\u002Foption\u003E\u003Coption value=\"130\"\u003E1 h 30 min\u003C\u002Foption\u003E\u003Coption value=\"200\"\u003E2 h\u003C\u002Foption\u003E\u003Coption value=\"+\"\u003E+ 2h\u003C\u002Foption\u003E\u003C\u002Fselect\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"input-label\"\u003EIngredients\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Cdiv id=\"recipe-create-ingredients\"\u003E\u003Cdiv class=\"recipe-create-single-ing\"\u003E\u003Cinput class=\"create-ingredient-name\" name=\"recipe-ingredient\" placeholder=\"Ingredient\" type=\"text\"\u002F\u003E\u003Cinput class=\"create-ingredient-quantity\" name=\"recipe-ingredient-quantity\" placeholder=\"Quantity (i.e. 2 kg)\" type=\"text\"\u002F\u003E\u003Cdiv id=\"btnAddIngredient\"\u003E\u003Cspan\u003E\u003Cimg src=\".\u002Fimages\u002Fadd.png\"\u002F\u003E\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"checkboxCreate\"\u003E\u003Cdiv class=\"outerCheckbox\"\u003E\u003Cinput id=\"c11\" type=\"checkbox\" name=\"gluten\"\u002F\u003E\u003Clabel for=\"c11\"\u003E\u003Cspan\u003E\u003C\u002Fspan\u003EGluten free\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"outerCheckbox\"\u003E\u003Cinput id=\"c22\" type=\"checkbox\" name=\"dairy\"\u002F\u003E\u003Clabel for=\"c22\"\u003E\u003Cspan\u003E\u003C\u002Fspan\u003EDairy\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"outerCheckbox\"\u003E\u003Cinput id=\"c33\" type=\"checkbox\" name=\"vegan\"\u002F\u003E\u003Clabel for=\"c33\"\u003E\u003Cspan\u003E\u003C\u002Fspan\u003EVegan\u003C\u002Flabel\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cinput class=\"load-file\" name=\"picture\" type=\"file\" size=\"50\" accept=\"image\u002F*\"\u002F\u003E\u003Clabel class=\"input-label\"\u003EPreparation\u003C\u002Flabel\u003E\u003Cbr\u002F\u003E\u003Cbr\u002F\u003E\u003Ctextarea id=\"create-description\" name=\"description\" rows=\"4\" cols=\"20\"\u003E\u003C\u002Ftextarea\u003E\u003Cdiv id=\"submit-bar\"\u003E\u003Clabel class=\"custom-label-left\" for=\"file-upload\"\u003ELoad Image\u003C\u002Flabel\u003E\u003Cinput id=\"file-upload\" type=\"file\" name=\"file\" accept=\"image\u002F*\"\u002F\u003E\u003Cbr\u002F\u003E\u003Clabel class=\"custom-label-right\" for=\"submit-recipe\"\u003ESubmit\u003C\u002Flabel\u003E\u003Cbutton id=\"submit-recipe\" type=\"submit\"\u003E\u003Cbr\u002F\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fform\u003E\u003C\u002Fdiv\u003E";;return pug_html;}
