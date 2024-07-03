import React, { useState } from 'react'
import './CSS/TournamentsPage.css'
import { Link } from 'react-router-dom'

export default function TournamentsPage() {

  const [tournament,settournament]=useState([
    {
      Name: 'Bengaluru Fast5 Mixer',
      date: 'January 20, 2024',
      place: 'Bengaluru',
      state: 'Completed'
    },
    {
      Name: 'NCR Fast5 Mixer',
      date: 'July 22, 2023',
      place: 'NCR',
      state: 'Completed'
    },
    {
      Name: 'Bengaluru Fast5 Open',
      date: 'June 10, 2023',
      place: 'Bengaluru',
      state: 'Completed'
    }
  ])
const Goto=(value)=>{
  console.log(value)
}
  return (
    <div className="tournament">
        <div id='heading'><h1>Tournaments</h1></div>
        <div className='tourcontentdiv'>
     {
       tournament.map((value,index)=>(
        <div className="tourcard" key={index} onClick={()=>{Goto(value.Name)}}>
          <div className="">
          <h3 className="" style={{marginBottom: '5px'}}>{value.Name}</h3>
          <p className="" style={{marginBottom: '3px'}}>{value.date}</p>
          <p style={{marginBottom: '10px',color: '#6E6E6E'}}>{value.place} <i className="fas fa-map-marker-alt"></i></p>
          <div className='' style={{padding: '5px 8px 5px 8px' , background: '#111827',color: 'white', width: 'fit-content',
          fontSize: '12px', borderRadius: '5px'}}>{value.state}</div>
          </div>
       </div>
    ))      
   }
        </div>
        <footer id='tourfooter'>
          <p style={{ margin: '0 20px 0 20px'}} >&copy; 2024 play.ultimate.</p>
          <div style={{display: 'flex', gap: '20px', margin: '0 20px 0 20px'}}>
          <Link className='tflinks' to={''}>About</Link>
          <Link className='tflinks' to={''}>Email Us</Link><Link className='tflinks' to={''}>WhatsApp Us</Link>
          </div>
        </footer>
    </div>
  )
}
