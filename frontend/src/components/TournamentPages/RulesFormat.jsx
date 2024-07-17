import React from 'react'
import { Link ,useParams} from 'react-router-dom'

export default function RulesFormat() {

  const { name }=useParams();

  return (
    <div className="Schedulediv">

    <div className='Schedulecontentdiv'>

    <div className='schedulemininav'><Link to='/tournaments' className='schedulemininavbtns'><i className="fa-solid fa-trophy"></i> All Tournaments</Link>
    <div style={{fontWeight: '600',color: '#9a9a9dda'}}>{'>'}</div><Link to={`/tournaments/${name}`} className='schedulemininavbtns'>{name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</Link>
    </div>
     
    <h3 style={{color : 'black',margin: '0 auto 10px auto', width: '210px',textAlign: 'center',fontWeight: '800',fontSize: '24px'}}>Rules & Format</h3>
    
    <h4 style={{color : 'black',margin: '20px auto 10px auto', width: '210px',textAlign: 'center',fontWeight: '700',fontSize: '20px'}}>Format</h4>

    <table className="w-full text-sm text-left rtl:text-right text-gray-500 mb-5 border-collapse mt-4">
    <thead className="text-xs text-gray-700 uppercase bg-light-green ">
        <tr>
            <th className="px-6 py-3"><strong>Stage</strong></th>
            <th className="px-6 py-3"><strong>Description</strong></th>
        </tr>
    </thead>
    <tbody>
        <tr className="bg-white " style={{borderBottom: '1px solid #ebecf0'}}>
            <td className="px-6 py-4 font-medium"><strong>Pool Games</strong></td>
            <td className="px-6 py-4 font-medium">1-10 (2 Pools of 5). Re-seed within pools only. 25-minute games. 4 per team.</td>
        </tr>
        <tr className="bg-white" style={{borderBottom: '1px solid #ebecf0'}}>
            <td className="px-6 py-4 font-medium"><strong>Cross-Pool</strong></td>
            <td className="px-6 py-4 font-medium">1-10 -{'>'} 25-minute game. 1 per team.</td>
        </tr>
        <tr className="bg-white" style={{borderBottom: '1px solid #ebecf0'}}>
            <td className="px-6 py-4 font-medium"><strong>Bracket</strong></td>
            <td className="px-6 py-4 font-medium">1-4, 5-8, 9-10 -{'>'} Winner takes higher seed. 75-minute games. 1 per team: Semi-final, Final/Position.</td>
        </tr>
    </tbody>
   </table>
   
   <h4 style={{color : 'black',margin: '0 auto 20px auto', width: '210px',textAlign: 'center',fontWeight: '700',fontSize: '20px'}}>Rules</h4>
   
   <div className="w-full px-6 pb-7">
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">The Field</h2>
        <p className='text-gray-500'>A rectangular shape with end zones at each end. A field is ideally 40 meters long by 20 meters wide, with end zones 5 meters deep.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Scoring</h2>
        <p className='text-gray-500'>Each time the offense catches a pass in the defense’s end zone, the offense scores a point. Side is switched in the second half only, and not after every point. After a point is scored by a team, the other team takes the disc to the nearest point on the goal line and starts play.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Starting and Restarting Play</h2>
        <p className='text-gray-500'>25 minutes game. 12 minutes half, one minute half time to switch sides. Each half begins from the centre of the field. Offense and defense players establish position on field before play is started.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Movement of the Disc</h2>
        <p className='text-gray-500'>The disc may be advanced in any direction by completing a pass to a teammate. Players may not run with the disc. The person with the disc (thrower) has 5 seconds to throw the disc. The defender guarding the thrower (marker) counts out the stall count.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Change of Possession</h2>
        <p className='text-gray-500'>When a pass is not completed (e.g. out of bounds, drop, block, interception, stalled), the defense immediately takes possession of the disc and becomes the offense. The offense team has 10 seconds to pick up the disc.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Substitutions</h2>
        <p className='text-gray-500'>Substitutes may replace outfield players at any time during the game through the substitution zone at the sideline.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Non Contact</h2>
        <p className='text-gray-500'>Players must attempt to avoid physical contact during play.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Fouls, Violation, Infractions and Time Outs</h2>
        <p className='text-gray-500'>All rules are the same as Ultimate. Accept or Contest within 10 seconds. No Timeouts.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Self-Officiating</h2>
        <p className='text-gray-500'>Players are responsible for their own foul and line calls. Players resolve their own disputes.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Spirit of the Game</h2>
        <p className='text-gray-500'>The Spirit of the Game is the foundation for the rules in Fast5, which places the responsibility for fair play on the players and teams. Competitive play is encouraged, but never at the expense of respect between players, adherence to the rules, and the basic joy of play.</p>
      </section>
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
