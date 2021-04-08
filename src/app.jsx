import React, { useState } from 'react'
import ExcelDropzone from './excel-dropzone.jsx'
import { Grid, Card, CardContent } from "@material-ui/core";
import HighScoreTable from './components/highScoreTable';
import NewUserForm from './components/newUserForm';
import SelectedUserTable from './components/selectedUserTable';
import { getNewUserId, getUserByName, getAllScoresForOneUser, arrayToMap } from './utils/general';
import {default as initialScores} from './scores';
import {default as initialUsers} from './users';

function App() {
  const [users, setUsers] = useState(initialUsers);
  const [scores, setScores] = useState(initialScores);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const handleSheetData = (data) => {
    const allCurrentUsers = arrayToMap("name", users);

    const newScores = data.map(({ score, name }) => {
      const existingUser = allCurrentUsers[name];
      const newId = getNewUserId();
      
      if (!existingUser) {
        allCurrentUsers[name] = { name, _id: newId }
      }
      
      return { score: Number(score), userId: existingUser ? existingUser._id : newId }
    });
   
    setUsers(Object.values(allCurrentUsers));
    setScores(state => [...state, ...newScores]); 
  }

  const addNewUserByForm = (user) => {
    const existingUser = getUserByName(user.name, users);
    const newId = getNewUserId()

    if (!existingUser) {
      setUsers(users => [
        ...users, 
        { name: user.name, _id: newId }]
      )
    }

    setScores(scores => [
      ...scores,
      { score: Number(user.score), userId: existingUser ? existingUser._id : newId }]
    )
  }

  const formatSelectedUser = () => {
    return  {
      name: selectedUser.name,
      _id: selectedUser._id,
      userScores: getAllScoresForOneUser(selectedUser._id, scores),
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
                  <HighScoreTable 
                    scores={scores} 
                    users={users} 
                    selectUser={setSelectedUser}
                  />
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