import React, {useRef, useState} from 'react';

const AddTransaction = props => {
	
	// format dateForm => dd/mm/yy
	const getTanggal = () => {
		let dateObj = new Date();
		
		// need to add padstart() so that the date display 2 digits with 0 in beginning
		let dateForm = dateObj.getDate().toString().padStart(2, "0");
		
		// the month should be added by 1 cause it start from 0 for january
		let bulan = (dateObj.getMonth() + 1).toString().padStart(2, "0");
		
		return `${dateForm}/${bulan}/${dateObj.getFullYear()}`;
	}
	
	const [formInput, setFormInput] = useState({
		dateForm: getTanggal(),
		des: "",
		nominal: "",
	});
	
	const [errors, setErrors] = useState({
		dateForm: "",
		des: "",
		nominal: "",
	});
	
	const formValid = useRef(true);
	
	const handleInputChange = (event) => {
		setFormInput({ ...formInput, [event.target.name]: event.target.value })
	}
	
	const handleFormSubmit = (e) => {
		e.preventDefault();
		let pesanErrors = {};
		
		// date validation
		if (formInput.dateForm.trim() === "") {
			pesanErrors.dateForm = "Date shouldn't be empty !";
		} else if (!/^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/.test(formInput.dateForm)) {
			pesanErrors.dateForm = "Format date invalid !";
		} else {
			pesanErrors.dateForm = "";
		}
		
		// desc validation
		if (formInput.des.trim() === "") {
			pesanErrors.des = "Description shouldn't be empty !";
		} else {
			pesanErrors.des = "";
		}
		
		// nominal validation
		if (formInput.nominal.trim() === "") {
			pesanErrors.nominal = "Nominal shouldn't be empty !";
		} else if (!/^[+|-]?\d+$/.test(formInput.nominal)) {
			pesanErrors.nominal = "Nominal should be in numbers !";
		} else {
			pesanErrors.nominal = "";
		}
		
		// update error state
		setErrors(pesanErrors);
		
		// checking the validation
		formValid.current = true;
		for (let inputName in pesanErrors) {
			if (pesanErrors[inputName].length > 0) {
				formValid.current = false;
			}
		}
		
		// if is valid
		if (formValid.current) {
			
			let dateFormInput = new Date();
			dateFormInput.setDate(parseInt(formInput.dateForm.substr(0, 2)));
			dateFormInput.setMonth(parseInt(formInput.dateForm.substr(3, 2) - 1));
			dateFormInput.setFullYear(parseInt(formInput.dateForm.substr(6, 4)));
			
			let transaction = {
				"id": Math.floor(Math.random() * 1000000000000).toString(),
				"dateForm": dateFormInput.getTime(),
				"des": formInput.des,
				"nominal": parseInt(formInput.nominal),
			};
			
			props.onAddTransactions(transaction)
			// console.log(transaction)
			// empty the input
			setFormInput({
				dateForm: getTanggal(),
				des: "",
				nominal: ""
			})
		}
	}
	
	return (
		<div>
			<section id="add-transaction">
				<div className="container py-5">
					<h2 className="fw-light mb-3 text-center">Add Transaction</h2>
					<hr className="mx-auto mb-4"/>
					
					{!formValid.current && (
						<div className="row">
							<div className="col-12 col-lg-12 error-box mb-3">
								<ul className="py-3">
									{errors.dateForm && <li> {errors.dateForm} </li>}
									{errors.des && <li> {errors.des} </li>}
									{errors.nominal && <li> {errors.nominal} </li>}
								</ul>
							</div>
						</div>)}
					<form onSubmit={handleFormSubmit}>
						<div className="row">
							<div className="col-12 col-md-3 col-lg-2 mb-3">
								<label htmlFor="dateForm" className="form-label">Date</label>
								<input type="text" name="dateForm" id="dateForm" placeholder="dd/mm/yyy" className={`form-control ${errors.dateForm && "is-invalid"}`} value={formInput.dateForm} onChange={handleInputChange}/>
							</div>
							<div className="col-12 col-md-6 col-lg-5 mb-3">
								<label htmlFor="des" className="form-label">Description</label>
								<input type="text" name="des" id="des" placeholder="Pay the bill..." className={`form-control ${errors.des && "is-invalid"}`} value={formInput.des} onChange={handleInputChange}/>
							</div>
							<div className="col-12 col-md-3 col-lg-3 mb-3">
								<label htmlFor="nominal" className="form-label">Nominal* (+/-)</label>
								<input type="text" name="nominal" id="nominal" placeholder="-150000" className={`form-control ${errors.nominal && "is-invalid"}`} value={formInput.nominal} onChange={handleInputChange}/>
							</div>
							<div className="col-12 col-lg-2 mb-3 d-flex align-items-end">
								<button type="submit" className="btn btn-primary flex-fill">
									Add
								</button>
							</div>
						</div>
						<p><small className="text-danger">* If a negative number is entered, it will be recorded in expenses.</small></p>
					</form>
				</div>
			</section>
		</div>
	);
};

export default AddTransaction;