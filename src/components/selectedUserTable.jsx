import React from "react";
import { Grid,Table, TableHead, TableBody, TableCell, TableRow } from "@material-ui/core";

const selectedUserTable = ( { user} ) => {
    const selectedUserTableRows = [{valueName: user.name}];

    return(
        <Grid container alignContent="center">
            <Grid item xs={12} sm={6}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {selectedUserTableRows.map(col =>
                                <TableCell
                                    key={col.valueName}
                                >
                                    {col.valueName}
                                </TableCell>    
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {user.userScores.map(({score}, index) => {
                            return(
                                <TableRow 
                                    key={index} 
                                >
                                    <TableCell>{score}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
}

export default selectedUserTable;