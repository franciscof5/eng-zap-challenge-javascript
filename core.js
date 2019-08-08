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
					(item.pricingInfos.businessType == "RENTAL" && item.pricingInfos.rentalTotalPrice<=3500) ||
					(item.pricingInfos.businessType == "SALE" && item.pricingInfos.price<=600000) &&
					(item.address.geoLocation.location.lon>0 && item.address.geoLocation.location.lat>0) &&
					(item.usableAreas>0 && (item.pricingInfos.price/item.usableAreas)<=35)
				)
				return item;
			});

			this.dataViva = response.data.filter(function(item) {
				if(
					(item.pricingInfos.businessType == "RENTAL" && item.pricingInfos.rentalTotalPrice<=4000) ||
					(item.pricingInfos.businessType == "SALE" && item.pricingInfos.price<=700000) &&
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
})