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
			
			this.dataViva = response.data.filter(function(item) {
				if(item.usableAreas>100 && item.pricingInfos.businessType == "RENTAL")
				return item;
			});

			this.dataZap = response.data.filter(function(item) {
				return item.usableAreas<100;
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