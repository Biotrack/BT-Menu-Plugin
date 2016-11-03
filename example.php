<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sample Online Menu</title>

    <!-- Bootstrap Core CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css" rel="stylesheet">
    <link href="http://btmenu.com/plugins/menu/v2/menu.css" rel="stylesheet">

    <!-- Custom CSS -->
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/u/bs-3.3.6/dt-1.10.12,r-2.1.0/datatables.min.css"/>
	<link href='https://fonts.googleapis.com/css?family=Playfair+Display:400,700' rel='stylesheet' type='text/css'>
	<link href='https://fonts.googleapis.com/css?family=Raleway:400,600' rel='stylesheet' type='text/css'>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
	<style>
body {
    margin-top: 50px; /* Required margin for .navbar-fixed-top. Remove if using .navbar-static-top. Change if height of navigation changes. */
}

.image-bg-fluid-height,
.image-bg-fixed-height {
    text-align: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    -o-background-size: cover;
}

.image-bg-fluid-height {
	background: url('/home/img/sampleBg.jpg') no-repeat center center scroll;
	padding: 200px 0;
}

.image-bg-fixed-height {
	background: url('/home/img/map.jpg') no-repeat center center scroll;
    height: 450px;
}

.img-center {
	margin: 0 auto;
}

section {
    padding: 75px 0;
}

.section-heading {
    margin: 30px 0;
    font-size: 4em;
}

.section-lead {
    margin: 30px 0;
}

.section-paragraph {
    margin: 30px 0;
}

footer {
    margin: 50px 0;
}

@media(max-width:768px) {
    section {
        padding-top: 25px;
        padding-bottom: 25px;
    }

    .section-heading {
        font-size: 2em;
    }
}

</style>
</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Sample Dispensary</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li>
                        <a href="#">About</a>
                    </li>
                    <li>
                        <a href="#">Services</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Full Width Image Header with Logo -->
    <header class="image-bg-fluid-height hidden-xs hidden-sm visible-md visible-lg" >
    </header>

    <!-- Content Section -->
    <section>
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="section-heading">Current Inventory</h1>
					<div id="target"></div>
                </div>
            </div>
        </div>
    </section>

    <!-- Fixed Height Image Aside -->
    <!-- Image backgrounds are set within the full-width-pics.css file. -->
    <aside class="image-bg-fixed-height  hidden-xs hidden-sm visible-md visible-lg"></aside>


    <!-- jQuery -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
	<script type="text/javascript" src="https://cdn.datatables.net/u/bs-3.3.6/dt-1.10.12,r-2.1.0/datatables.min.js"></script>
	<script src="http://btmenu.com/plugins/menu/v2/menu.js"></script>


	<style>
.price {
	font-weight: 600;
}
  .collapseable button {
	  float: right;
  }
 .name, .type, .price {
	font-family: Georgia,Times,Times New Roman,serif;
 }
 #flowerTitle, #concTitle, #edibleTitle, #prerollTitle, #miscTitle {
	 font-family: 'Raleway', sans-serif;
 }
 #flowerBox div h4, #concBox div  h4, #edibleBox div  h4, #prerollBox  div h4, #miscBox div  h4 {
	 font-family: 'Raleway', sans-serif;
	 font-weight: 600;
 }
 </style>

 <link href="http://btmenu.com/plugins/menu/v2/menu.css" rel="stylesheet">
 <script src="http://btmenu.com/plugins/menu/v2/menu.js"></script>


 <script>
 $(document).ready(function () {

    var sortingIndex = {
      flowers: ["Usable Marijuana"],
      concentrates: ["Marijuana Extract For Inhalation"],
      prerolls : ["Marijuana Mix Infused"],
      edibles : ["Solid Marijuana Infused Edible", "Liquid Marijuana Infused Edible"],
      accessories: ["nonMj"],
      customs1: [],
      customs2: []
    }

    $("#target").menuboard({
      'id' : 'CLIENT-ID-HERE',
      'orderBy' : 'nameAsc', // Ordering of items
      'hidePrice' : false, // Hides Prices
      'hideType' : false, // Hides Strain Type Column
      'coloredBoxes' : false, // CSS styling
      'skipSpaces' : 0,  // If the user has "1g blue dream", this would skip 1g if the value equals 1.
      'contextualHighlights' : true, // Overrides BTMenu's strain simplification
      'splitStrains' : true, // Categorizes By Type
      'priceDisplay' : 3, // Categorizes By Type
      'categorize' : true, // Splits up the categories
      'sortBy' : 'type', // 'category',
      'collapseAt' : 10,
      'sortingIndex' : sortingIndex,
    });
 });



 </script>


</body>

</html>
