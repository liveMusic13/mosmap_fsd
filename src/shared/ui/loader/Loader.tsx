import { FC } from 'react';

interface IProps {
	width?: string;
	height?: string;
	className?: string;
}

export const Loader: FC<IProps> = ({ width, height, className }) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox='0 0 50 50'
			className={`
				w-12.5 h-12.5
				z-50 ${className}
			`}
		>
			<circle
				cx='25'
				cy='25'
				r='20'
				fill='none'
				className='stroke-4 stroke-primary-light'
				strokeDasharray='100'
				strokeDashoffset='50'
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					from='0 25 25'
					to='360 25 25'
					dur='3s'
					repeatCount='indefinite'
				/>
			</circle>

			<circle
				cx='25'
				cy='25'
				r='15'
				fill='none'
				className='stroke-4 stroke-primary'
				strokeDasharray='75'
				strokeDashoffset='37.5'
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					from='360 25 25'
					to='0 25 25'
					dur='2s'
					repeatCount='indefinite'
				/>
			</circle>

			<circle
				cx='25'
				cy='25'
				r='10'
				fill='none'
				className='stroke-4 stroke-primary-middle'
				strokeDasharray='50'
				strokeDashoffset='25'
			>
				<animateTransform
					attributeName='transform'
					type='rotate'
					from='0 25 25'
					to='360 25 25'
					dur='1.5s'
					repeatCount='indefinite'
				/>
			</circle>
		</svg>
	);
};
