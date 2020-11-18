import React, { useState, useEffect } from 'react'

import socketIOClient from "socket.io-client";

import styled from 'styled-components'

import InputArrow from './inputArrow'
import GridRegion from './gridRegion'


const arrowPositions = [...Array(7).keys()]
const gridPositions = [...Array(7).keys()].flatMap(column => [...Array(6).keys()].map(row => ({row: row + 1, column})))

const Game = () => {

    // Socket for updating server state
    const [socket, setSocket] = useState(null)

    const [gameState, setGameState] = useState(null)

    useEffect(() => {
        const socket = socketIOClient("http://localhost:3000/")
        socket.on("connect", () => {
            
            socket.on("game-state", socket => {
                setGameState(socket)
            })

        })
        setSocket(socket)
        return () => socket.disconnect()
    }, [setSocket, setGameState])

    const submitMove = column => socket.emit("new-move", column)
    

    if (gameState === null) return <div>Loading...</div>

    console.log(gameState)

    const gridData = gridPositions.map(p => {

        const piece = gameState.movesRecord.find(m => m.column === p.column && m.row === 6 - p.row)
        
        let color
        if (piece) {
            if (piece.player === 1) {
                color = "black"
            } else if (piece.player === 2) {
                color = "red"
            }
        } else {
            color = "white"
        }

        return {...p, color}

    })
    
    return (
        <Container>
            <Board>
                {gameState.validMoves.map(column => <InputArrow handleClick={submitMove} key={column} column={column} />)}
                {gridData.map(point => <GridRegion key={`${point.column}/${point.row}`} {...point} />)}
            </Board>
        </Container>
    )
}

export default Game

const Container = styled.div`
    margin: 64px 0 0 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Board = styled.div`
    display: grid;
    grid-template-rows: 50px repeat(6, 100px);
    grid-template-columns: repeat(7, 100px);

`