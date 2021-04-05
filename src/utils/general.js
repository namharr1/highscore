import { getHighestNumber } from './sorter';

export const getNewUserId = () => {
    return Math.random().toString(36).toString(2, 9);
}

export const getUserByName = (name, users) => {
    return users.find(e => e.name.toLowerCase() === name.toLowerCase());
}

export const getAllScoresForOneUser = (id, scores) => {
    const user = scores.filter((e) => e.userId === id);
    
    const userScore = user.map(s => {
        return s.score;
    });

    return userScore;
}

export const getHighScores = (users, highscores) => {
    const highScoresResult = users.map(user => {
        const playerAllScores = getAllScoresForOneUser(user._id, highscores);
        
        const highestScore = getHighestNumber(playerAllScores);
        return {_id: user._id, name: user.name, score: highestScore};
    });
    return highScoresResult.sort(function(a, b){return b.score - a.score});
 }