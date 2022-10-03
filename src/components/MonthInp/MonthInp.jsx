import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonth, setMonthPrice, setMonthValues, setPercent, setPercentPrice, setPercentValues } from '../../store/calculatorSlice';
import MonthRange from '../MonthRange/MonthRange';

import s from './monthInp.module.scss';

function MonthInp() {
	const dispatch = useDispatch();
	const { month, loader } = useSelector((state) => state.calculator);

	const inputHandler = (e) => {
		let value = e.target.value;
		let reDigit = /^\d{0,}$/;

		if (reDigit.test(value)) {
			if (value < 1 || value > 60) {
				dispatch(setMonth(value));
			} else {
				dispatch(setMonth(value));
				dispatch(setMonthValues([parseInt(value)]));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}
		}
	};

	const focusOutHandler = (e) => {
		let value = e.target.value;
		formatInputValue(value);
	};

	const formatInputValue = (value) => {
		if (value < 1) {
			dispatch(setMonth(1));
			dispatch(setMonthValues([1]));
		} else if (value >= 60) {
			dispatch(setMonth(60));
		}
	};

	const keyHandler = (e) => {
		if (e.code === 'Enter' || e.code === 'Escape' || e.code === 'NumpadEnter') {
			let value = e.target.value;
			formatInputValue(value);
		}
	};

	return (
		<div className={s.month}>
			<label htmlFor="month">
				{' '}
				Срок лизинга
				<div className={`${s.month__input} ${loader ? 'inp_disabled' : null}`}>
					<input
						disabled={!!loader}
						className="unselectable input"
						type="text"
						name="months"
						id="month"
						value={month}
						onChange={inputHandler}
						onBlur={focusOutHandler}
						onKeyDown={keyHandler}
					/>
				</div>
			</label>
			<MonthRange />
			<div className="btn__wrapper desktop">
				<button disabled={!!loader} type="submit" className="priceInfo__btn">
					{loader ? null : 'Оставить заявку'}
					<div className={loader ? 'lds-ring active' : 'lds-ring'}>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</div>
				</button>
			</div>
		</div>
	);
}

export default MonthInp;