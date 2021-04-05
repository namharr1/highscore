import React, { useState } from "react";
import {Button, TextField, Grid} from '@material-ui/core';

const NewUserForm = ( {submitNewUser} ) => {
    const [name, setName] = useState("");
    const [score, setScore] = useState(0);

    const submit = (event) => {
        const user = {name: name, score: score};
        submitNewUser(user);
        
        event.preventDefault();
        setName("");
        setScore(0);
    }
    
    return(
        <form onSubmit={submit}>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} md={12}>
                    <TextField required label="Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField required type="number" label="Score" variant="outlined" value={score} onChange={(e) => setScore(e.target.value)} />
                </Grid>
                <Grid item xs={12} md={12}>
                    <Button type="submit" variant="contained" size="medium" color="primary">Add</Button>
                </Grid>
            </Grid> 
        </form>
    );
}

export default NewUserForm;