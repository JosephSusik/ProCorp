import { useEffect, useState } from 'react';
import './styles/DropDown.css'
import ClickAwayListener from 'react-click-away-listener';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

interface DropDownProps {
    options: string[]
    selectedValueSetter: any
    filterValue: string
    placeholder: string
}

function DropDown(opt:DropDownProps) {
   
    const [showMenu, setShowMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    //const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedValue, setSelectedValue] = useState<string>(opt.filterValue);



    useEffect(() => {
        opt.selectedValueSetter(selectedValue);
    }, [opt, selectedValue])

    const searchOnChange = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }

    const options = opt.options;

    const optionsToShow = () => {
        if (!searchValue) {
          return options;
        }
    
        return options.filter(
          (option) =>
            option.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0
        );
    };

    const isSelected = (option:string) => {
        if (!selectedValue) {
          return false;
        }
    
        return selectedValue === option;
    };

    const onItemClick = (option:string) => {
        if(option === selectedValue) {
            setSelectedValue("")
        } else {
            setSelectedValue(option);
        }
        setShowMenu(false);
    };

    return(
            <div className='dropdown-wrapper'>
                <div className='dropdown-input'
                    onClick={()=>setShowMenu(true)}
                >
                    {!selectedValue?
                        <p className='placeholder'>{opt.placeholder}</p>
                    :
                        <p>{selectedValue}</p>
                    }
                    <div className='icon-div'>
                        <KeyboardArrowLeftIcon className={`icon ${showMenu? "rotate":""}`}/>
                    </div>
                </div>
                
                
                {showMenu && (
                    <ClickAwayListener 
                        onClickAway={()=>{setShowMenu(false);setSearchValue("")}} 
                    >
                    <div className='dropdown-menu'>
                        <div className='search-box'>
                            <input 
                                type="text" 
                                name='search-value'
                                value={searchValue}
                                onChange={searchOnChange}
                                placeholder='Search...'
                                autoComplete='off'
                            />
                        </div>
                        {optionsToShow().map((option) => (
                            <div 
                                className={`dropdown-item ${isSelected(option) && 'selected'}`} 
                                onClick={()=>onItemClick(option)}
                                key={option}>
                                <p>{option}</p>
                            </div>
                        ))}
                        
                    </div>
                    </ClickAwayListener>
                )}
            </div>
    );
}

export default DropDown;