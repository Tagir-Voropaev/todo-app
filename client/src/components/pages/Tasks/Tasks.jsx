import React, { useEffect, useState } from 'react'
import s from '../../../static/css/components/tasks/tasks.module.scss'
import TasksContent from './TasksContent';
const Tasks = () => {
    const categories = ['Категория 1', 'Категория 2', 'Категория 3', 'Категория 4', 'Категория 5'];
    const [activeCategory, setActiveCategory] = useState(categories[0]);
    const toggleHandler = (e) => {

        setActiveCategory(e.target.textContent);
    }
    return (
        <div className={s.tasks}>
            <div className={s.categories}>
                <div className={s.categoriesList}>
                    {categories.map((category, index) => (
                        <button onClick={toggleHandler} key={index} className={`${s.categoryItem} ${activeCategory === category ? `${s.activeCategory}` : ''}`}>
                            <p>{category}</p>
                        </button>
                    ))}
                </div>
                <select className={s.categoriesListMobile}>
                    {categories.map((category, index) => (
                        <option value={category} key={index}>{category}</option>
                    ))}
                </select>
                <div className={s.settings}>
                    <button className={s.settingsButton}>
                        <i className={`${s.settingsIcon} fa-solid fa-gear`}></i>
                    </button>
                </div>
            </div>
            <TasksContent />
        </div>
    )
}

export default Tasks;