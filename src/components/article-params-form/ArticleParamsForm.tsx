import { useState, useEffect, useRef, useCallback } from 'react';
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
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);
	const panelRef = useRef<HTMLDivElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	// Мемоизируем обработчики
	const closePanel = useCallback(() => {
		setIsMenuOpen(false);
		setFormState(currentArticleState);
	}, [currentArticleState]);

	const handleFormSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			applyFormState(formState);
			closePanel();
		},
		[applyFormState, formState, closePanel]
	);

	const handleFormReset = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			resetArticleState();
			setFormState(defaultArticleState);
			closePanel();

			if (formRef.current) {
				formRef.current.reset();
			}
		},
		[resetArticleState, closePanel]
	);

	const handlePanelToggle = useCallback(() => {
		if (!isMenuOpen) {
			setFormState(currentArticleState);
		}
		setIsMenuOpen(!isMenuOpen);
	}, [isMenuOpen, currentArticleState]);

	// Обработчики изменений полей формы
	const handleFontFamilyChange = useCallback((selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontFamilyOption: selected }));
	}, []);

	const handleFontSizeChange = useCallback((selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontSizeOption: selected }));
	}, []);

	const handleFontColorChange = useCallback((selected: OptionType) => {
		setFormState((prev) => ({ ...prev, fontColor: selected }));
	}, []);

	const handleBackgroundColorChange = useCallback((selected: OptionType) => {
		setFormState((prev) => ({ ...prev, backgroundColor: selected }));
	}, []);

	const handleContentWidthChange = useCallback((selected: OptionType) => {
		setFormState((prev) => ({ ...prev, contentWidth: selected }));
	}, []);

	// Обработчик клика вне панели - исправленная версия
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isMenuOpen &&
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				closePanel();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isMenuOpen, closePanel]); // Добавлены зависимости

	// Если ошибка сохраняется, попробуйте более простой вариант useEffect:
	/*
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        closePanel();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, closePanel]);
  */

	return (
		<>
			<ArrowButton onClick={handlePanelToggle} isMenuOpen={isMenuOpen} />

			{/* Условный рендеринг панели ВНЕ хуков */}
			{isMenuOpen && (
				<div ref={panelRef} className={`${styles.panel} ${styles.panel_open}`}>
					<div className={styles.panelContent}>
						<h2 className={styles.title}>Задайте параметры</h2>

						<form
							ref={formRef}
							className={styles.form}
							onSubmit={handleFormSubmit}
							onReset={handleFormReset}
							noValidate>
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

							<div className={styles.buttons}>
								<Button title='Сбросить' type='clear' htmlType='reset' />
								<Button title='Применить' type='apply' htmlType='submit' />
							</div>
						</form>
					</div>
				</div>
			)}
		</>
	);
};
