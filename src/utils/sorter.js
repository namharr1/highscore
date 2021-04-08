export const sortByScoreDesc = (scores) => {
    return [...scores].sort((a, b) => b.score - a.score)
}