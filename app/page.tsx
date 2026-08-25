'use client'

import { useMemo, useState } from 'react'

type Player = {
  id: number
  name: string
  score: number
}

export default function Home() {
  const [matchName, setMatchName] = useState('Saturday Match')
  const [joinCode, setJoinCode] = useState('')
  const [players, setPlayers] = useState<Player[]>([
    { id: 1, name: 'You', score: -1 },
    { id: 2, name: 'Jake', score: 0 },
    { id: 3, name: 'Sam', score: 2 },
  ])
  const [newPlayerName, setNewPlayerName] = useState('')

  const leaderboard = useMemo(
    () => [...players].sort((a, b) => a.score - b.score),
    [players]
  )

  function createMatch() {
    alert(`Match created: ${matchName}`)
  }

  function joinMatch() {
    if (!joinCode.trim()) {
      alert('Enter a join code')
      return
    }
    alert(`Joining match with code: ${joinCode}`)
  }

  function addPlayer() {
    if (!newPlayerName.trim()) return

    setPlayers((current) => [
      ...current,
      {
        id: Date.now(),
        name: newPlayerName.trim(),
        score: 0,
      },
    ])
    setNewPlayerName('')
  }

  function changeScore(id: number, amount: number) {
    setPlayers((current) =>
      current.map((player) =>
        player.id === id
          ? { ...player, score: player.score + amount }
          : player
      )
    )
  }

  return (
    <main style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ marginBottom: 8 }}>BGB Live</h1>
      <p style={{ marginTop: 0, color: '#555' }}>
        Live golf leaderboard prototype
      </p>

      <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
        <section style={cardStyle}>
          <h2>Create Match</h2>
          <input
            style={inputStyle}
            value={matchName}
            onChange={(e) => setMatchName(e.target.value)}
            placeholder="Match name"
          />
          <button style={buttonStyle} onClick={createMatch}>
            Create Match
          </button>
        </section>

        <section style={cardStyle}>
          <h2>Join Match</h2>
          <input
            style={inputStyle}
            value={joinCode}
            onChange={(e) => setJoinCode(e.target.value)}
            placeholder="Enter join code"
          />
          <button style={buttonStyle} onClick={joinMatch}>
            Join Match
          </button>
        </section>

        <section style={cardStyle}>
          <h2>Add Player</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input
              style={{ ...inputStyle, marginBottom: 0, flex: 1, minWidth: 220 }}
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Player name"
            />
            <button style={buttonStyle} onClick={addPlayer}>
              Add
            </button>
          </div>
        </section>

        <section style={cardStyle}>
          <h2>Live Leaderboard</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {leaderboard.map((player, index) => (
              <div key={player.id} style={rowStyle}>
                <div>
                  <strong>
                    #{index + 1} {player.name}
                  </strong>
                  <div style={{ color: '#666', fontSize: 14 }}>
                    Score to par: {formatScore(player.score)}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <button style={smallButtonStyle} onClick={() => changeScore(player.id, -1)}>
                    -
                  </button>
                  <span style={{ minWidth: 36, textAlign: 'center', fontWeight: 700 }}>
                    {formatScore(player.score)}
                  </span>
                  <button style={smallButtonStyle} onClick={() => changeScore(player.id, 1)}>
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function formatScore(score: number) {
  if (score > 0) return `+${score}`
  if (score === 0) return 'E'
  return `${score}`
}

const cardStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  borderRadius: 12,
  padding: 16,
  background: '#fff',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  padding: 12,
  border: '1px solid #eee',
  borderRadius: 10,
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: 12,
  borderRadius: 10,
  border: '1px solid #ccc',
  marginBottom: 12,
  fontSize: 16,
  boxSizing: 'border-box',
}

const buttonStyle: React.CSSProperties = {
  padding: '12px 16px',
  borderRadius: 10,
  border: 'none',
  background: '#111827',
  color: '#fff',
  fontSize: 16,
  cursor: 'pointer',
}

const smallButtonStyle: React.CSSProperties = {
  width: 32,
  height: 32,
  borderRadius: 8,
  border: 'none',
  background: '#111827',
  color: '#fff',
  fontSize: 18,
  cursor: 'pointer',
}