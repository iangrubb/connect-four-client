import React from 'react'

import styled from 'styled-components'

const GridRegion = ({ row, column, color}) => {
    return (
        <Container row={row} column={column}>
            <Circle color={color}/>
        </Container>
    )
}

export default GridRegion

const Container = styled.div`
    background: #c9cc2e;
    grid-area: ${({row, column}) => `${row + 1}/${column + 1}/${row + 2}/${column + 2}`};

    display: flex;
    justify-content: center;
    align-items: center;
`

const Circle = styled.div`
    background: ${props => props.color};

    width: 70px;
    height: 70px;
    border-radius: 50%;
`