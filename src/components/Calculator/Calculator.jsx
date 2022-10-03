import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLoader } from '../../store/calculatorSlice';
import MonthInp from '../MonthInp/MonthInp';
import PercentInp from '../PercentInp/PercentInp';
import PriceInp from '../PriceInp/PriceInp';

import s from './calculator.module.scss';

function Calculator() {
	const { finalPrice, monthPrice, loader } = useSelector((state) => state.calculator);
	const dispatch = useDispatch();

	const submitHandler = async (e) => {
		e.preventDefault();
		dispatch(setLoader(true));

		const form = new FormData(e.target);
		form.append('finalPrice', finalPrice);
		form.append('monthPrice', monthPrice);

		const headers = new Headers();
		headers.append('Content-Type', 'image/jpeg');

		try {
			await fetch(`https://eoj3r7f3r4ef6v4.m.pipedream.net`, { method: 'POST', headers: headers, body: form });
      dispatch(setLoader(false));
		} catch (e) {
			console.log(e.name);
		}
	};

	return (
		<div className={s.calculator}>
			<div className="calculator__container">
				<div className={s.calculator__title}>Рассчитайте стоимость автомобиля в лизинг</div>
				<form className={s.calculator__wrapper} onSubmit={submitHandler}>
					<PriceInp />
					<PercentInp />
					<MonthInp />
					<div className={s.calculator__mobile}>
						<div className={s.mobile__wrapper}>
							<div className="priceInfo__item">
								<div className="priceInfo__title">Сумма договора лизинга</div>
								<div className="priceInfo__sum">{finalPrice} ₽</div>
							</div>
							<div className="priceInfo__item">
								<div className="priceInfo__title">Ежемесячный платеж от</div>
								<div className="priceInfo__sum">{monthPrice} ₽</div>
							</div>
						</div>
						<div className={s.mobile__btn}>
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
				</form>
			</div>
		</div>
	);
}

export default Calculator;
