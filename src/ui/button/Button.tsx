import styles from './Button.module.scss';
import clsx from 'clsx';

interface ButtonProps {
	title: string;
	type: 'apply' | 'clear';
	htmlType?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
}

export const Button = ({
	title,
	type,
	htmlType = 'button',
	onClick,
}: ButtonProps) => {
	return (
		<button
			type={htmlType}
			className={clsx(styles.button, {
				[styles.button_apply]: type === 'apply',
				[styles.button_clear]: type === 'clear',
			})}
			onClick={onClick}>
			{title}
		</button>
	);
};
