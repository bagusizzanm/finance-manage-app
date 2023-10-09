import React from 'react';
import ListTransaction from './ListTransaction'

const Transaction = (props) => {
	return (
		<div>
			<section id="transaction">
				<div className="container py-5">
					<div className="row">
						<div className="col-12 col-lg-6 mb-4">
							<h2 className="fw-light mb-3 text-center text-success">Income</h2>
							<hr className="w-100 mx-auto mb-4"/>
							{
								props.transactions.map((transaction) => (
									(transaction.nominal > 0) &&
									<ListTransaction key={transaction.id}
										id={transaction.id} date={transaction.date} des={transaction.des} nominal={transaction.nominal}
									/>
								))
							}
						</div>
						<div className="col-12 col-lg-6 mb-4" id="outcome">
							<h2 className="fw-light mb-3 text-center text-danger">Expense</h2>
							<hr className="w-100 mx-auto mb-4"/>
							{
								props.transactions.map((transaction) => (
									(transaction.nominal <= 0) &&
									<ListTransaction
										key={transaction.id}
										id={transaction.id} date={transaction.date} des={transaction.des} nominal={transaction.nominal}
									/>
								))
							}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Transaction;