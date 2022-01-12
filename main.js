var eventBus = new Vue()

Vue.component('coins-list', {
	props: ['coins'],
	template: `
		<div>
			<h3>Coins</h3>
			<ul>
				<li v-for="coin in coins"><a href="#" @click="getTransactions(coin)">{{ coin.toUpperCase() }}</a></li>
			</ul>
		</div>
	`,
	data() {
		return {
		}
	},
	methods: {
		getTransactions(coin) {
			console.log('Getting transactions for ' + coin)
			eventBus.$emit('coin-selected', coin)
		}
	}		
})

Vue.component('transactions-list', {
	props: ['coin', 'transactions'],
	template: `
		<div v-if="coin != ''">
			<h3>{{coinName}} Transactions</h3>
			<div v-if="total_sum > 0">
				<div>{{transactions[coin]}}</div>
				<div>Total: <b>{{ total_sum }}</b></div>
			</div>
			<div v-else>
				No transactions
			</div>
		</div>
	`,
	data() {
		return {
		}
	},
	computed: {
		coinName() {
			return this.coin.toUpperCase()
		},
		total_sum() {
			if (this.coin in this.transactions)
				return this.transactions[this.coin].reduce((a,b)=>a+b)
			else
				return 0
		}
	}	
})

var app = new Vue({
	el: '#app',
	data: {
		coins: ['btc', 'eth', 'luna', 'avax', 'sol'],
		selectedCoin: '',
		transactions: {
			'btc': [10, 50], 
			'eth': [10, 10, 20], 
			'sol': [100], 
		},
	},
	methods: {
	},
	mounted() {
		eventBus.$on('coin-selected', coin => {
	    	this.selectedCoin = coin			
		})
	}

})