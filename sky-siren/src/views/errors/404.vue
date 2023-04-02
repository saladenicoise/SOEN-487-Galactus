<template>

 <main >

	<h1 id="errortitle" >Page 404</h1>


		<div id="cubecontainer" class="centered">
			<div class="cube">
				  <div style="--x:-1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:0; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  	</div><div class="cube">
		  		<div style="--x:-1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:0; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  	</div><div class="cube">
		  		<div style="--x:-1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:0; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  	</div><div class="cube">
		  		<div style="--x:-1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:0; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  		<div style="--x:1; --y:0;">
		  			<span style="--i:3;"></span>
		  			<span style="--i:2;"></span>
		  			<span style="--i:1;"></span>
		  		</div>
		  	</div><div class="cube">
		    		<div style="--x:-1; --y:0;">
		    			<span style="--i:3;"></span>
		    			<span style="--i:2;"></span>
		    			<span style="--i:1;"></span>
		    		</div>
		    		<div style="--x:0; --y:0;">
						<span style="--i:3;"></span>
						<span style="--i:2;"></span>
		    			<span style="--i:1;"></span>
		    		</div>
		    		<div style="--x:1; --y:0;">
						<span style="--i:3;"></span>
						<span style="--i:2;"></span>
						<span style="--i:1;"></span>
					</div>
			</div>
		</div>
	    </main>
</template>


<style scoped>
/*404Page.vue*/
main {
	height: 100%;
	width: 100%;

}

.centered {
	position: fixed;
	top: 50%;
	left: 50%;
	/* bring your own prefixes */
	transform: translate(-50%, -50%);
}

#errortitle {
	text-align: center;
	position: absolute;
	color: white;
	position: static


}

#cubecontainer {
position:static;
	display: block;
	position: relative;
	top: -80px;
	transform: skewY(-20deg);
	animation: animate 5s linear infinite;
}

#cubecontainer .cube {
	position: relative;
	z-index: 2;
}

#cubecontainer .cube:nth-child(2) {
	z-index: 1;
	translate: -60px -60px;
}

#cubecontainer .cube:nth-child(3) {
	z-index: 3;
	translate: 60px 60px;
}

#cubecontainer .cube div {
	position: absolute;
	display: flex;
	flex-direction: column;
	gap: 30px;
	translate: calc(-70px * var(--x)) calc(-60px * var(--y));
}

#cubecontainer .cube div span {
	position: relative;
	display: inline-block;
	width: 50px;
	height: 50px;
	background: #dcdcdc;
	z-index: calc(1 * var(--i));
	transition: 1.5s;
}

#cubecontainer .cube div span:hover {
	transition: 0s;
	background: #ef4149;
	filter: drop-shadow(0 0 30px #ef4149);
}

#cubecontainer .cube div span:hover:before,
#cubecontainer .cube div span:hover:after {
	transition: 0s;
	background: #ef4149;
}

#cubecontainer .cube div span:before {
	content: "";
	position: absolute;
	left: -40px;
	width: 40px;
	height: 100%;
	background: #fff;
	transform-origin: right;
	transform: skewY(45deg);
	transition: 1.5s;
}

#cubecontainer .cube div span:after {
	content: "";
	position: absolute;
	top: -40px;
	left: 0px;
	width: 100%;
	height: 40px;
	background: #f2f2f2;
	transform-origin: bottom;
	transform: skewX(45deg);
	transition: 1.5s;
}
</style>
