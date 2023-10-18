import { useState } from "react";
import { languageData } from "../../helpers/languageData";
import DropDownIcon from "../../assets/images/down-arrow.png";
import "./style.css"

export function LanguagePicker () {
    // selected__language represents the selected language
    const [selectedLanguage, setSelectedLanguage] = useState(languageData[0]);
    const [isOpen, setIsOpen] = useState(false);

    const selectLanguage = (language) => {
        setSelectedLanguage(prev => (
        {
            ...prev, name: language.name, image: language.image
        }
        ));
        setIsOpen(!isOpen);
    }
    console.log('Select language ', selectedLanguage);
    console.log(selectLanguage.name);
    console.log('Is open ', isOpen);

    return (
        
          <div className="language__picker">
            <div className="selected__language" onClick = {() => {setIsOpen(prev => !prev)}}>
                <img src = {selectedLanguage.image}/>
                <span>{selectedLanguage.name}</span>
                <img src = {DropDownIcon} className= {`arrow__down ${isOpen ? 'styles.active' : ''}`}/>
            </div>
            {
                isOpen && (
                    <div className="language__dropdown">
                        {
                            languageData
                            .filter(el => el.name !== selectedLanguage.name)
                            .map((language, index) => { 
                               return (
                                <div className="language" key = {index} onClick={() => {selectLanguage(language)}}>
                                    <img src = {language.image} />
                                    <span>{language.name}</span>
                                </div>
                               )
                            })
                        }
                    </div>
                )
            }
            
          </div>
        
    )
}