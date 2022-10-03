import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonthPrice, setPercent, setPercentPrice, setPercentValues } from '../../store/calculatorSlice';
import PercentRange from '../PercentRange/PercentRange';

import s from './PercentInp.module.scss';

function PercentInp() {
	const dispatch = useDispatch();
	const { percent, percentPrice, price, monthPrice, loader } = useSelector((state) => state.calculator);

	const inputHandler = (e) => {
		let value = e.target.value;
		let reDigit = /^\d{0,}$/;

		if (reDigit.test(value)) {
			if (value < 10 || value > 60) {
				dispatch(setPercent(value));
			} else {
				dispatch(setPercent(value));
				dispatch(setPercentValues([parseInt(value)]));
				dispatch(setPercentPrice(Math.trunc((parseInt(price.replaceAll(' ', '')) / 100) * value)));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}
		}
	};

	const focusOutHandler = (e) => {
		let value = e.target.value;
		formatInputValue(value);
	};

	const keyHandler = (e) => {
		if (e.code === 'Enter' || e.code === 'Escape' || e.code === 'NumpadEnter') {
			let value = e.target.value;
			formatInputValue(value);
		}
	};

	const formatInputValue = (value) => {
		if (value <= 10) {
			dispatch(setPercent(10));
			dispatch(setPercentValues([10]));
		} else if (value >= 60) {
			dispatch(setPercent(60));
		}
	};

	return (
		<div className={s.percent}>
			<label htmlFor="percent">
				{' '}
				Первоначальный взнос
				<div className={s.percent__input}>
					<input className="disabled input" disabled={!!loader} type="text" name="firstPayment" id="firstPayment" value={percentPrice} readOnly />
					<div className={`${s.percent__number} ${loader ? 'inp_disabled' : null}`}>
						<input
							className={loader ? 'inp_disabled' : null}
							disabled={!!loader}
							type="text"
							name="percent"
							id="percent"
							value={`${percent}`}
							onChange={inputHandler}
							onBlur={focusOutHandler}
							onKeyDown={keyHandler}
							maxLength={2}
						/>
					</div>
				</div>
			</label>
			<PercentRange />
			<div className="priceInfo__item desktop">
				<div className="priceInfo__title">Ежемесячный платеж от</div>
				<div className="priceInfo__sum">{monthPrice} ₽</div>
			</div>
		</div>
	);
}

export default PercentInp;