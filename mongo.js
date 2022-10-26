async function addLB(client, newScore) {
  const result = await client
    .db("Random_Dungeon")
    .collection("Leaderboard")
    .insertOne(newScore);
}

async function leaderboard(client) {
  let db = await client.db("Random_Dungeon");
  let result = await db
    .collection("Leaderboard")
    .find({ score: { $exists: true } })
    .sort({ score: -1 })
    .limit(5)
    .toArray();
  let wow = await result.map((i) => ({ name: i.name, score: i.score }));
  return wow;
}

export {addLB, leaderboard}
