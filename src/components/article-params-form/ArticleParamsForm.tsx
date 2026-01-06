import { useState } from 'react';
import { ArrowButton } from '../../ui/arrow-button';
import { Button } from '../../ui/button';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { useArticleContext } from '../../contexts/ArticleContext';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	type ArticleStateType,
	type OptionType,
} from '../../constants/articleProps';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const {
		applyFormState,
		resetArticleState,
		articleState: currentArticleState,
	} = useArticleContext();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);

	const closePanel = () => {
		setIsOpen(false);
		setFormState(currentArticleState);
	};

	const handleFontFamilyChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: selected }));
	};

	const handleFontSizeChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: selected }));
	};

	const handleFontColorChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: selected }));
	};

	const handleBackgroundColorChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: selected }));
	};

	const handleContentWidthChange = (selected: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: selected }));
	};

	const handleApply = () => {
		applyFormState(formState);
		closePanel();
	};

	const handleReset = () => {
		resetArticleState();
		setFormState(defaultArticleState);
		closePanel();
	};

	const handlePanelToggle = () => {
		if (!isOpen) {
			setFormState(currentArticleState);
		}
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={handlePanelToggle} isOpen={isOpen} />

			<div className={`${styles.panel} ${isOpen ? styles.panel_open : ''}`}>
				<div className={styles.panelContent}>
					<h2 className={styles.title}>Задайте параметры</h2>

					<div className={styles.form}>
						{/* Шрифт - Select компонент */}
						<div className={styles.formGroup}>
							<label className={styles.label}>Шрифт</label>
							<Select
								selected={formState.fontFamilyOption}
								options={fontFamilyOptions}
								onChange={handleFontFamilyChange}
								title=''
								placeholder='Выберите шрифт'
							/>
						</div>

						{/* Размер шрифта - RadioGroup */}
						<div className={styles.formGroup}>
							<label className={styles.label}>Размер шрифта</label>
							<RadioGroup
								name='fontSize'
								options={fontSizeOptions}
								selected={formState.fontSizeOption}
								onChange={handleFontSizeChange}
								title=''
							/>
						</div>

						{/* Цвет текста - Select с цветами */}
						<div className={styles.formGroup}>
							<label className={styles.label}>Цвет текста</label>
							<Select
								selected={formState.fontColor}
								options={fontColors}
								onChange={handleFontColorChange}
								title=''
								placeholder='Выберите цвет текста'
							/>
						</div>

						{/* Цвет фона - Select с цветами */}
						<div className={styles.formGroup}>
							<label className={styles.label}>Цвет фона</label>
							<Select
								selected={formState.backgroundColor}
								options={backgroundColors}
								onChange={handleBackgroundColorChange}
								title=''
								placeholder='Выберите цвет фона'
							/>
						</div>

						{/* Ширина контента - Select с иконками */}
						<div className={styles.formGroup}>
							<label className={styles.label}>Ширина контента</label>
							<Select
								selected={formState.contentWidth}
								options={contentWidthArr}
								onChange={handleContentWidthChange}
								title=''
								placeholder='Выберите ширину'
							/>
						</div>

						{/* Кнопки - Button компоненты */}
						<div className={styles.buttons}>
							<Button title='Сбросить' onClick={handleReset} type='clear' />
							<Button title='Применить' onClick={handleApply} type='apply' />
						</div>
					</div>
				</div>
			</div>

			{/* Оверлей для закрытия по клику вне панели */}
			{isOpen && <div className={styles.overlay} onClick={closePanel} />}
		</>
	);
};
