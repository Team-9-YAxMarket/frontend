import style from './ProblemButtonsList.module.css'
import React from 'react'

const ProblemButtonsList = ({ list, onClick }) => {
  return (
    <ul className={style.list}>
      {list.map((item) => (
        <li key={item.id} className={style.listItem} onClick={onClick}>{item.title}</li>
      ))}
    </ul>
  )
}

export default ProblemButtonsList
