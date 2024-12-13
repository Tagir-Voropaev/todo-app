import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSchools } from '../../../store/timetable/allSchoolsSlice';


const TimetableNavGroups = ({ setIsOpenSchool, setSelectedSchool }) => {

    const dispatch = useDispatch()
    const [isOpenGroup, setIsOpenGroup] = useState(false);
    const groupRef = useRef(null);
    const [selectedGroup, setSelectedGroup] = useState('Все группы');
    const [inputToggleSchool, setInputToggleSchool] = useState(false);
    const [inputToggleGroup, setInputToggleGroup] = useState(false);

    useEffect(() => {
        dispatch(fetchAllSchools());
    }, [dispatch]);

    const data = useSelector(state => state.schools);

    // Пример списка школ (в реальном приложении данные могут приходить с сервера)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Закрытие меню групп
            if (groupRef.current && !groupRef.current.contains(event.target)) {
                setIsOpenGroup(false);
                setInputToggleGroup(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    // const schools = [
    //     'Школа №1',
    //     'Школа №2',
    //     'Школа №3',
    //     'Гимназия №5',
    //     'Лицей №7'
    // ];

    const groups = [
        '10А',
        '10Б',
        '10В',
        '11А',
        '11Б'
    ];


    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
        setIsOpenGroup(false);
    };

    const onDeleteButtton = (item) => {
        console.log(item)
    }

    const inputToggleHandlerGroup = async () => {

        setInputToggleGroup((e) => !e)
        if (inputToggleSchool) {
            setInputToggleSchool(false)
        }
    }


    return (
        <div className="timetable-nav-dropdown-group" ref={groupRef}>
            <button className="timetable-nav-dropdown-group-toggle" onClick={() => setIsOpenGroup(!isOpenGroup)} >
                {selectedGroup}
                <span className="timetable-nav-arrow">▼</span>
            </button>
            {isOpenGroup && (
                <ul className="timetable-nav-dropdown-group-menu">
                    <li onClick={(e) => inputToggleHandlerGroup()} className="timetable-nav-dropdown-group-item timetable-nav-add">
                        <button className='timetable-nav-add-button'><i className="fa-solid fa-plus"></i></button>
                    </li>
                    {inputToggleGroup &&
                        <li className="timetable-nav-dropdown-group-item">
                            <input className='timetable-nav-dropdown-input' type="text" placeholder='Добавить...' />
                        </li>
                    }
                    <li onClick={() => handleGroupSelect("Все группы")} className="timetable-nav-dropdown-group-item">
                        Все группы
                    </li>
                    {groups.map((group, index) => (
                        <li key={index} onClick={() => handleGroupSelect(group)} className="timetable-nav-dropdown-group-item">
                            <p>{group}</p>
                            <button onClick={(e) => onDeleteButtton(group)} className='timetable-nav-delete'><i className="fa-solid fa-minus"></i></button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default TimetableNavGroups