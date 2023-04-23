import React, { useState } from 'react';
import className from 'classnames';
import { useTranslations } from 'next-intl';
import { Card, CollapseSection, LabeledContainer, Switch } from '@/burtUI';
import { Select } from '@/components/Select';
import { qualityOptions } from '@/constants/qualityOptions';
import setOptions from '@/constants/setOptions';
import styleOptions from '@/constants/styleOptions';
import layoutStyles from '@/styles/layout.module.css';
import { armorPieces, armorWeights, armorTraits, armorGlyphs } from './constants';
import styles from './styles.module.css';

const ArmorSection = () => {
  const t = useTranslations();
  const [armor, setArmor] = useState(armorPieces);

  const toggleArmorPiece = (piece: string) => {
    setArmor((oldArmorState) => {
      const newArmorState = Array.from(oldArmorState);
      const toggledArmorIndex = newArmorState.findIndex((armor) => armor.key === piece)

      newArmorState[toggledArmorIndex] = {
        ...newArmorState[toggledArmorIndex],
        selected: !newArmorState[toggledArmorIndex].selected,
      }

      return newArmorState;
    })
  }

  return (
    <CollapseSection headerText='Armor Pieces' headerClassName={layoutStyles.limitWidth}>
      <>
        <div className={className(styles.row, layoutStyles.limitWidth)}>
          {armor.map(({ key, label, selected }) => (
            <span key={key} className={styles.switchContainer}>
              <label>{label}</label>
              <Switch checked={selected} onToggle={() => toggleArmorPiece(key)} />
            </span>
          ))}
          <LabeledContainer label="Global Armor Options" bordered>
            <div className={styles.row}>
              <Select
                className={styles.globalOption}
                options={qualityOptions}
                placeholder='Quality'
              />

              <Select
                className={styles.globalOption}
                options={armorWeights(t)}
                placeholder='Weight'
              />
              <Select
                className={styles.globalOption}
                options={armorTraits(t)}
                placeholder='Trait'
              />

              <Select
                className={styles.globalOption}
                options={armorGlyphs(t)}
                placeholder='Glyph'
              />
              <Select
                className={styles.globalOption}
                options={qualityOptions}
                placeholder='Glyph quality'
              />

              <Select
                className={styles.globalOption}
                options={setOptions(t)}
                placeholder='Set'
              />
              <Select
                className={styles.globalOption}
                options={styleOptions(t)}
                placeholder='Style'
              />
            </div>
          </LabeledContainer>
        </div>

        <div className={styles.row}>
          {armor.map(({ key, label, selected }) => {
            if (!selected) { return null }

            return (
              <Card key={key} title={label}>
                <div className={styles.optionsContainer}>
                  <Select
                    className={styles.option}
                    options={qualityOptions}
                  />

                  <Select
                    className={styles.option}
                    options={armorWeights(t)}
                  />
                  <Select
                    className={styles.option}
                    options={armorTraits(t)}
                  />

                  <Select
                    className={styles.option}
                    options={armorGlyphs(t)}
                  />
                  <Select
                    className={styles.option}
                    options={qualityOptions}
                  />

                  <Select
                    className={styles.option}
                    options={setOptions(t)}
                  />
                  <Select
                    className={styles.option}
                    options={styleOptions(t)}
                  />
                </div>
              </Card>
            )
          })}
        </div>
      </>
    </CollapseSection>
  )
};

export default ArmorSection;
