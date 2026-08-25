'use client'

import { useMemo, useState } from 'react'

type Player = {
  id: number
  name: string
  score: number
  thru: number
}

export default function Home() {
  const [matchName, setMatchName] = useState('Saturday Skins')
  const [joinCode, setJoinCode] = useState('')
  const [newPlayerName, setNewPlayerName] = useState('')
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'You', score: -3, thru: 12 },
    { id: 2, name: 'Jake', score: -1, thru: 11 },
    { id: 3, name: 'Sam', score: 0, thru: 12 },
    { id: 4, name: 'Mason', score: 2, thru: 10 },
  ])

  const leaderboard = useMemo(
    () => [...players].sort((a, b) => a.score - b.score || b.thru - a.thru),
    [players]
  )

  function formatScore(score: number) {
    if (score === 0) return 'E'
    if (score > 0) return `+${score}`
    return `${score}`
  }

  function createMatch() {
    alert(`Match created: ${matchName}`)
  }

  function joinMatch() {
    if (!joinCode.trim()) {
      alert('Enter a join code')
      return
    }
    alert(`Joining match: ${joinCode}`)
  }

  function addPlayer() {
    if (!newPlayerName.trim()) return
    setPlayers((current) => [
      ...current,
      {
        id: Date.now(),
        name: newPlayerName.trim(),
        score: 0,
        thru: 1,
      },
    ])
    setNewPlayerName('')
  }

  function changeScore(id: number, amount: number) {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id ? { ...player, score: player.score + amount } : player
      )
    )
  }

  function advanceHole(id: number) {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id
          ? { ...player, thru: Math.min(player.thru + 1, 18) }
          : player
      )
    )
  }

  return (
    <main className="page-shell">
      <section className="hero-card">
        <div>
          <p className="eyebrow">BGB LIVE</p>
          <h1>Live Golf Leaderboard</h1>
          <p className="subtext">
            Real-time scoring with the broadcast-style golf feel you wanted.
          </p>
        </div>
        <div className="hero-badge">LIVE</div>
      </section>

      <section className="content-grid">
        <div className="leaderboard-card">
          <div className="section-header">
            <div>
              <p className="eyebrow">LEADERBOARD</p>
              <h2>{matchName}</h2>
            </div>
          </div>

          <div className="leaderboard-table">
            <div className="leaderboard-head row">
              <span>POS</span>
              <span>PLAYER</span>
              <span>SCORE</span>
              <span>THRU</span>
              <span>ACTIONS</span>
            </div>

            {leaderboard.map((player, index) => (
              <div className="row leaderboard-row" key={player.id}>
                <span className="pos">{index + 1}</span>
                <span className="player-name">{player.name}</span>
                <span className={`score-pill ${player.score < 0 ? 'under' : player.score > 0 ? 'over' : 'even'}`}>
                  {formatScore(player.score)}
                </span>
                <span className="thru-pill">{player.thru}</span>
                <div className="action-group">
                  <button className="mini-btn" onClick={() => changeScore(player.id, -1)}>
                    -
                  </button>
                  <button className="mini-btn" onClick={() => changeScore(player.id, 1)}>
                    +
                  </button>
                  <button className="mini-btn green" onClick={() => advanceHole(player.id)}>
                    Hole+
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="side-panel">
          <section className="panel-card">
            <p className="eyebrow">CREATE MATCH</p>
            <h3>Start a Game</h3>
            <input
              className="text-input"
              value={matchName}
              onChange={(e) => setMatchName(e.target.value)}
              placeholder="Match name"
            />
            <button className="primary-btn" onClick={createMatch}>
              Create Match
            </button>
          </section>

          <section className="panel-card">
            <p className="eyebrow">JOIN MATCH</p>
            <h3>Enter Code</h3>
            <input
              className="text-input"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Join code"
            />
            <button className="primary-btn" onClick={joinMatch}>
              Join Match
            </button>
          </section>

          <section className="panel-card">
            <p className="eyebrow">ADD PLAYER</p>
            <h3>Expand the Group</h3>
            <input
              className="text-input"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Player name"
            />
            <button className="primary-btn" onClick={addPlayer}>
              Add Player
            </button>
          </section>
        </div>
      </section>
    </main>
  )
}