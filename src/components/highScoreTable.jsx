import React from "react";
import { Grid,Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";
import { sortByScoreDesc } from "../utils/sorter";
import { getHighScores, arrayToMap } from "../utils/general";

const highScoreTable = ( {selectUser, scores, users} ) => {
    const usersMap = arrayToMap('_id', users);
    const highScores = getHighScores(scores);
    const sortedScores = sortByScoreDesc(highScores);

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
                        {sortedScores.map(({ userId, score }) => {
                            const user = usersMap[userId];
                            return (
                                <TableRow 
                                    key={userId}
                                    onClick={() => selectUser({_id: user._id, name: user.name})}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{score}</TableCell>
                                </TableRow>
                            )
                        })} 
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default highScoreTable;
