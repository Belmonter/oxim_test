import React from 'react';
import { getTrackBackground, Range } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonthPrice, setPercentPrice, setPrice, setPriceValues } from '../../store/calculatorSlice';

import s from './PriceRange.module.scss';

function PriceRange() {
	const min = 1000000;
	const max = 6000000;
	const step = 1;

	const dispatch = useDispatch();
	const { values, percent, loader } = useSelector((state) => state.calculator);

	return (
		<Range
			values={values}
			step={step}
			min={min}
			max={max}
			onChange={(values) => {
				dispatch(setPriceValues(values));
				dispatch(setPrice(String(values[0]).replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$& ')));
				dispatch(setPercentPrice(Math.trunc((parseInt(String(values[0]).replaceAll(' ', '')) / 100) * percent)));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}}
			renderTrack={({ props, children }) => (
				<div
					className={s.price__track}
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
								values: values,
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
					className={s.automobile__thumb}
					style={{
						height: isDragged ? '24px' : '20px',
						width: isDragged ? '24px' : '20px',
						borderRadius: '50%',
						backgroundColor: loader ? '#FFEED9' : '#FF9514',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				></div>
			)}
		/>
	);
}

export default PriceRange;