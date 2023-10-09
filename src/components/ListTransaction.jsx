import React from 'react';

const ListTransaction = (props) => {
	
	const getDate = date => {
		let dateObj = new Date(date)
		
		const arrMonths = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Des"]
		
		let month = arrMonths[dateObj.getMonth()]
		return `${dateObj.getDate()} ${month} ${dateObj.getFullYear()}`
	}
	
	let classTransaction = (props.nominal > 0) ? "list-income" : "list-outcome"
	
	return (
		<div className={`list-transaction p-1 mb-2 ${classTransaction}`}>
			<div className="ms-2 d-flex flex-column">
				<p className="m-0 fs-5">{props.des}</p>
				<small>{getDate(props.date)}</small>
			</div>
			<p className="fs-5 mb-1 me-3 text">Rp. {props.nominal.toLocaleString('id-ID')}</p>
			<span className="delete-icon" id={props.id} onClick={props.onDelete}>x</span>
		</div>
	);
};

export default ListTransaction;