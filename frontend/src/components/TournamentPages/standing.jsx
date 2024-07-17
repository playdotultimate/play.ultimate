import React ,{useState}from 'react'
import { Link ,useParams} from 'react-router-dom';
import '../CSS/standing.css'
import TeamInfoandMatches from './TeamInfoandMatches';
import { getUniquePools,filterTeams } from '../../Services/FilterTeams';
import profile from '../../images/profile.jpg'

export default function Standing() {

  const { name }=useParams();
  const serchkey=name.split('-').join(' ').toLowerCase();
  

  const buttonLabels = ['Pools','Cross Pools','Brackets']; 
  const [navlabel,setnavlabel]=useState('Pools');
  const [activeButtonIndex, setActiveButtonIndex]=useState(0)
  const handleButtonClick = (index,label) => {
    setnavlabel(label)
    setActiveButtonIndex(index);
  };

  //cal API fro getting below data use serchkey of the tournament we get from useParams to search teams detail
  const teams = [
    { seed: 1, name: "Disc-O-Deewane", wins: 4, losses: 0, gd: 27, pool: 'A' ,teamid:123,currentstand: 1,initialstand: 1},
    { seed: 3, name: "Sloppiest Discs", wins: 3, losses: 1, gd: 24, pool: 'A',teamid:123,currentstand: 2,initialstand: 3},
    { seed: 2, name: "Hammers", wins: 2, losses: 2, gd: -1, pool: 'B',teamid:123 ,currentstand: 3,initialstand: 2},
    { seed: 4, name: "Sloppy Discs", wins: 1, losses: 3, gd: -7, pool: 'B' ,teamid:123,currentstand: 5,initialstand: 4},
    { seed: 5, name: "Sultans Of Swing", wins: 0, losses: 4, gd: -43, pool: 'A' ,teamid:123,currentstand: 4,initialstand: 5},
    { seed: 6, name: "DISC'PERSION", wins: 0, losses: 4, gd: -43, pool: 'B' ,teamid:123,currentstand: 6,initialstand: 6},
    { seed: 7, name: "Ulsoor Lakers", wins: 0, losses: 4, gd: -43, pool: 'B' ,teamid:123,currentstand: 7,initialstand: 7,spiritstand: 3}

];

//brackets

const brackets=[
  {start: 1,end:3},
  {start: 4,end:5},
  {start: 6,end:7}
]

//team match info
const [showTeammatchesandinfo,setTeammatchesandinfo]=useState(false);
const [teammatchinfodata,setteammatchinfodata]=useState(null);

const handleShowteaminfo = (teamname,teamid) => {
  const data={teamdata:{name:teamname,id:teamid}};
  setteammatchinfodata(data);
  setTeammatchesandinfo(true)
  document.body.style.overflow = 'hidden'; // Disable scrolling on the main content
};

const handlecloseteaminfo = () => {
  setTeammatchesandinfo(false);
  document.body.style.overflow = 'auto'; // Enable scrolling on the main content
};



  return (

    <div className="Schedulediv">

    <div className='Schedulecontentdiv'>

    <div className='schedulemininav'><Link to='/tournaments' className='schedulemininavbtns'><i className="fa-solid fa-trophy"></i> All Tournaments</Link>
    <div style={{fontWeight: '600',color: '#9a9a9dda'}}>{'>'}</div><Link to={`/tournaments/${name}`} className='schedulemininavbtns'>{name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</Link>
    </div>
     
    <h3 style={{color : 'black',margin: '0 auto 10px auto', width: '210px',textAlign: 'center',fontWeight: '800',fontSize: '24px'}}>Standings</h3>

    <div className='scheduletablediv'>
    <div className='scheduletablenavdiv'>
      {buttonLabels.map((label, index) => (
         <button
          key={index}
          className={`scheduletablenavbtn ${index === activeButtonIndex ? 'btnactive' : ''}`}
          onClick={() => handleButtonClick(index,label)}
          style={{width: 'fit-content',padding: '0 10px 0 10px'}}
          >
          {label}
         </button>
         ))}
    </div>
    <div className='pooltabledivouter'>
    
   { navlabel==='Pools' && (
   getUniquePools(teams).map((val,index)=>(
     <div key={index}><h3 style={{ textAlign: 'center', margin: '20px 0' ,fontWeight: '500',color: '#6b7280'}}>Pool {val}</h3>
     <div className='pooltablewrapper'>
       <table style={{ borderCollapse: 'collapse', width: '100%' }}>
         <thead>
           <tr style={{ height: '37px' }}>
             <th style={{ textAlign: 'left', borderTopLeftRadius: '15px' }}>Seed</th>
             <th style={{ textAlign: 'left' }}>Team</th>
             <th style={{ textAlign: 'left' }}>W</th>
             <th style={{ textAlign: 'left' }}>L</th>
             <th style={{ textAlign: 'left', borderTopRightRadius: '15px' }}>GD</th>
           </tr>
         </thead>
         <tbody>
           {teams.sort((a,b)=>a.seed-b.seed).map(team => (
             team.pool===val && <tr key={team.seed} style={{ height: '52px' }}>
               <td>{team.seed}</td>
               <td><span style={{cursor: 'pointer'}} onClick={()=>{handleShowteaminfo(team.name,team.teamid)}}>{team.name}</span></td>
               <td>{team.wins}</td>
               <td>{team.losses}</td>
               <td>{team.gd}</td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
     {showTeammatchesandinfo && <TeamInfoandMatches data={teammatchinfodata} close={handlecloseteaminfo}/>}
     </div>
   ))
  )
   }

   { navlabel==='Cross Pools' && (
      <>
      <h3 style={{ textAlign: 'center', margin: '20px 0', fontWeight: '700', color: '#6b7280' }}>Initial Standing</h3>
      <div className='standingtableouterdiv' style={{ width: '100%' }}>
        <table className='standingtable'>
          <tbody>
            {teams.sort((a, b) => a.initialstand - b.initialstand).map((row, index) => (
              <tr key={index} className='standingtablerow'>
                <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
                  {row.initialstand}
                </td>
                <td className='standingtablescells'>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div className='profiledivstand'>
                      <img src={profile} alt="" />
                    </div>
                    <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300', cursor: 'pointer' }} onClick={() => { handleShowteaminfo(row.name, row.teamid); } }>
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className='standingtablescells' style={{ textAlign: 'center' }}>
                  {/* Additional cell content can be added here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ textAlign: 'center', margin: '20px 0', fontWeight: '700', color: '#6b7280' }}>Current Standing</h3>
      <div className='standingtableouterdiv' style={{ width: '100%' }}>
        <table className='standingtable'>
          <tbody>
            {teams.sort((a, b) => a.currentstand - b.currentstand).map((row, index) => (
              <tr key={index} className='standingtablerow'>
                <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
                  {row.currentstand}
                </td>
                <td className='standingtablescells'>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <div className='profiledivstand'>
                      <img src={profile} alt="" />
                    </div>
                    <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300', cursor: 'pointer' }} onClick={() => { handleShowteaminfo(row.name, row.teamid); } }>
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className='standingtablescells' style={{ textAlign: 'center' }}>
                  {/* Additional cell content can be added here */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showTeammatchesandinfo && <TeamInfoandMatches data={teammatchinfodata} close={handlecloseteaminfo} />}
      </div>
      </>

   )
   }

{ navlabel==='Brackets' && (
  brackets.map((val,ind)=>(
   <div key={ind}>
   <h3 style={{ textAlign: 'center', margin: '20px 0', fontWeight: '700', color : 'black' }}>{`[ Bracket ${val.start}-${val.end} ]`}</h3>
   <h3 style={{ textAlign: 'center', margin: '20px 0', fontWeight: '400', color: '#6b7280' }}>Initial Standing</h3>
   <div className='standingtableouterdiv' style={{ width: '100%' }}>
     <table className='standingtable'>
       <tbody>
         {filterTeams(teams,val.start,val.end,0).sort((a, b) => a.initialstand - b.initialstand).map((row, index) => (
           <tr key={index} className='standingtablerow'>
             <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
               {row.initialstand}
             </td>
             <td className='standingtablescells'>
               <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <div className='profiledivstand'>
                   <img src={profile} alt="" />
                 </div>
                 <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300', cursor: 'pointer' }} onClick={() => { handleShowteaminfo(row.name, row.teamid); } }>
                   {row.name}
                 </span>
               </div>
             </td>
             <td className='standingtablescells' style={{ textAlign: 'center' }}>
               {/* Additional cell content can be added here */}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
   </div>

   <h3 style={{ textAlign: 'center', margin: '20px 0', fontWeight: '400', color: '#6b7280' }}>Current Standing</h3>
   <div className='standingtableouterdiv' style={{ width: '100%' }}>
     <table className='standingtable'>
       <tbody>
         {filterTeams(teams,val.start,val.end,1).sort((a, b) => a.currentstand - b.currentstand).map((row, index) => (
           <tr key={index} className='standingtablerow'>
             <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
               {row.currentstand}
             </td>
             <td className='standingtablescells'>
               <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <div className='profiledivstand'>
                   <img src={profile} alt="" />
                 </div>
                 <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300', cursor: 'pointer' }} onClick={() => { handleShowteaminfo(row.name, row.teamid); } }>
                   {row.name}
                 </span>
               </div>
             </td>
             <td className='standingtablescells' style={{ textAlign: 'center' }}>
               {/* Additional cell content can be added here */}
             </td>
           </tr>
         ))}
       </tbody>
     </table>
     {showTeammatchesandinfo && <TeamInfoandMatches data={teammatchinfodata} close={handlecloseteaminfo} />}
   </div>
   </div>
    ))
  )
   }

</div>
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
