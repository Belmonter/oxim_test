import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonthPrice, setPercentPrice, setPrice, setPriceValues } from '../../store/calculatorSlice';
import PriceRange from '../PriceRange/PriceRange';

import s from './priceInp.module.scss';

function PriceInp() {
	const { price, percent, finalPrice, loader } = useSelector((state) => state.calculator);
	const dispatch = useDispatch();

	const formatInputValue = (value) => {
		if (value <= 1000000) {
			dispatch(setPrice('1 000 000'));
			dispatch(setPriceValues([1000000]));
		} else if (value >= 6000000) {
			dispatch(setPrice('6 000 000'));
		}
	};

	const focusHandler = (e) => {
		let value = e.target.value.replaceAll(' ', '');
		formatInputValue(value);
	};

	const keyHandler = (e) => {
		if (e.code === 'Enter' || e.code === 'Escape' || e.code === 'NumpadEnter') {
			let value = e.target.value.replaceAll(' ', '');
			formatInputValue(value);
		}
	};

	const InputHandler = (e) => {
		let value = e.target.value.replaceAll(' ', '');
		let rePrice = /(\d)(?=(\d{3})+(?!\d))/g;
		let reDigit = /^\d{0,}$/;

		if (reDigit.test(value)) {
			if (value < 1000000 || value > 6000000) {
				dispatch(setPrice(value.replace(rePrice, '$1 ')));
			} else {
				dispatch(setPrice(value.replace(rePrice, '$1 ')));
				dispatch(setPriceValues([parseInt(value)]));
				dispatch(setPercentPrice(Math.trunc((parseInt(value) / 100) * percent)));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}
		}
	};

	return (
		<div className={s.automobile}>
			<label htmlFor="cost">
				{' '}
				Стоимость автомобиля
				<div className={`${s.automobile__input} ${loader ? 'inp_disabled' : null}`}>
					<input
						disabled={!!loader}
						className="unselectable input"
						type="text"
						name="cost"
						id="cost"
						value={price}
						onChange={InputHandler}
						onBlur={focusHandler}
						onKeyUp={keyHandler}
					/>
				</div>
			</label>
			<PriceRange />
			<div className="priceInfo__item desktop">
				<div className="priceInfo__title">Сумма договора лизинга</div>
				<div className="priceInfo__sum">{finalPrice} ₽</div>
			</div>
		</div>
	);
}

export default PriceInp;
