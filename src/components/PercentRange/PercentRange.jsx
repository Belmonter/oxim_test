import React from 'react';
import { getTrackBackground, Range } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonthPrice, setPercent, setPercentPrice, setPercentValues } from '../../store/calculatorSlice';

import s from './PercentRange.module.scss';

function PercentRange() {
	const min = 10;
	const max = 60;
	const step = 1;

	const dispatch = useDispatch();
	const { percentValues, price, loader } = useSelector((state) => state.calculator);

	return (
		<Range
			values={percentValues}
			step={step}
			min={min}
			max={max}
			onChange={(values) => {
				dispatch(setPercentValues(values));
				dispatch(setPercent(values[0]));
				dispatch(setPercentPrice(Math.trunc((parseInt(price.replaceAll(' ', '')) / 100) * values[0])));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}}
			renderTrack={({ props, children }) => (
				<div
					className={s.percent__track}
					style={{
						...props.style,
						margin: '-1px auto 0 auto',
						height: '0px',
						display: 'flex',
						outline: 'none',
						border: 'unset',
					}}
				>
					<div
						ref={props.ref}
						style={{
							height: '1px',
							width: '100%',
							borderRadius: '4px',
							background: getTrackBackground({
								values: percentValues,
								colors: loader ? ['#FFEED9', '#FEFEFE'] : ['#FF9514', '#FEFEFE'],
								min: min,
								max: max,
							}),
							alignSelf: 'center',
						}}
					>
						{children}
					</div>
				</div>
			)}
			renderThumb={({ props, isDragged }) => (
				<div
					{...props}
					className={s.percent__thumb}
					style={{
						height: isDragged ? '24px' : '20px',
						width: isDragged ? '24px' : '20px',
						borderRadius: '50%',
						backgroundColor: loader ? '#FFEED9' : '#FF9514',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						pointerEvents: loader ? 'none' : 'auto',
					}}
				></div>
			)}
		/>
	);
}

export default PercentRange;