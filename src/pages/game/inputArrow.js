import React from 'react'

import styled from 'styled-components'

const InputArrow = ({column, handleClick}) => {
    return (
        <Container onClick={()=>handleClick(column)} column={column}>
            <button>🔽</button>
        </Container>
    )
}

export default InputArrow

const Container = styled.div`
    grid-area:${props => `1/${props.column + 1}/2/${props.column + 2}`};
    display: flex;
    justify-content: center;
    align-items: center;
`
