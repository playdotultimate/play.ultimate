import React, { useState } from 'react'
import '../CSS/TournamentStandingTable.css'
import profile from "../../images/profile.jpg"
import TeamInfoandMatches from './TeamInfoandMatches';
import { useParams } from 'react-router-dom';

export default function TournamentStandingTable() {

  const buttonLabels = ['Final','Initial','SoTG']; 
  const [navlabel,setnavlabel]=useState('Final');
  const [activeButtonIndex, setActiveButtonIndex]=useState(0)
  const handleButtonClick = (index,label) => {
    setnavlabel(label)
    setActiveButtonIndex(index);
  };

  const { name }=useParams();
  const serchkey=name.split('-').join(' ').toLowerCase();
  
 //cal API fro getting below data use serchkey of the tournament we get from useParams to search teams detail
  const teams = [
    { seed: 1, name: "Disc-O-Deewane", wins: 4, losses: 0, gd: 27, pool: 'A' ,teamid:123,finalstand: 1,initialstand: 1,spiritstand: 8},
    { seed: 3, name: "Sloppiest Discs", wins: 3, losses: 1, gd: 24, pool: 'A',teamid:123,finalstand: 2,initialstand: 3,spiritstand: 7},
    { seed: 2, name: "Hammers", wins: 2, losses: 2, gd: -1, pool: 'B',teamid:123 ,finalstand: 3,initialstand: 2,spiritstand: 6},
    { seed: 4, name: "Sloppy Discs", wins: 1, losses: 3, gd: -7, pool: 'B' ,teamid:123,finalstand: 5,initialstand: 4,spiritstand: 9},
    { seed: 5, name: "Sultans Of Swing", wins: 0, losses: 4, gd: -43, pool: 'A' ,teamid:123,finalstand: 4,initialstand: 5,spiritstand: 5},
    { seed: 6, name: "DISC'PERSION", wins: 0, losses: 4, gd: -43, pool: 'B' ,teamid:123,finalstand: 6,initialstand: 6,spiritstand: 4.5},
    { seed: 7, name: "Ulsoor Lakers", wins: 0, losses: 4, gd: -43, pool: 'B' ,teamid:123,finalstand: 7,initialstand: 7,spiritstand: 3}


];//sort the array with initial and final when querying to the database

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
        <div className='standingtablediv'>

          <div className="standtablenavdiv">
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
          
  <div className='standingtableouterdiv'>
    <table className='standingtable'>
      <tbody>
        {navlabel==='Final' && (teams.sort((a,b)=>a.finalstand-b.finalstand).map((row, index) => (
          <tr key={index} className='standingtablerow'>
            <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
              {row.finalstand}
            </td>
            <td className='standingtablescells'>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className='profiledivstand'>
                  <img src={profile} alt="" />
                </div>
                <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300',cursor: 'pointer' }} onClick={()=>{handleShowteaminfo(row.name,row.teamid)}}>
                  {row.name}
                </span>
              </div>
            </td>
            <td className='standingtablescells' style={{textAlign: 'center'}}>
              {/* Additional cell content can be added here */}
            </td>
          </tr>
        )))
        }
        
        {navlabel==='Initial' && (teams.sort((a,b)=>a.initialstand-b.initialstand).map((row, index) => (
          <tr key={index} className='standingtablerow'>
            <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
              {row.initialstand}
            </td>
            <td className='standingtablescells'>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className='profiledivstand'>
                  <img src={profile} alt="" />
                </div>
                <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300',cursor: 'pointer' }} onClick={()=>{handleShowteaminfo(row.name,row.teamid)}}>
                  {row.name}
                </span>
              </div>
            </td>
            <td className='standingtablescells' style={{textAlign: 'center'}}>
              {/* Additional cell content can be added here */}
            </td>
          </tr>
        )))
        }

        {navlabel==='SoTG' && (teams.sort((a,b)=>b.spiritstand-a.spiritstand).map((row, index) => (
          <tr key={index} className='standingtablerow'>
            <td className='standingtablescells' style={{ textAlign: 'center', color: '#6b7280', fontWeight: '300' }}>
              {index+1}
            </td>
            <td className='standingtablescells'>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div className='profiledivstand'>
                  <img src={profile} alt="" />
                </div>
                <span to={row.link} style={{ margin: '0', color: '#6b7280', fontWeight: '300',cursor: 'pointer' }} onClick={()=>{handleShowteaminfo(row.name,row.teamid)}}>
                  {row.name}
                </span>
              </div>
            </td>
            <td className='standingtablescells' style={{textAlign: 'center',color: '#6b7280'}}>
              {row.spiritstand}
            </td>
          </tr>
        )))
        }

      </tbody>
    </table>
    {showTeammatchesandinfo && <TeamInfoandMatches data={teammatchinfodata} close={handlecloseteaminfo}/>}
         </div>
            
        </div>
      );
}
