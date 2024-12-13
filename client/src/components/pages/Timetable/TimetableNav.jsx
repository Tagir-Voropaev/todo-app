import React, { useEffect, useRef, useState } from 'react'
import '../../../static/css/components/timetable/TimetableNav.css'

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllSchools } from '../../../store/timetable/allSchoolsSlice'
import TimetableNavSchools from './TimetableNavSchools'
import TimetableNavGroups from './TimetableNavGroups'

const TimetableNav = () => {
    const dispatch = useDispatch()
    const [isOpenSchool, setIsOpenSchool] = useState(false);
    const [isOpenGroup, setIsOpenGroup] = useState(false);
    const schoolRef = useRef(null);
    const groupRef = useRef(null);
    const [selectedSchool, setSelectedSchool] = useState('Все школы');
    const [selectedGroup, setSelectedGroup] = useState('Все группы');
    const [inputToggleSchool, setInputToggleSchool] = useState(false);
    const [inputToggleGroup, setInputToggleGroup] = useState(false);

    useEffect(() => {
        dispatch(fetchAllSchools());
    }, [dispatch]);

    const data = useSelector(state => state.allschools);

    // Пример списка школ (в реальном приложении данные могут приходить с сервера)
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Закрытие меню школ
            if (schoolRef.current && !schoolRef.current.contains(event.target)) {
                setIsOpenSchool(false);
                setInputToggleSchool(false);
            }
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

   
    return (
        <nav className='timetable-nav'>
            <div className='timetable-nav-container'>
                <div className="timetable-nav-dropdown">
                    <TimetableNavSchools
                        setIsOpenGroup={setIsOpenGroup}
                        setSelectedGroup={setSelectedGroup} />
                    <TimetableNavGroups
                        setIsOpenSchool={setIsOpenSchool}
                        setSelectedSchool={setSelectedSchool} />
                </div>
            </div>
        </nav>
    )
}

export default TimetableNav