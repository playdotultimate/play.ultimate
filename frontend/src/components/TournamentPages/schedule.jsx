import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import '../CSS/schedule.css'
import profile from '../../images/profile.jpg'
import SpiritscoreComponent from './SpiritscoreComponent';
import TeamInfoandMatches from './TeamInfoandMatches';
import { getFieldNamesFromFirstObject ,generateButtonLabels} from '../../Services/FilterTeams';
import { schedulecontext } from '../../Context/context';

export default function Schedule() {

  const buttonLabels = generateButtonLabels(2); //days toggler dynamic
  const [day,setday]=useState(1)
  const [activeButtonIndex, setActiveButtonIndex]=useState(0)

  // Handler to set the active button
  const handleButtonClick = (index) => {
    setActiveButtonIndex(index);
    setday(index+1)
  };

  //here we got the data from context in TournamentRouter.jsx
  const scheduleData = useContext(schedulecontext);
  
  const fields = getFieldNamesFromFirstObject(scheduleData);

  const matchCardRefs = useRef([]);
  matchCardRefs.current = [];

  // Add refs for matching cards
  const addToRefs = (el) => {
    if (el && !matchCardRefs.current.includes(el)) {
      matchCardRefs.current.push(el);
    }
  };

  const [scrollTarget, setScrollTarget] = useState(null);
  // Effect to scroll to the target match card
  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        const elementRect = element.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        const middle = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
        window.scrollTo({
          top: middle,
          behavior: 'smooth'
        });
        element.classList.add('glow');
        setTimeout(() => {
          element.classList.remove('glow');
        }, 2000); // Duration of the glow effect
        setScrollTarget(null); // Reset scroll target
      }
    }
  }, [scrollTarget]);


  const [showspiritscore,setshowspiritscore]=useState(false);
  const [spiritdata,setspiritdata]=useState(null);

  const handleShow = (score,mvp,team) => {
    const data={score,mvp,team};
    setspiritdata(data);
    setshowspiritscore(true)
    document.body.style.overflow = 'hidden'; // Disable scrolling on the main content
  };

  const handleClose = () => {
    setspiritdata(null);
    setshowspiritscore(false);
    document.body.style.overflow = 'auto'; // Enable scrolling on the main content
  };

  //matches and teaminfo
  const [showTeammatchesandinfo,setTeammatchesandinfo]=useState(false);
  const [teammatchinfodata,setteammatchinfodata]=useState(null);

  const handleShowteaminfo = (teamdata) => {
    const data={teamdata};
    setteammatchinfodata(data);
    setTeammatchesandinfo(true)
    document.body.style.overflow = 'hidden'; // Disable scrolling on the main content
  };

  const handlecloseteaminfo = () => {
    setspiritdata(null);
    setTeammatchesandinfo(false);
    document.body.style.overflow = 'auto'; // Enable scrolling on the main content
  };

  const { name }=useParams();

  return (
    <div className="Schedulediv">

          <div className='Schedulecontentdiv'>

          <div className='schedulemininav'><Link to='/tournaments' className='schedulemininavbtns'><i className="fa-solid fa-trophy"></i> All Tournaments</Link>
          <div style={{fontWeight: '600',color: '#9a9a9dda'}}>{'>'}</div><Link to={`/tournaments/${name}`} className='schedulemininavbtns'>{name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('-')}</Link>
          </div>
           
          <h3 style={{color : 'black',margin: '0 auto 10px auto', width: '210px',textAlign: 'center',fontWeight: '800',fontSize: '24px'}}>Schedule</h3>

          <div className='scheduletablediv'>
          <div className='scheduletablenavdiv'>
            {buttonLabels.map((label, index) => (
               <button
                key={index}
                className={`scheduletablenavbtn ${index === activeButtonIndex ? 'btnactive' : ''}`}
                onClick={() => handleButtonClick(index)}
                >
                {label}
               </button>
               ))}
          </div>
            <div className='scheduletableouterdiv'>
              <table className='scheduletable'>
                <thead className='scheduletablehead'>
                  <tr>
                    <th style={{ width: '24px', minWidth: '75px', fontWeight: '700', fontSize: '13px' }}>TIME</th>
                    {fields.map((field, index) => (
                      <th key={index} style={{ width: '38px', minWidth: '120px', fontWeight: '700', fontSize: '13px' }}>
                        {field}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='scheduletablebody'>
                  {scheduleData.filter(row => Object.values(row).some(field => field?.day === day))
                  .map((row, rowIndex) => (
                    <tr key={rowIndex} className='scheduletablerow'>
                      <th style={{ padding: '8px' }}>
                        <h6>{row.time.start}</h6>
                        <hr />
                        <h6 style={{ color: '#6b7280' }}>{row.time.end}</h6>
                      </th>
                      {fields.map((field, fieldIndex) => (
                        <td key={fieldIndex} >
                          {row[field] && row[field].match && row[field].score && row[field].day===day &&(
                          <div
                          ref={addToRefs} 
                          style={{ backgroundColor: '#E6F7F7', borderRadius: '5px', padding: '8px',cursor: 'pointer' }}
                          onClick={() => setScrollTarget(`matchCard-${rowIndex}-${fieldIndex}`)} >
                            <h6>{row[field].match}</h6>
                            <h6>{row[field].standing.A} v {row[field].standing.B}</h6>
                          </div>)
                          }
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>       
                </div>     
             </div>

          <div className="matchVSouterdiv">
    {scheduleData.filter(row => Object.values(row).some(field => field?.day === day))
      .map((cardvalue,cardindex)=>(
        fields.map((val,index)=>(
          cardvalue.length !==0 && cardvalue[val] && cardvalue[val].match && cardvalue[val].TeamNameandID && cardvalue[val].score && cardvalue[val].day===day && (
            <div 
            id={`matchCard-${cardindex}-${index}`}
            ref={addToRefs}
            className="matchVScard" key={`${cardindex}-${index}`}>

              <div style={{display: 'flex',justifyContent: 'center'}}>
              <h5 style={{padding: '10px 5px',minWidth: '200px',borderRadius: '10px',backgroundColor: '#E6F7F7',textAlign: 'center'}}>{cardvalue[val].match}</h5> 
              </div>

              <div className='datails' style={{display: 'flex',justifyContent: 'center',alignItems: 'center',padding: '5px 0'}}>

              <span style={{flex: '1',maxWidth: '100%',padding: '5px 10px 5px 0',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              <div className="matchcardprofileimg">
                <img src={profile} alt="" style={{height: '100%',aspectRatio: '1/1',borderRadius: '50%'}}/>
              </div>
                <h5><Link style={{color: 'black'}} onClick={()=>{handleShowteaminfo(cardvalue[val].TeamNameandID.A)}}>{cardvalue[val].TeamNameandID.A.name}</Link></h5>
              </span>

              <span>VS</span>

              <span style={{flex: '1',maxWidth: '100%',padding: '5px 0 5px 10px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                <h5><Link style={{color: 'black'}} onClick={()=>{handleShowteaminfo(cardvalue[val].TeamNameandID.B)}}>{cardvalue[val].TeamNameandID.B.name}</Link></h5>
                <div className="matchcardprofileimg">
                <img src={profile} alt="" style={{height: '100%',aspectRatio: '1/1',borderRadius: '50%'}}/>
              </div>
              </span>
              {showTeammatchesandinfo && <TeamInfoandMatches data={teammatchinfodata} close={handlecloseteaminfo}/>}
              </div>
             {/*  score of the teams */}
              <div style={{textAlign: 'center'}}>
                <span><h3 style={{display: 'inline',margin: '5px 20px 5px 20px',color: `${cardvalue[val].score.A > cardvalue[val].score.B ? 'green': 'red'}`}}>
                {cardvalue[val].score.A}</h3></span>
                <span><h3 style={{display: 'inline'}}>-</h3></span>
                <span><h3 style={{display: 'inline',margin: '5px 20px 5px 20px',color: `${cardvalue[val].score.B > cardvalue[val].score.A ? 'green': 'red'}`}}>
                {cardvalue[val].score.B}</h3></span>
              </div>

              <div style={{textAlign: 'center'}}>
                <p style={{ color: '#6b7280',fontSize: 'medium',padding: '5px 10px'}}>{`${val} | ${cardvalue.time.start} | ${cardvalue.time.end} | 25 MIN`}</p>
              </div>

              <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',padding: '5px 0'}} >
                <div style={{display: 'flex',justifyContent: 'center',alignItems: 'center',gap: '10px',padding: '6px 8px',backgroundColor: '#E6F7F7',borderRadius: '25px',cursor: 'pointer',textDecoration: 'none',outline: 'none',WebkitTapHighlightColor: 'transparent'}}
                onClick={()=>{handleShow(cardvalue[val].spiritscore,cardvalue[val].MVP,cardvalue[val].TeamNameandID)}}>
                  <h6 style={{borderRadius: '10px',backgroundColor: '#91EFEF',textAlign: 'center',padding: '2px 10px'}}>SoTG</h6>
                  <h6 style={{padding: '2px 0',fontWeight: '500'}}>{Object.values(cardvalue[val].spiritscore.A).reduce((acc, curr) => acc + curr, 0)} - {Object.values(cardvalue[val].spiritscore.B).reduce((acc, curr) => acc + curr, 0)}</h6>
                </div>
              </div>
              {showspiritscore && <SpiritscoreComponent close={handleClose} data={spiritdata}/>}
            </div>
        )
            ))
         ))
        }            

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
