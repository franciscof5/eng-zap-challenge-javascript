var app = new Vue({
	el: '#app',
	data () {
		return {
			tipo: null,
			loading: true,
			errored: false,
			data: 'Loagin data from zap servers...',
		}
	},
	mounted () {
		axios
		.get('http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json')
		.then(response => {
			this.loading = false;
			this.data = response.data
		}).catch(error => {
			console.log(error)
			this.errored = true
		})/*.finally(() => {
			this.loading = false
		})*/
	}
})