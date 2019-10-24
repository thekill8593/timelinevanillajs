<!DOCTYPE html>
<html>
<head>
	<title>Timeline</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="css/tailwind.min.css">
    <link rel="stylesheet" type="text/css" href="css/fontawesome.min.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<div class="bg-gray-500 w-full h-screen flex justify-center items-center flex-col">
		<div class="m-auto  relative overflow-hidden" id="timeline-container">
            <div id="btn-left" class="w-8 h-8 rounded-full absolute cursor-pointer shadow-lg hidden" style="top: calc(50% - 20px); z-index: 50;">
                <i class="fas fa-arrow-circle-left text-gray-400 fa-2x hover:text-gray-600"></i>
            </div>
            <div id="btn-right" class="w-8 h-8 rounded-full absolute cursor-pointer shadow-lg hidden" style="top: calc(50% - 20px); right: 0; z-index: 50;">
                <i class="fas fa-arrow-circle-right text-gray-400 fa-2x hover:text-gray-600"></i>
            </div>
			<div class="timeline flex" id="timeline">
                <?php for($i = 0; $i < 5; $i++): ?>
				    <div class="flex flex-col items-center time-line-item">
                        <div class="relative z-50 mt-2 w-20 h-20 rounded-full bg-red-500 flex items-center justify-center">
                            <i class="fas fa-handshake fa-3x text-white"></i>
                        </div>
                        <div class="colored-box relative flex items-center justify-center mt-20 bg-red-100 w-full h-12">
                            <div class="circle w-3 h-3 bg-transparent rounded-full border-2 border-black"></div>
                        </div>
                        <div class="mb-2 flex flex-col ">
                            <span class="text-center text-4xl font-bold text-white">201<?php echo $i ?></span>
                            <span class="text-center text-white text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, molestiae.</span>
                        </div>
				    </div>
                    <div class="inverted flex flex-col items-center justify-end time-line-item" >
                        <div class="mb-2 flex flex-col" style="margin-top: 53px;">
                            <span class="text-center text-4xl font-bold text-white">201<?php echo $i ?></span>
                            <span class="text-center text-white text-xs">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, molestiae.</span>
                        </div>
                        <div class="colored-box-inverted relative flex items-center justify-center mb-6 bg-orange-500 w-full h-12">
                            <div class="circle w-3 h-3 bg-transparent rounded-full border-2 border-black"></div>
                        </div>
                        <div class="relative z-50 mt-16 w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center">
                            <i class="fas fa-cart-plus fa-3x text-white"></i>
                        </div>
                    </div>
                <?php endfor; ?>
			</div>
		</div>
	</div>


	<script type="text/javascript" src="timeline/timeline.min.js"></script>
    <script>
        window.onload = function () {
            (new Timeline({
                itemsPerPage: 6
            }));
        };
    </script>
</body>
</html>
