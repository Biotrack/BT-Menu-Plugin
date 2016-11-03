(function( $ ){
  var methods = {
    init : function( options ) {
/* ============================================ */
	var url = 'http://www.btmenu.com/plugins/menu/clientRequest.php';
	function sortStrains(foo) {
		$(foo.all).each(function (k,v) {
			if(v.strainType == 'Hybrid') {
				foo.hybrid.push(v);
			}else if(v.strainType == 'Sativa') {
				foo.sativa.push(v);
			}else if(v.strainType == 'Indica') {
				foo.indica.push(v);
			}else if(v.strainType == 'Cbd') {
				foo.cbd.push(v);
			}
		});
		return foo;
	}

  $.fn.array_search = function(what, where)
    {
        var Match = null;
        if(where === undefined) var where = 'value';
        $(this).each(function(key, value)
        {
            if(where == 'value')
            {
                if(what == value) Match = key;
            }else
            {
                if(what == key) Match = value;
            }
        });

        return (Match) ? Match : false;
    }

 function makeCollapseBtns(options) {
     // This should only fire in categorize && splitStrain

     /* 0. Vars */
     var lowestFlowerCount = 1000, lowestConcCount = 1000, lowestEdibleCount = 1000, lowestPrerollCount = 1000, lowestCount = 1000;

     if(options.hideType && options.hidePrice)
     $collapseRow = '<tr class="collapseable"><td class="text-center"><button class="btn btn-default btn-sm">More</button></td> </tr>';
     else if(options.hideType || options.hidePrice)
     $collapseRow = '<tr class="collapseable"><td></td><td class="text-center"><button class="btn btn-default btn-sm">More</button></td> </tr>';
     else
     $collapseRow = '<tr class="collapseable"><td></td><td></td><td class="text-center"><button class="btn btn-default btn-sm">More</button></td> </tr>';

     /* ================================================ */
     /* - Misc - */
     /* ================================================ */
     if(options.collapseAt) {
       lowestCount = options.collapseAt;
     }else {
       return;
       lowestCount = 20;
     }

    $('#target table').each(function(index) {
      $(this).find('tbody tr:gt('+lowestCount+')').slideToggle();
    });
    $('#target  table').find('tbody tr:eq('+lowestCount+')').after($collapseRow);
     /* Last. Add On Click Event */
   $('.collapseable').click(function() {
     $(this).toggleClass('expand').nextUntil('tr.collapseable').slideToggle(100);
   });


 }

	function makeDom(options) {
		if(options.priceDisplay !== 2) {
		$('#target').append('<div id="master-container"> <div class="row" id="master-row"> <div class="col-sm-12 category-container" id="flowers"> <table class="category-table table table-striped table-hover table-bordered"> <thead> <tr> <th rowspan="2" class="name nameHeader"> Name </th> <th class="type typeHeader"> Type </th> <th class="price priceHeader"> Price </th> </tr> </thead> <tbody> </tbody> </table> </div> </div> </div>');
		}else {
		$('#target').append('<div id="master-container">    <div class="row" id="master-row">       <div class="col-sm-12 category-container" id="flowers">          <table class="category-table table table-striped table-hover table-bordered">             <thead>                <tr>                   <th rowspan="2" class="name nameHeader"> Name </th>                   <th class="type typeHeader"> Type </th>                   <th class="price priceHeader"> Price </th>                   <th class="price priceHeader"> Price 2 </th>                </tr>             </thead>             <tbody> </tbody>          </table>       </div>    </div> </div>');
		}
		 if(options.categorize) {
			var categories = ['Flowers', 'Edibles', 'Concentrates', 'Prerolls', 'Customs1', 'Customs2', 'Accessories'];
			 for(var i = 1; i <= 5; i++) {
				$('.category-container:first-child').clone().appendTo('#master-row').attr('id', categories[i]).addClass(categories[i]+'-container');
				$('#'+categories[i]).prepend('<h2>'+categories[i]+"</h2>");
			 }

			 $('.category-container:first-child').attr('id', categories[0]).prepend('<h2>'+categories[0]+'</h2>');
			 if(options.splitStrains) {
				 var types = ['Indica', 'Cbd', 'Hybrid', 'Sativa'];
				 var z = 0;
				$(".category-container").each(function () {
					 $(this).find('h2').html('Indica');
					 for(var i = 1; i < 4; i++) {
					  if(options.splitStrains) {
             if(options.splitStrainsBy == 2) {
						 $(this).removeClass('col-sm-12').addClass('col-md-6').attr('id', categories[z]+'-Indica').clone().attr('id', categories[z]+'-'+types[i]).insertAfter(this).find('h2').html(types[i]);
           }else if (options.splitStrainsBy == 3) {
             $(this).removeClass('col-sm-12').addClass('col-md-4').attr('id', categories[z]+'-Indica').clone().attr('id', categories[z]+'-'+types[i]).insertAfter(this).find('h2').html(types[i]);
             }else if (options.splitStrainsBy == 4) {
            $(this).removeClass('col-sm-12').addClass('col-md-3').attr('id', categories[z]+'-Indica').clone().attr('id', categories[z]+'-'+types[i]).insertAfter(this).find('h2').html(types[i]);
            }else {
               $(this).removeClass('col-sm-12').addClass('col-md-4').attr('id', categories[z]+'-Indica').clone().attr('id', categories[z]+'-'+types[i]).insertAfter(this).find('h2').html(types[i]);
             }
					  }else {
					     $(this).attr('id', categories[z]+'-Indica').clone().attr('id', categories[z]+'-'+types[i]).insertAfter(this).find('h2').html(types[i]);
					  }
					 }
					 z++;
				 });
				var x = 0;
				var $div= $('.category-container'),
				length = $div.length;
				for (var i = 0; i < length; i = i + 4) {
					$div.slice(i, i + 4).wrapAll('<div class="row '+categories[x]+'-row" />');
					$('.'+categories[x]+'-row').prepend('<h1>'+categories[x]+'</h1><hr>');
					x++;
				}
			 }
		 }
	}
	function checkItem(foo, options, storeStrains, storeProductCategories) {
    if(foo.name.toLowerCase().includes("sample"))
      return false;

    if(options.appendCategory && foo.category) {
    foo.name = foo.name + "&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;("+foo.category+")";
    }
		if(options.overrideStrainTypes == true) {
			if(foo.strain in storeStrains) {
				foo.strainType = storeStrains[el.strain];
			}
		}
		if(options.skipSpaces) {
			var name = foo.name.split(" ");
			var finalName = "";
			for(var i = options.skipSpaces; i < name.length; i++) {
				finalName = finalName + " " + name[i];
			}
			foo.name = finalName;
		}

		if(typeof(foo.price1) == 'undefined' || !foo.price1) {
			foo.price1 = 0.00;
		} if(typeof(foo.price2) == 'undefined' || !foo.price2) {
			foo.price2 = 0.00;
		}
		if(typeof(foo.strainType) == 'undefined' || foo.strainType == null) {
			foo.strainType = '';
		}
		return foo;
	}
	function checkOptions() {
		if(options.splitStrains && options.coloredBoxes && options.priceDisplay !== 2) {
			$('.nameItem').css('text-align', 'center');
		}
		if(!options.splitStrains && options.priceDisplay == 3 && options.categorize) {
			$('.price').css('width', '40%');
			$('.nameItem').css('width', '40%');
		}
		if(options.splitStrains && (!options.hideType)) {
			options.hideType = true;
			$('.nameItem').css('font-size', 'inherit');
		}
		if(options.hideType) {
			$('.typeItem, .typeHeader').remove();
		}
		if(options.hidePrice) {
			$('.price1, .priceHeader').remove();
		}
		if(options.contextualHighlights && !options.coloredBoxes && options.splitStrains) {
			$('#Flowers-Hybrid tbody tr, #Edibles-Hybrid tbody tr, #Concentrates-Hybrid tbody tr, #Prerolls-Hybrid tbody tr, #Customs1-Hybrid tbody tr, #Customs2-Hybrid tbody tr').addClass('success');
			$('#Flowers-Sativa tbody tr, #Edibles-Sativa tbody tr, #Concentrates-Sativa tbody tr, #Prerolls-Sativa tbody tr, #Customs1-Sativa tbody tr, #Customs2-Sativa tbody tr').addClass('danger');
			$('#Flowers-Indica tbody tr, #Edibles-Indica tbody tr, #Concentrates-Indica tbody tr, #Prerolls-Indica tbody tr, #Customs1-Indica tbody tr, #Customs2-Indica tbody tr').addClass('info');
			$('#Flowers-Cbd tbody tr, #Edibles-Cbd tbody tr, #Concentrates-Cbd tbody tr, #Prerolls-Cbd tbody tr, #Customs1-Cbd tbody tr, #Customs2-Cbd tbody tr').addClass('warning');
		}
		if(options.contextualHighlights && !options.coloredBoxes && !options.splitStrains) {
			$('#Flowers-Hybrid tbody tr, #Edibles-Hybrid tbody tr, #Concentrates-Hybrid tbody tr, #Prerolls-Hybrid tbody tr, #Customs1-Hybrid tbody tr, #Customs2-Hybrid tbody tr').addClass('success');
			$('#Flowers-Sativa tbody tr, #Edibles-Sativa tbody tr, #Concentrates-Sativa tbody tr, #Prerolls-Sativa tbody tr, #Customs1-Sativa tbody tr, #Customs2-Sativa tbody tr').addClass('danger');
			$('#Flowers-Indica tbody tr, #Edibles-Indica tbody tr, #Concentrates-Indica tbody tr, #Prerolls-Indica tbody tr, #Customs1-Indica tbody tr, #Customs2-Indica tbody tr').addClass('info');
			$('#Flowers-Cbd tbody tr, #Edibles-Cbd tbody tr, #Concentrates-Cbd tbody tr, #Prerolls-Cbd tbody tr, #Customs1-Cbd tbody tr, #Customs2-Cbd tbody tr').addClass('warning');
		}
		if(options.priceDisplay == 2) {
			$('.price1, .price2, .nameItem').css('text-align', 'center');
		}
	}
	function cleanUp() {
		var categories = ['Flowers', 'Edibles', 'Concentrates', 'Prerolls', 'Customs1', 'Customs2', 'Accessories'];
		// $('#target table').wrap('<div class="table-responsive" />');
		$('tbody').each(function (k, v) {
			if ($(this).children().length == 0) {
				$(this).parent().parent().remove();
			}
		});
		for (var i = 0; i < 6; i++) {
		if($('.'+categories[i]+'-row .category-container').length == 0) {
			$('.'+categories[i]+'-row').remove();
		}
		}
		var seen = {};
		$('table tbody tr').each(function() {
			var txt = $(this).text();
			if (seen[txt])
				$(this).remove();
			else
				seen[txt] = true;
		});
	}
	function buildItemRow(table, items) {
		$(items).each(function (k, v) {
		  if(options.priceDisplay == 1) {
      v.price1 = parseFloat(v.price1).toFixed(2);
			$('td:first-child').css('width', '60%');
			$(table+' table tbody').append('<tr><td class="nameItem">'+v.name+'</td><td class="typeItem">'+v.strainType+'</td><td class="price1">$'+v.price1+'</td></tr>');
		  }else if(options.priceDisplay == 2) {
      v.price2 = parseFloat(v.price2).toFixed(2);
      v.price1 = parseFloat(v.price1).toFixed(2);
			$('td:first-child').css('width', '60%');
			$(table+' table tbody').append('<tr><td class="nameItem">'+v.name+'</td><td class="typeItem">'+v.strainType+'</td><td class="price1">$'+v.price1+'</td> - <td class="price2">$'+v.price2+'</td></tr>');
		  }else if(options.priceDisplay == 3) {
			$('td:first-child').css('width', '60%');
			$('td:nth-child(2)').css('width', '20%');
			if(options.splitStrains && options.coloredBoxes) {
				var priceRow = '<ul style="list-style-type:none;">';
				$(v.prices).each(function (k, v) {
          v.price = parseFloat(v.price).toFixed(2);
					if(k !== 0) {
					priceRow += '<li style="border-bottom: 1px dotted #333;"><div class="pull-left">(<b>'+v.quantity+v.unit+'</b>)</div>&nbsp;<div class="pull-right">$'+v.price+'</div></li>';
					}else {
					priceRow += '<li style="border-bottom: 1px dotted #333;"><div class="pull-left">(<b>'+v.quantity+v.unit+'</b>)</div>&nbsp;<div class="pull-right">$'+v.price+'</div></li>';
					}
				});
			}else {
			var priceRow = '';
			$(v.prices).each(function (k, v) {
				if(k !== 0) {
				priceRow += ' | <b>'+v.quantity+v.unit+'</b> - $'+v.price+' ';
				}else {
				priceRow += '<b>'+v.quantity+v.unit+'</b> - $'+v.price+' ';
				}
			});
			}
			priceRow += '</ul>';
			$(table+' table tbody').append('<tr><td class="nameItem">'+v.name+'</td><td class="typeItem">'+v.strainType+'</td><td class="prices">'+priceRow+'</td></tr>');

			}
		});
	}
	function masterSort(items, options) {
		if(options.orderBy == 'nameAsc') {
			items.sort(function(a, b) {
			  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }

			  // names must be equal
			  return 0;
			});
		}else if(options.orderBy == 'nameDesc') {
			items.sort(function(b, a) {
			  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
			  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }

			  // names must be equal
			  return 0;
			});
		}else if(options.orderBy == 'priceAsc') {
			items.sort(function(a, b) {
			  var nameA = a.price1; // ignore upper and lowercase
			  var nameB = b.price1; // ignore upper and lowercase
			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }
			  return 0;
			});
		}else if(options.orderBy == 'priceDesc') {
			items.sort(function(b, a) {
			  var nameA = a.price1; // ignore upper and lowercase
			  var nameB = b.price1; // ignore upper and lowercase
			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }
			  return 0;
			});
		}
		return items;
	}
	function displayItems(items, options) {
		makeDom(options);
		if(options.splitStrains) {
			buildItemRow('#Flowers-Indica', items.flowers.indica);
			buildItemRow('#Flowers-Sativa', items.flowers.sativa);
			buildItemRow('#Flowers-Hybrid', items.flowers.hybrid);
			buildItemRow('#Flowers-Cbd', items.flowers.cbd);
			buildItemRow('#Concentrates-Indica', items.concentrates.indica);
			buildItemRow('#Concentrates-Hybrid', items.concentrates.hybrid);
			buildItemRow('#Concentrates-Sativa', items.concentrates.sativa);
			buildItemRow('#Concentrates-Cbd', items.concentrates.cbd);
			buildItemRow('#Edibles-Indica', items.edibles.indica);
			buildItemRow('#Edibles-Hybrid', items.edibles.hybrid);
			buildItemRow('#Edibles-Sativa', items.edibles.sativa);
			buildItemRow('#Edibles-Cbd', items.edibles.cbd);
			buildItemRow('#Prerolls-Indica', items.prerolls.indica);
			buildItemRow('#Prerolls-Hybrid', items.prerolls.hybrid);
			buildItemRow('#Prerolls-Sativa', items.prerolls.sativa);
			buildItemRow('#Prerolls-Cbd', items.prerolls.cbd);
			buildItemRow('#Customs1-Indica', items.customs1.indica);
			buildItemRow('#Customs1-Hybrid', items.customs1.hybrid);
			buildItemRow('#Customs1-Sativa', items.customs1.sativa);
			buildItemRow('#Customs1-Cbd', items.customs1.cbd);
			buildItemRow('#Customs2-Indica', items.customs2.indica);
			buildItemRow('#Customs2-Hybrid', items.customs2.hybrid);
			buildItemRow('#Customs2-Sativa', items.customs2.sativa);
			buildItemRow('#Customs2-Cbd', items.customs2.cbd);
		}else {
			buildItemRow('#Flowers', items.flowers.all);
			buildItemRow('#Concentrates', items.concentrates.all);
			buildItemRow('#Edibles', items.edibles.all);
			buildItemRow('#Prerolls', items.prerolls.all);
			buildItemRow('#Customs1', items.customs1.all);
			buildItemRow('#Customs2', items.customs2.all);
		}
		cleanUp();
		checkOptions(options);
	}
	function applyCSS(options) {

		if(options.coloredBoxes) {
			/* Remove bootstrap? */
			$('table').removeClass('table-striped table-hover table-bordered');
			$('.Flowers-row div, .Concentrates-row div, .Edibles-row div, .Prerolls-row div, .Customs1-row div, .Customs2-row div').css('color', '#fff').css('text-shadow', '.5px  .5px .5px #000');
			$('#target h2').addClass('text-center');

			 if(options.priceDisplay == 3) {
				 $('.prices ul').css('padding-left', '0px');
			 }

			/* Add straintype specific coloring */
			if(options.splitStrains) {
			$('#Flowers-Indica, #Prerolls-Indica, #Edibles-Indica, #Concentrates-Indica, #Customs1-Indica, #Customs2-Indica').css({
				'border-radius': '10px',
				'background-color': 'rgba(109, 51, 94, 0.81)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
			});
			$('#Flowers-Sativa, #Prerolls-Sativa, #Edibles-Sativa, #Concentrates-Sativa, #Customs1-Sativa, #Customs2-Sativa').css({
				'border-radius': '10px',
				'background-color': 'rgba(211, 71, 39, 0.81)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
			});
			$('#Flowers-Hybrid, #Prerolls-Hybrid, #Edibles-Hybrid, #Concentrates-Hybrid, #Customs1-Hybrid, #Customs2-Hybrid').css({
				'border-radius': '10px',
				'background-color': 'rgba(80, 125, 22, 0.811765)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
			});
			$('#Flowers-Cbd, #Prerolls-Cbd, #Edibles-Cbd, #Concentrates-Cbd, #Customs1-Cbd, #Customs2-Cbd').css({
				'border-radius': '10px',
				'background-color': 'rgba(36, 114, 111, 0.8)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
			});
			}else {
			$('#Flowers').css({
				'border-radius': '10px',
				'background-color': 'rgba(109, 51, 94, 0.81)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			$('#Prerolls').css({
				'border-radius': '10px',
				'background-color': 'rgba(109, 51, 94, 0.81)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			$('#Edibles').css({
				'border-radius': '10px',
				'background-color': 'rgba(211, 71, 39, 0.81)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			$('#Concentrates').css({
				'border-radius': '10px',
				'background-color': 'rgba(80, 125, 22, 0.811765)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			$('#Customs1').css({
				'border-radius': '10px',
				'background-color': 'rgba(114, 36, 36, 0.8)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			$('#Customs2').css({
				'border-radius': '10px',
				'background-color': 'rgba(36, 114, 111, 0.8)',
				'-webkit-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'-moz-box-shadow': 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'box-shadow' : 'inset 1px 1px 5px 0px rgba(0,0,0,0.75)',
				'border' :  '5px solid white',
				'padding' : '1%',
				'color' : 'white',
				'text-shadow' : '1px 1px 2px #333',
			});
			}
		}

			if(options.priceDisplay <= 2) {
				$('.price1, .price2, .typeItem, .typeHeader').css('text-align', 'center');
				$('.nameItem').css('text-align', 'left');
			}
	}

  camelize = function camelize(str) {
        return str.replace(/\W+(.)/g, function(match, chr)
         {
              return chr.toUpperCase();
          });
      }
  function toTitleCase(str)
  {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
/* ============================================ */
		$('#target').prepend('<div class="bt-spinner"><div class="bt-rect1"></div><div class="bt-rect2"></div><div class="bt-rect3"></div><div class="bt-rect4"></div><div class="bt-rect5"></div></div>');
		$.ajax({
		   type: 'GET',
			url: url,
			data: {
				client_id: options.id,
			},
			async: false,
			contentType: "application/json",
			dataType: 'jsonp',
			crossDomain: true
		}).done(function(response) {
 			var storeStrains = response[0]['strains'];
			var storeInventory = response[0]['inventory'];
			var storeInventoryTypes = response[0]['inventoryTypes'];
			var storeProductCategories = response[0]['productCategories'];
  		var menuIndexes = {flowers: [], edibles: [], concentrates: [], prerolls: [], customs1: [], customs2: []};
      if(options.customs1Accessories) {
        menuIndexes.customs1.push('nonMj');
        storeInventoryTypes.push({index: 'nonMj', name:'nonMj'});
      }else if(options.customs2Accessories) {
        menuIndexes.customs2.push('nonMj');
      }
			var menuItems = {
										flowers: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										edibles: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										concentrates: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										prerolls: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										customs1: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										customs2: {'indica': [], 'sativa': [], 'hybrid': [], 'cbd': [], 'all': []},
										};
			storeInventory = masterSort(storeInventory, options);
			if(options.sortBy == 'type') {
				$(storeInventoryTypes).each(function (k, v) {
          v.name = toTitleCase(v.name);
					if($.inArray(v.name, options.sortingIndex.flowers) !== -1) {
						menuIndexes.flowers.push(parseInt(v.index));
					}else if($.inArray(v.name, options.sortingIndex.concentrates) !== -1) {
						menuIndexes.concentrates.push(parseInt(v.index));
					}else if($.inArray(v.name, options.sortingIndex.edibles) !== -1) {
						menuIndexes.edibles.push(parseInt(v.index));
					}else if($.inArray(v.name, options.sortingIndex.prerolls) !== -1) {
						menuIndexes.prerolls.push(parseInt(v.index));
					}else if($.inArray(v.name, options.sortingIndex.customs1) !== -1) {
						menuIndexes.customs1.push(parseInt(v.index));
					}else if($.inArray(v.name, options.sortingIndex.customs2) !== -1) {
						menuIndexes.customs2.push(parseInt(v.index));
					}
				});
			}else {
				$(storeProductCategories).each(function (k, v) {
					if($.inArray(v.name, options.sortingIndex.flowers) !== -1) {
						menuIndexes.flowers.push(parseInt(v.id));
					}else if($.inArray(v.name, options.sortingIndex.concentrates) !== -1) {
						menuIndexes.concentrates.push(parseInt(v.id));
					}else if($.inArray(v.name, options.sortingIndex.edibles) !== -1) {
						menuIndexes.edibles.push(parseInt(v.id));
					}else if($.inArray(v.name, options.sortingIndex.prerolls) !== -1) {
						menuIndexes.prerolls.push(parseInt(v.id));
					}else if($.inArray(v.name, options.sortingIndex.customs1) !== -1) {
						menuIndexes.customs1.push(parseInt(v.id));
					}else if($.inArray(v.name, options.sortingIndex.customs2) !== -1) {
						menuIndexes.customs2.push(parseInt(v.id));
					}
				});
      }
				$(storeInventory).each(function (k,v) {
					v = checkItem(v, options, storeStrains, storeProductCategories);
          if(!v)
            return;
					if(options.sortBy == 'type') {
						v.inventorytype = parseInt(v.inventorytype);
            if(options.overridePrerolls) {
              if(v.name.toLowerCase().includes('preroll') || v.name.toLowerCase().includes('pre-roll')) {
  							menuItems.prerolls.all.push(v);
                return;
              }
            }
						if($.inArray(v.inventorytype, menuIndexes.flowers) !== -1) {
							menuItems.flowers.all.push(v);
						}else if($.inArray(v.inventorytype, menuIndexes.concentrates) !== -1) {
							menuItems.concentrates.all.push(v);
						}else if($.inArray(v.inventorytype, menuIndexes.edibles) !== -1) {
							menuItems.edibles.all.push(v);
						}else if($.inArray(v.inventorytype, menuIndexes.prerolls) !== -1) {
							menuItems.prerolls.all.push(v);
						}else if($.inArray(v.inventorytype, menuIndexes.customs1) !== -1) {
							menuItems.customs1.all.push(v);
						} else if($.inArray(v.inventorytype, menuIndexes.customs2) !== -1) {
							menuItems.customs2.all.push(v);
						}
					}else {
            if(options.overridePrerolls) {
              if(v.name.toLowerCase().includes('preroll') || v.name.toLowerCase().includes('pre-roll')) {
                menuItems.prerolls.all.push(v);
                return;
              }
            }
						v.productcategory = parseInt(v.productcategory);
						if($.inArray(v.productcategory, menuIndexes.flowers) !== -1) {
							menuItems.flowers.all.push(v);
						}else if($.inArray(v.productcategory, menuIndexes.concentrates) !== -1) {
							menuItems.concentrates.all.push(v);
						}else if($.inArray(v.productcategory, menuIndexes.edibles) !== -1) {
							menuItems.edibles.all.push(v);
						}else if($.inArray(v.productcategory, menuIndexes.prerolls) !== -1) {
							menuItems.prerolls.all.push(v);
						}else if($.inArray(v.productcategory, menuIndexes.customs1) !== -1) {
							menuItems.customs1.all.push(v);
						} else if($.inArray(v.productcategory, menuIndexes.customs2) !== -1) {
							menuItems.customs2.all.push(v);
						}
					}
				});
				if(options.splitStrains) {
					menuItems.flowers = sortStrains(menuItems.flowers);
					menuItems.concentrates = sortStrains(menuItems.concentrates);
					menuItems.edibles = sortStrains(menuItems.edibles);
					menuItems.prerolls = sortStrains(menuItems.prerolls);
					menuItems.customs1 = sortStrains(menuItems.customs1);
					menuItems.customs2 = sortStrains(menuItems.customs2);
				}
				displayItems(menuItems, options);
				applyCSS(options);
        makeCollapseBtns(options);

			$.event.trigger({type: "menu", message: "loaded"});
			$('.bt-spinner').remove();
		}).fail(function(error){
			alert("An error occured while downloading the BioTrackTHC menu feed. Please try again soon.");
		});
	},
    clear : function(  ) {
		clearInterval(cycle);
	}
  };
  /* =-=-=-=-=-=-=-=-=-=-=- */
  /*   Plugin Options / Methods    */
  /* =-=-=-=-=-=-=-=-=-=-=- */
  $.fn.menuboard = function( method ) {
	var startingSelector = $(this).selector;
	var cycle;
    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist.'	  );
    }
  };
})( jQuery );
