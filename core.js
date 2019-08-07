var app = new Vue({
	el: '#app',
	data () {
		return {
			message: 'Loagin data from zap servers...'
		}
	},
	mounted () {
		axios
		.get('http://grupozap-code-challenge.s3-website-us-east-1.amazonaws.com/sources/source-1.json')
		.then(response => (this.message = response))
	}
})