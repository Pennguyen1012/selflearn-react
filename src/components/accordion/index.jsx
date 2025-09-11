import { useState } from "react"
import data from "./dummyData";
import './style.css'

function Accordion() {
    
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multipleSelected, setMultipleSelected] = useState([]);

    function handleSingleSelection(id) {
        setSelected(id === selected ? null : id);
    }

    function handleMultiSelection(id) {
        let cpyMultipleSelected = [...multipleSelected];
        const findIndexOfCurrentId = cpyMultipleSelected.indexOf(id);
        if(findIndexOfCurrentId === -1) {
            cpyMultipleSelected.push(id);
        } else {
            cpyMultipleSelected.splice(findIndexOfCurrentId, 1);
        }

        setMultipleSelected(cpyMultipleSelected);
    }

    console.log(selected, multipleSelected);

    return (
    <div className="wrapper">
        <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>Enable Multi Selection</button>
        <div className="accordion">
            {
                data && data.length > 0 ?
                data.map(dataItem => <div className="item" key={dataItem.id}>
                    <div onClick={
                        enableMultiSelection 
                            ? () => handleMultiSelection(dataItem.id)
                            : () => handleSingleSelection(dataItem.id)
                        } className="title">
                        <h3>{dataItem.label}</h3>
                        <span>+</span>
                    </div>
                    {
                        selected === dataItem.id || multipleSelected.indexOf(dataItem.id) !== -1 ?
                        <div className="content">{dataItem.content}</div>
                        : null
                    }
                </div>)
                : <div>No data found!</div>
            }
        </div>
    </div>
    )
}

export default Accordion;