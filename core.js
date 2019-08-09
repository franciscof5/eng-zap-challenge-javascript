var app = new Vue({
	el: '#app',
	data () {
		return {
			tipo: null,
			loading: true,
			errored: false,
			data: 'Loagin data from zap servers...',
			dataZap: null,
			dataViva: null,
		}
	},
	mounted () {
		axios
		.get('http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json')
		.then(response => {
			this.loading = false;
			
			this.data = response.data;
			
			this.dataZap = response.data.filter(function(item) {
				if(
					(item.pricingInfos.businessType == "RENTAL" && item.pricingInfos.rentalTotalPrice>=3500) ||
					(item.pricingInfos.businessType == "SALE" && item.pricingInfos.price>=600000) &&
					(item.address.geoLocation.location.lon>0 && item.address.geoLocation.location.lat>0) &&
					(item.usableAreas>0 && (item.pricingInfos.price/item.usableAreas)<=35)
				)
				return item;
			});

			this.dataViva = response.data.filter(function(item) {
				if(
					(item.pricingInfos.businessType == "RENTAL" && item.pricingInfos.rentalTotalPrice<=4000) ||
					(item.pricingInfos.businessType == "SALE" && item.pricingInfos.price<700000) &&
					(item.address.geoLocation.location.lon>0 && item.address.geoLocation.location.lat>0)
				)
				return item;
			});

		}).catch(error => {
			console.log(error)
			this.errored = true
		})/*.finally(() => {
			this.loading = false
		})*/
	},
	methods: {
		changeTipo: function(tipo_) {
			this.tipo=tipo_;
		}
	}
});

Vue.component('item-list', {

	/*data: itemData,
	/*data: function() {
		return {
			count: 0,
		}
	},/*-*/
	props: ['item'],
	template: `<div>
					<singe-item> {{ item.usableAreas }} </singe-item>
					<br>
			   </div>`,
});

Vue.component('featured-slide-list', {
	//props: ['item'],
	template: `<section class="hero-area">
		        <div class="hero-slides owl-carousel">
		            <!-- Single Hero Slide -->
		            <div class="single-hero-slide bg-img" style="background-image: url(img/bg-img/hero1.jpg);">
		                <div class="container h-100">
		                    <div class="row h-100 align-items-center">
		                        <div class="col-12">
		                            <div class="hero-slides-content">
		                                <h2 data-animation="fadeInUp" data-delay="100ms">Te ajuamos a encontre seu lar</h2>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <!-- Single Hero Slide -->
		            <div class="single-hero-slide bg-img" style="background-image: url(img/bg-img/hero2.jpg);">
		                <div class="container h-100">
		                    <div class="row h-100 align-items-center">
		                        <div class="col-12">
		                            <div class="hero-slides-content">
		                                <h2 data-animation="fadeInUp" data-delay="100ms">A casa dos seus sonhos</h2>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		            <!-- Single Hero Slide -->
		            <div class="single-hero-slide bg-img" style="background-image: url(img/bg-img/hero3.jpg);">
		                <div class="container h-100">
		                    <div class="row h-100 align-items-center">
		                        <div class="col-12">
		                            <div class="hero-slides-content">
		                                <h2 data-animation="fadeInUp" data-delay="100ms">O imóvel perfeito para você</h2>
		                            </div>
		                        </div>
		                    </div>
		                </div>
		            </div>
		        </div>
		    </section>`
});

Vue.component('header-top', {
	template: `<header class="header-area">

        <!-- Top Header Area -->
        <div class="top-header-area">
            <div class="h-100 d-md-flex justify-content-between align-items-center">
                <div class="email-address">
                    <a href="mailto:contato@zapimoveis.com.br">contato@zapimoveis.com.br</a>
                </div>
                <div class="phone-number d-flex">
                    <div class="icon">
                        <img src="img/icons/phone-call.png" alt="">
                    </div>
                    <div class="number">
                        <a href="tel:11 3333 2222">11 3333 2222</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Header Area -->
        <div class="main-header-area" id="stickyHeader">
            <div class="classy-nav-container breakpoint-off">
                <!-- Classy Menu -->
                <nav class="classy-navbar justify-content-between" id="southNav">

                    <!-- Logo -->
                    <a class="nav-brand" href="index.html"><img src="logo_zap.svg" alt=""></a>

                </nav>
            </div>
        </div>
    </header>`
})