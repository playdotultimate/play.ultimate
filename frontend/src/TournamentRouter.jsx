import React from 'react';
import { useParams } from 'react-router-dom';
import LandingHeaderHome from "./components/LandingHeaderHome";
import Schedule from './components/TournamentPages/schedule.jsx'
import {schedulecontext} from './Context/context.js'
import Standing from './components/TournamentPages/standing.jsx';
import TournamentHomePage from './components/TournamentPages/TournamentHomePage.jsx';
import RulesFormat from './components/TournamentPages/RulesFormat.jsx';


const getschedule=(tournamentname)=>{
  //call the api here and get the schedule
  //sample schedule data
  const scheduleData = [
    {
      time: { start: '9:15 AM', end: '9:40 AM' },

      'FIELD 1': {day:1,TeamNameandID:{A: {name:'Disc-O-Deewane',id: 123},B : {name:'Sloppiest Discs',id: 124}},match: 'A1 vs A2',score: {A: 14,B: 7} ,teamProfilephotourl:{A:'',B:''},
      standing: {A: 2,B: 6},spiritscore: {A: {a:0,b:0,c:1,d:1,e:1},B: {a:0,b:0,c:1,d:1,e:1}},MVP: {A:{name:'Hari',photourl:''},B:{name:'Annie',photourl:''}}},

      'FIELD 2': {day:1,TeamNameandID:{A: null,B : null}, match: null,score: {A: null,B: null},teamProfilephotourl:{A:null,B:null},
      standing: {A: null,B: null},spiritscore: {A: null,B: null},MVP: {A: null,B: null}},
    },
    {
      time: { start: '9:45 AM', end: '10:10 AM' },

      'FIELD 1': {day:1,TeamNameandID:{A: {name:'Hammers',id: 125},B : {name:'Sloppy Discs',id: 126}}, match: 'B1 vs B2',score: {A: 9,B: 3} ,teamProfilephotourl:{A:'',B:''},
      standing: {A: 1,B: 8},spiritscore: {A: {a:0,b:0,c:0,d:1,e:1},B: {a:0,b:1,c:1,d:1,e:1}},MVP: {A:{name:'Raghav',photourl:''},B:{name: 'Manju',photourl:''}}},

      'FIELD 2': {day:1,TeamNameandID:{A: {name:'Sultans Of Swing',id: 126},B : {name: "DISC'PERSION",id: 127}}, match: 'B3 vs B4', score: {A: 29,B: 4} ,teamProfilephotourl:{A:'',B:''},
      standing: {A: 5,B: 9},spiritscore: {A: {a:0,b:1,c:1,d:1,e:1},B: {a:0,b:0,c:1,d:1,e:1}},MVP: {A:{name:'Sid',photourl:''},B: {name:'Moses',photourl:''}}},
      
    },
    {
      time: { start: '10:15 AM', end: '10:40 AM' },

      'FIELD 1': {day:2,TeamNameandID:{A: {name:'Disc-O-Deewane',id: 128},B : {name: 'Ulsoor Lakers',id: 129}}, match: 'A1 vs A5', score: {A: 29,B: 4} ,teamProfilephotourl:{A:'',B:''},
      standing: {A: 5,B: 9},spiritscore: {A: {a:0,b:1,c:1,d:1,e:1},B: {a:0,b:0,c:1,d:1,e:1}},MVP: {A:{name:'Sid',photourl:''},B: {name:'Moses',photourl:''}}},

     'FIELD 2': {day:2,TeamNameandID:{A: {name:'Phoenix',id: 128},B : {name: 'Disc-O-Deewane',id: 129}}, match: 'A1 vs A5', score: {A: 29,B: 4} ,teamProfilephotourl:{A:'',B:''},
      standing: {A: 5,B: 9},spiritscore: {A: {a:0,b:1,c:1,d:1,e:1},B: {a:0,b:0,c:1,d:1,e:1}},MVP: {A:{name:'Sid',photourl:''},B: {name:'Moses',photourl:''}}},

    }

  ];
  return scheduleData;
}


function TournamenEventRouter() {
   
    const { name, event } = useParams();
    const serchkey=name.split('-').join(' ').toLowerCase();

  return (
    <>
    <schedulecontext.Provider value={getschedule(serchkey)}>
    <LandingHeaderHome active={'tournaments'} />

    {event==='schedule' && <Schedule/>}
    {event==='standing' && <Standing/>}
    {event==='rules' && <RulesFormat/>}
    
    </schedulecontext.Provider>
  </>
  )
}

function TournamentHomeRouter() {
  const { name} = useParams();
  const serchkey=name.split('-').join(' ').toLowerCase();

return (
  <>
  <schedulecontext.Provider value={getschedule(serchkey)}>
  <LandingHeaderHome active={'tournaments'} />
  <TournamentHomePage/>
  </schedulecontext.Provider>
</>
)
}
 export {TournamenEventRouter,TournamentHomeRouter}