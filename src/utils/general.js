import { sortByScoreDesc } from './sorter';

export const getNewUserId = () => {
    return Math.random().toString(36).toString(2, 9);
}

export const getUserByName = (name, users) => {
    return users.find(e => e.name.toLowerCase() === name.toLowerCase());
}

export const arrayToMap = (prop, array) => {
    return array.reduce((acc, curr) => {
      acc[curr[prop]] = curr
      return acc
    }, {})
}

export const getAllScoresForOneUser = (id, scores) => {
    const userScores = scores.filter((e) => e.userId === id);
    return sortByScoreDesc(userScores);
}

export const getHighScores = (highscores) => {
    const reducedScores = highscores.reduce((acc, { userId, score }) => {
        const userScore = acc[userId]
        
        if (!userScore) {
            acc[userId] = score
        }

        if (userScore < score) {
            acc[userId] = score
        }

        return acc
    }, {})
    
    return Object.entries(reducedScores).map(([ userId, score ]) => ({ userId, score }))
}