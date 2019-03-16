import React from 'react';
import { Button } from 'reactstrap';

const DetailCom = (props) => (
    <div style={{ float: 'left', marginTop: '2rem', marginBottom: '2em', border: '2em' }}>
        {props.data}
        &nbsp;
        <h3>{props.categories.length + " Categories"}</h3>
        {props.categories.map((cat) => (
            <Button key={cat} style={{ backgroundColor: 'rgb(238, 241, 242)', borderColor: 'white', width: '7em', float: 'left', borderRadius: '10px' }}>
                <div style={{ display: 'inline', color: 'black' }}>{cat}</div>
            </Button>
        ))}
    </div>
)

export default DetailCom;