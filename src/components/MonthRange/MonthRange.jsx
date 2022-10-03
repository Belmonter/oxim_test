import React from 'react';
import { getTrackBackground, Range } from 'react-range';
import { useDispatch, useSelector } from 'react-redux';

import { setFinalPrice, setMonth, setMonthPrice, setMonthValues } from '../../store/calculatorSlice';

import s from './monthRange.module.scss';

function MonthRange() {
	const min = 1;
	const max = 60;
	const step = 1;

	const dispatch = useDispatch();
	const { monthValues, loader } = useSelector((state) => state.calculator);

	return (
		<Range
			values={monthValues}
			step={step}
			min={min}
			max={max}
			onChange={(values) => {
				dispatch(setMonthValues(values));
				dispatch(setMonth(values[0]));
				dispatch(setMonthPrice());
				dispatch(setFinalPrice());
			}}
			renderTrack={({ props, children }) => (
				<div
					className={s.month__track}
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
								values: monthValues,
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
					className={s.month__thumb}
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

export default MonthRange;