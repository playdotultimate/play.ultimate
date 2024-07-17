import React from 'react'
import '../CSS/SpiritscoreComponent.css'
import img from '../../images/profile.jpg'

export default function SpiritscoreComponent({close,data}) {
  return (
    <div className='spiritscoreBackdrop'>

    <div className='spiritscorecontentdiv'>
        <div className='spiritscoreTablediv'>
          <div style={{display: 'flex',justifyContent: 'space-between',alignItems: 'center',borderBottom: '1px solid #dadde3',
            padding: '15px 15px'
          }}>
            <h3 style={{fontWeight: '500'}}>Spirit Score & MVP</h3>
            <i id='' className="fa-solid fa-xmark" onClick={close} style={{fontSize: '20px',cursor: 'pointer'}}></i>
          </div>

          <h3 style={{textAlign: 'center',padding: '10px'}}>Spirit Scores</h3>

          <table>
            <thead>
            <tr style={{backgroundColor: '#f3f4f6',height: '37px'}}>
              <th style={{fontSize: '13px',textAlign: 'left'}}>SPIRIT CRITERIA</th>
              <th style={{fontSize: '13px'}}>{data.team.A.name}</th>
              <th style={{fontSize: '13px'}}>{data.team.B.name}</th>
            </tr>
            </thead>
            <tbody>

             <tr style={{height: '50px'}}>
              <th style={{fontSize: '13px',textAlign: 'left'}}>Rules Knowledge & Use</th>
              <td>{data.score.A.a}</td>
              <td>{data.score.B.a}</td>
             </tr>
             <tr style={{height: '50px'}}>
             <th style={{fontSize: '13px',textAlign: 'left'}}>Fouls & Body Contact</th>
              <td>{data.score.A.b}</td>
              <td>{data.score.B.b}</td>
             </tr>
             <tr style={{height: '50px'}}>
             <th style={{fontSize: '13px',textAlign: 'left'}}>Fair-Mindedness</th>
              <td>{data.score.A.c}</td>
              <td>{data.score.B.c}</td>
             </tr>
             <tr style={{height: '50px'}}>
             <th style={{fontSize: '13px',textAlign: 'left'}}>Positive Attitude & Self-Control</th>
              <td>{data.score.A.d}</td>
              <td>{data.score.B.d}</td>
             </tr>
             <tr style={{height: '50px'}}>
             <th style={{fontSize: '13px',textAlign: 'left'}}>Communication</th>
              <td>{data.score.A.e}</td>
              <td>{data.score.B.e}</td>
             </tr>

            </tbody>
          </table>
          <h3 style={{textAlign: 'center',padding: '10px'}}>MVPs</h3>

          <div className="mvpsdiv" >
          
          <div className="mvpsview" style={{display: 'flex',alignItems: 'center',height: '60px',padding: '5px 0',
            margin: '5px 10px',gap: '15px'
          }}>
           <div style={{height: '100%',aspectRatio: '1',padding: '4px',border: '3px solid #9ca1aa69',borderRadius: '50%'}}>
            <img src={img} alt="" style={{height: '100%',aspectRatio: '1',borderRadius: '50%'}}/>
           </div>
           <div>
            <h3 style={{fontWeight: '500',color: '#6b7280',fontSize: '17px'}}>{data.mvp.A.name}</h3>
            <h4 style={{fontWeight: '500',color: '#6b7280',fontSize: '14px'}}>{data.team.A.name}</h4>
           </div>
          </div>

          <div className="mvpsview" style={{display: 'flex',alignItems: 'center',height: '60px',padding: '5px 0',
            margin: '5px 10px',gap: '15px'
          }}>
           <div style={{height: '100%',aspectRatio: '1',padding: '4px',border: '3px solid #9ca1aa69',borderRadius: '50%'}}>
            <img src={img} alt="" style={{height: '100%',aspectRatio: '1',borderRadius: '50%'}}/>
           </div>
           <div>
            <h3 style={{fontWeight: '500',color: '#6b7280',fontSize: '17px'}}>{data.mvp.B.name} </h3>
            <h4 style={{fontWeight: '500',color: '#6b7280',fontSize: '14px'}}>{data.team.B.name}</h4>
           </div>
          </div>
           
          </div>
        
        </div>
    </div>

    </div>
  )
}
