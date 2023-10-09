import React, {useEffect, useState} from 'react';

function BalanceBox(props) {
	const [incomeBalance, setIncomeBalance] = useState(0)
	const [outcomeBalance, setOutcomeBalance] = useState(0)
	
	useEffect(() => {
		let totalIncome = 0
		let totalOutcome = 0
		
		// Count the income and outcome
		props.transactions.forEach((transaction) => {
			if (transaction.nominal > 0){
				totalIncome += transaction.nominal
			}else {
				totalOutcome +=transaction.nominal
			}
		})
		
		setIncomeBalance(totalIncome)
		setOutcomeBalance(totalOutcome)
	}, [props.transactions])
	
	return (
		<section id="balance-box">
			<div className="container mb-4">
				<div className="total-balance">
					<p className="pt-4 mb-0 fw-bold text-uppercase text-center" style={{color: "#4b32d0"}}>B a l a n c e</p>
					<hr/>
					<h2 className="display-5 px-5 pb-3">
						Rp. {(incomeBalance + outcomeBalance).toLocaleString('id-ID')}
					</h2>
					<div className="d-flex justif-content-center">
						<p className="mini-balance mini-balance-income py-2">
							Rp. {incomeBalance.toLocaleString('id-ID')}
						</p>
						<p className="mini-balance mini-balance-outcome py-2">
							Rp. {outcomeBalance.toLocaleString('id-ID')}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default BalanceBox;