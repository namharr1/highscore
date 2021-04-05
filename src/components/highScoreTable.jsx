import React from "react";
import { Grid,Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";

const highScoreTable = ( {selectUser, userHighScores} ) => {
 
    const highScoreTableRows = [
        { valueName: "name"},
        { valueName: "score"},
    ];
    
    return(
        <Grid container alignContent="center">
            <Grid item xs={12} sm={6}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {highScoreTableRows.map(col =>
                                <TableCell
                                    key={col.valueName}
                                >
                                    {col.valueName}
                                </TableCell>    
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userHighScores.map((user) => {
                            return(
                                <TableRow 
                                    key={user._id} 
                                    onClick={() => selectUser(user)}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.score}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default highScoreTable;
