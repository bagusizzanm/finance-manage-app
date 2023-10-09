import { useState } from 'react'
import Header from "./components/Header"
import Footer from "./components/Footer"
import Transaction from "./components/Transaction"
import BalanceBox from "./components/BalanceBox"
import AddTransaction from "./components/AddTransaction.jsx";
import transaction from "./components/Transaction";

const initTransactions = [
	{
		"id": "619941539079",
		"date": new Date("01 Nov 2021 9:30 AM").getTime(),
		"des": "Monthly Salary",
		"nominal": 5500000,
	},{
		"id": "749179155708",
		"date": new Date("30 Nov 2021 12:30 PM").getTime(),
		"des": "Overtime Salary",
		"nominal": 2000000,
	},{
		"id": "568004092688",
		"date": new Date("20 Sept 2021 1:30 PM").getTime(),
		"des": "Buy new shoes",
		"nominal": -550000,
	},
]

function App() {
	const [transactions, setTranscation] = useState(initTransactions)
	
	const handleAddTransaction = (data) => {
		let newTransactions = [
			...transactions, data
		]
		
		newTransactions.sort((a,b) => a.date - b.date)
		setTranscation(newTransactions)
	}
	
	const handleDeleteTransaction = (e) => {
		// find the index to be deleted
		const result = transactions.findIndex(
			transction => transction.id === e.target.id
		)
		
		// copy transactions to change the origin array (mutate) from splice function
		const newTransaction = transactions
		newTransaction.splice(result, 1)
		setTranscation([...newTransaction])
	}
	
	return (
		<>
			<Header/>
			<BalanceBox transactions={transactions}/>
			<Transaction transactions={transactions} onDeleteTransaction={handleDeleteTransaction}/>
			<AddTransaction onAddTransactions={handleAddTransaction}/>
			<Footer/>
		</>
	)
}

export default App
