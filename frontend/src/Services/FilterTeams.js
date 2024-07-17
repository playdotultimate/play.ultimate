const filterMatchesForTeam = (team, scheduleData) => {
  return scheduleData.reduce((acc, schedule) => {
    let scheduleIncludesTeam = false;
    let filteredSchedule = { ...schedule };

    for (let field in filteredSchedule) {
      if (field !== 'time' && filteredSchedule[field].TeamNameandID) {
        let { A, B } = filteredSchedule[field].TeamNameandID;

        if ((A && A.name === team) || (B && B.name === team)) {
          scheduleIncludesTeam = true;

          if (A && A.name !== team) {
            // Swap A and B if the team is in B
            let match = { ...filteredSchedule[field] };
            match.TeamNameandID = { A: match.TeamNameandID.B, B: match.TeamNameandID.A };
            match.spiritscore = { A: match.spiritscore.B, B: match.spiritscore.A };
            match.score = { A: match.score.B, B: match.score.A };
            match.teamProfilephotourl = { A: match.teamProfilephotourl.B, B: match.teamProfilephotourl.A };
            match.standing = { A: match.standing.B, B: match.standing.A };
            match.MVP = { A: match.MVP.B, B: match.MVP.A };
            filteredSchedule[field] = match;
          }
        } else {
          // Nullify the field if the team is not involved
          filteredSchedule[field] = null;
        }
      }
    }

    if (scheduleIncludesTeam) {
      acc.push(filteredSchedule);
    }

    return acc;
  }, []);
};


  const getFieldNamesFromFirstObject = (scheduleData) => {
    // Get the keys of the first object in the array
    if(scheduleData.length !== 0){
    const fieldNames = Object.keys(scheduleData[0]);
  
    // Filter out the 'time' key to get only the field names
    return fieldNames.filter(field => field !== 'time');
    }else{
      return scheduleData;
    }
  };

  const getUniquePools=(teams)=>{
    const pools = teams.map(team => team.pool);
    return Array.from(new Set(pools));
  }

  const generateButtonLabels = (numDays) => {
    return Array.from({ length: numDays }, (v, i) => `Day ${i + 1}`);
  };


  const filterTeams = (teams, start, end,type) => {
    return teams.filter(team => type===0? (team.initialstand >= start && team.initialstand <= end) : (team.currentstand >= start && team.currentstand <= end));
  };
  
  export {filterMatchesForTeam,getFieldNamesFromFirstObject,getUniquePools,generateButtonLabels,filterTeams} ;  