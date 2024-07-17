import React, { useState,useContext} from 'react';
import { Link } from 'react-router-dom'
import profile from '../../images/profile.jpg'
import SpiritscoreComponent from './SpiritscoreComponent';
import '../CSS/TeamInfoandMatches.css'
import {filterMatchesForTeam,getFieldNamesFromFirstObject} from '../../Services/FilterTeams.js'
import { schedulecontext } from '../../Context/context.js';
import { generateButtonLabels } from '../../Services/FilterTeams.js';
import copier from 'lodash'

export default function TeamInfoandMatches({data,close}) {

  const days = generateButtonLabels(2); //days toggler dynamic

  const [isMatch,setisMatch]=useState(true);
  const scheduleDataCopy = copier.cloneDeep(useContext(schedulecontext));
  const scheduleData = filterMatchesForTeam(data.teamdata.name, scheduleDataCopy);
  const fields = getFieldNamesFromFirstObject(scheduleData)

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
  };

//load the user for this teams here using team id and dont forget to use async await to avoid run time errors
 const teamid=data.teamdata.id;

 //sample data
 const players=[
  {
    name: 'Hari',
    sex: 'M',
    role: 'player',
    photourl : profile
  },
  {
    name: 'Annie',
    sex: 'F',
    role: 'Spirit Captain',
    photourl : profile
  },
  {
    name: 'Manju',
    sex: 'F',
    role: 'Captain',
    photourl : profile
  },
  {
    name: 'Raghav',
    sex: 'M',
    role: 'coach',
    photourl : profile
  },
  
 ];


  return (
    <div className="teammatchandinfodiv">
    <div className="Schedulediv">

          <div className='Schedulecontentdiv' style={{marginBottom: '20px'}}>
          <i id='' className="fa-solid fa-xmark" onClick={close} style={{fontSize: '25px',cursor: 'pointer',margin: '0 10px 0 auto'}}></i>
          
          <div style={{height: '96px',width: '96px',padding: '5px',border: '3px solid #9ca1aa69',borderRadius: '50%',margin: '0 auto'}}>
            <img src={profile} alt="" style={{height: '100%',aspectRatio: '1',borderRadius: '50%'}}/>
          </div>
          
          <div className='' style={{padding: '5px 15px 5px 15px' , background: '#f3f4f6',color: 'black', width: 'fit-content',
          fontSize: '12px', borderRadius: '5px',margin: '18px auto 0 auto'}}>Team</div>

          <h3 style={{color : 'black',margin: '8px auto 10px auto', width: '210px',textAlign: 'center',fontWeight: '700',fontSize: '24px'}}>
            {data.teamdata.name}
          </h3>

          <div className='TeamMatchInfonavdiv' >
          <button className={`TeamMatchInfonavbtn ${isMatch?'btnactive': ''}`} onClick={()=>{setisMatch(true)}}>Matches</button>
          <button className={`TeamMatchInfonavbtn ${!isMatch?'btnactive': ''}`} onClick={()=>{setisMatch(false)}}>Roster</button>
          </div>

    {isMatch?(
      days.map((day,ind)=>(
      <div className="matchVSouterdiv" key={ind}>
      <h3 style={{color: '#6b7280'}}>{day}</h3>
      {
          scheduleData.filter(row => Object.values(row).some(field => field?.day === (ind+1)))
          .map((cardvalue,cardindex)=>(
            fields.map((val,index)=>(
              cardvalue.length !==0 && cardvalue[val] && cardvalue[val].match && cardvalue[val].TeamNameandID && cardvalue[val].score && cardvalue[val].day===(ind+1) && (
            <div 
            id={`matchCard-${cardindex}-${index}`}
            className="matchVScard" key={`${cardindex}-${index}`}>

              <div style={{display: 'flex',justifyContent: 'center'}}>
              <h5 style={{padding: '10px 5px',minWidth: '200px',borderRadius: '10px',backgroundColor: '#E6F7F7',textAlign: 'center'}}>{cardvalue[val].match}</h5> 
              </div>

              <div className='datails' style={{display: 'flex',justifyContent: 'center',alignItems: 'center',padding: '5px 0'}}>

              <span style={{flex: '1',maxWidth: '100%',padding: '5px 10px 5px 0',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
              <div className="matchcardprofileimg">
                <img src={profile} alt="" style={{height: '100%',aspectRatio: '1/1',borderRadius: '50%'}}/>
              </div>
                <h5><Link style={{color: 'black', cursor: 'auto',textDecoration: 'none',outline: 'none',WebkitTapHighlightColor: 'transparent'}} >{cardvalue[val].TeamNameandID.A.name}</Link></h5>
              </span>

              <span>VS</span>

              <span style={{flex: '1',maxWidth: '100%',padding: '5px 0 5px 10px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                <h5><Link style={{color: 'black', cursor: 'auto',textDecoration: 'none',outline: 'none',WebkitTapHighlightColor: 'transparent'}}>{cardvalue[val].TeamNameandID.B.name}</Link></h5>
                <div className="matchcardprofileimg">
                <img src={profile} alt="" style={{height: '100%',aspectRatio: '1/1',borderRadius: '50%'}}/>
              </div>
              </span>
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
      ))
    ):(
 
      <div className="teaminfoRosterdiv">
        <div className="teaminfoRoster">
          <h2 style={{color: '#6b7280',textAlign:'center',fontSize:'20px'}}>Players</h2>
          <div>
          {
            players.map((val,index)=>(
              val.role!=='coach' && (<div className="mvpsview" style={{display: 'flex',alignItems: 'center',height: '50px',padding: '5px 0',
                margin: '5px 0',gap: '15px'
              }}
              key={index}>
               <div style={{height: '100%',aspectRatio: '1',padding: '4px',border: '3px solid #9ca1aa69',borderRadius: '50%'}}>
                <img src={val.photourl} alt="" style={{height: '100%',aspectRatio: '1',borderRadius: '50%'}}/>
               </div>
               <div style={{display: 'flex', gap: '10px',alignItems: 'center'}}>
                <h3 style={{fontWeight: '500',color: '#6b7280',fontSize: '17px'}}>{`${val.name} (${val.sex})`}</h3>
                {val.role!=='player'?
                (<span style={{padding: '3px 10px',fontSize: '11px',backgroundColor:`${val.role==='Captain'?'#DEF7EC':'#E1EFFE'}`,
                borderRadius: '25px'}}>{val.role}</span>):''
                }
               </div>
              </div>)

            ))
          }

          </div>
          <h2 style={{color: '#6b7280',textAlign:'center',fontSize:'20px'}}>coaches</h2>
          {
            players.map((val,index)=>(
              val.role==='coach' && (<div className="mvpsview" style={{display: 'flex',alignItems: 'center',height: '50px',padding: '5px 0',
                margin: '5px 0',gap: '15px'
              }}
              key={index}>
               <div style={{height: '100%',aspectRatio: '1',padding: '4px',border: '3px solid #9ca1aa69',borderRadius: '50%'}}>
                <img src={val.photourl} alt="" style={{height: '100%',aspectRatio: '1',borderRadius: '50%'}}/>
               </div>
               <div>
                <h3 style={{fontWeight: '500',color: '#6b7280',fontSize: '17px'}}>{`${val.name} (${val.sex})`}</h3>
               </div>
              </div>)

            ))
          }
        </div>
      </div>
    
    )
}

          
          </div>
          
      </div>
      </div>
  )
}
