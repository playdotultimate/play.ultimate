import React from 'react'
import '../CSS/TournamentHomePage.css'
import { useParams , Link} from 'react-router-dom';
import TournamentStandingTable from './TournamentStandingTable';

export default function TournamentHomePage() {
  const { name} = useParams();
  const serchkey=name.split('-').join(' ').toLowerCase();
  //this part for axios api call 
 /*  NOTE: 👋 use name(serchkey) of useparams for as tournament id or searching key and it should be unique
   and name of the tournament should always be pushed lowercase */
  const tournament=[
    {
      Name: 'Bengaluru Fast5 Mixer',
      date: 'January 20, 2024',
      place: 'Bengaluru,IND',
      state: 'Completed'
    },
    {
      Name: 'NCR Fast5 Mixer',
      date: 'July 22, 2023',
      place: 'NCR,IND',
      state: 'Completed'
    },
    {
      Name: 'Bengaluru Fast5 Open',
      date: 'June 10, 2023',
      place: 'Bengaluru,IND',
      state: 'Completed'
    }
  ]
  const value=tournament.find(tour=>tour.Name.toLowerCase() === name.split('-').join(' '))

  //this part for axios api call

  return (
      <div className="tournamenthome">

          <div className='tourHomecontentdiv'>

          <div className='tourmininav'><Link to='/tournaments' className='tourmininavbtn'><i className="fa-solid fa-trophy"></i> All Tournaments</Link></div>
           
           <div id='tourdetailshead'>
             <h1 style={{margin: '0 0 10px 0'}}>{value.Name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
             <p style={{color : '#6b7280',margin: '0 0 5px 0'}}>{value.place}</p>
             <p style={{color : '#6b7280',margin: '0 0 5px 0'}}>{value.date}</p>
             <div className='' style={{padding: '5px 8px 5px 8px' , background: '#f3f4f6',color: 'black', width: 'fit-content',
          fontSize: '12px', borderRadius: '5px',margin: '20px auto 10px auto'}}>{value.state}</div>
           </div>

           <div className='schedulestandrulesdiv'>

           <Link to={`schedule`} className='schedulestandrulesdivlink'>
           <h3 style={{margin: '0 0 7px 0'}}>Schedule</h3>
           <p style={{color : '#6b7280',margin: '0 0 5px 0'}}>View the detailed schedule of matches</p>
           </Link>

           <Link to={`standing`} className='schedulestandrulesdivlink'>
           <h3 style={{margin: '0 0 7px 0'}}>Standings</h3>
           <p style={{color : '#6b7280',margin: '0 0 5px 0'}}>View the pools, brackets and the detailed standings</p>
           </Link>

           <Link to={`rules`} className='schedulestandrulesdivlink'>
           <h3 style={{margin: '0 0 7px 0'}}>Rules & Format</h3>
           <p style={{color : '#6b7280',margin: '0 0 5px 0'}}>View the detailed rules and format of the tournament</p>
           </Link>

           </div>
             
            <div className='tourhomeoverallstandings'>
              <h3 style={{color : '#6b7280',margin: '0 auto 10px auto', width: '210px',textAlign: 'center'}}>OverAll Standings</h3>
              
             <TournamentStandingTable/>

            </div>

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
