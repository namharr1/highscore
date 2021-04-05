import React, { useState } from 'react'
import ExcelDropzone from './excel-dropzone.jsx'
import { Grid, Card, CardContent } from "@material-ui/core";

import HighScoreTable from './components/highScoreTable';
import NewUserForm from './components/newUserForm';
import SelectedUserTable from './components/selectedUserTable';
import { getNewUserId, getUserByName, getHighScores, getAllScoresForOneUser } from './utils/general';
import { sortNumbersDescending } from './utils/sorter';
import {default as initialScores} from './scores';
import {default as initialUsers} from './users';

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [scores, setScores] = useState(initialScores);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSheetData = (data) => {
    const allCurrentUsers = [...users];

    const _scores = data.map(u => {
      const user = allCurrentUsers.find(user => user.name.toLowerCase() === u.name.toLowerCase())
      if (!user) {
        const userId = getNewUserId();

        allCurrentUsers.push({_id: userId, name: u.name});

        return {
          userId,
          score: u.score
        }
      }
  
      return {
        userId: user._id,
        score: u.score
      }
    })

    setUsers(allCurrentUsers);
    setScores(state => [...state, ..._scores]);
  }

  const addNewUserByForm = (user) => {
    const savedUser = getUserByName(user.name, users);

    if (!savedUser) {
      const newId = getNewUserId();
      const newUser = {
        _id: newId,
        name: user.name
      }
      
      const newScore = {
        userId: newId,
        score: user.score
      }

      setUsers(users => [...users, newUser]);
      setScores(scores => [...scores, newScore]);

    } else {
      const newScore = {
        userId: savedUser._id,
        score: user.score
      }

      setScores(scores => [...scores, newScore]);
    }
  }

  const formatSelectedUser = () => {
    return  {
      name: selectedUser.name,
      _id: selectedUser._id,
      userScores: sortNumbersDescending(getAllScoresForOneUser(selectedUser._id, scores)),
    }
  }

  return (
    <Grid container>
      <Card>
        <CardContent>
            <Grid container>
                <Grid item sm={12}>
                  <h2>Mediatool exercise</h2>
                </Grid>
                <Grid item sm={6}>
                  <ExcelDropzone
                    onSheetDrop={ handleSheetData }
                    label="Drop your file here"
                  />
                </Grid>
                <Grid item sm={6}>
                  <NewUserForm submitNewUser={addNewUserByForm} />
                </Grid>
                <Grid item sm={12}>
                  <h2>Highscores</h2>
                </Grid>
                <Grid item sm={6}>
                  <HighScoreTable userHighScores={getHighScores(users, scores)} selectUser={setSelectedUser}/>
                </Grid>
                <Grid item sm={6}>
                  {selectedUser && (<SelectedUserTable user={formatSelectedUser()}/>)}
                </Grid>
            </Grid>
        </CardContent>
      </Card>
    </Grid>
    )
}

export default App;