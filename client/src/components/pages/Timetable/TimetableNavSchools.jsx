import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSchools } from '../../../store/timetable/allSchoolsSlice'

const TimetableNavSchools = ({setIsOpenGroup, setSelectedGroup}) => {

    const dispatch = useDispatch()
    const [isOpenSchool, setIsOpenSchool] = useState(false);
    const schoolRef = useRef(null);
    const [selectedSchool, setSelectedSchool] = useState('Все школы');
    const [inputToggleSchool, setInputToggleSchool] = useState(false);
    const [inputToggleGroup, setInputToggleGroup] = useState(false);

    useEffect(() => {
        dispatch(fetchAllSchools());
    }, [dispatch]);

    const {items} = useSelector(state => state.allschools);
    console.log(items)
    // Пример списка школ (в реальном приложении данные могут приходить с сервера)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Закрытие меню школ
            if (schoolRef.current && !schoolRef.current.contains(event.target)) {
                setIsOpenSchool(false);
                setInputToggleSchool(false);
            }
            // Закрытие меню групп
           
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    
    const handleSchoolSelect = (school) => {
        setSelectedSchool(school.name);
        setIsOpenSchool(false);
    };
   
  
    const onDeleteButtton = (item) => {
        console.log(item)
    }

    const openSchoolHandler = async() => {
            setIsOpenSchool(prev => !prev);
    }
    const inputToggleHandlerSchool = async () => {
        setInputToggleSchool((e) => !e)
        if (inputToggleGroup) {
            setInputToggleGroup(false)
        }
    }
   



    return (
        <div className="timetable-nav-dropdown-school" ref={schoolRef}>
            <button className="timetable-nav-dropdown-school-toggle" onClick={() => openSchoolHandler()} >
                {selectedSchool}
                <span className="timetable-nav-arrow">▼</span>
            </button>
            {isOpenSchool && (
                <ul className="timetable-nav-dropdown-school-menu">
                    <li onClick={(e) => inputToggleHandlerSchool()} className="timetable-nav-dropdown-group-item timetable-nav-add">
                        <button className='timetable-nav-add-button'><i className="fa-solid fa-plus"></i></button>
                    </li>
                    {inputToggleSchool &&
                        <li className="timetable-nav-dropdown-group-item">
                            <input className='timetable-nav-dropdown-input' type="text" placeholder='Добавить...' />
                        </li>
                    }
                    <li onClick={() => handleSchoolSelect("Все школы")} className="timetable-nav-dropdown-school-item">
                        Все школы
                    </li>
                    {items.map((school) => (
                        <li key={school.id} onClick={() => handleSchoolSelect(school)} className="timetable-nav-dropdown-school-item">
                            <p>{school.name}</p>
                            <button onClick={(e) => onDeleteButtton(school)} className='timetable-nav-delete'><i className="fa-solid fa-minus"></i></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TimetableNavSchools