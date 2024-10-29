const Cell = ({ cell, onClick }) => {
    const onClickHandler = () => {
        onClick(cell.index)
    };




  let cellContent;
    if (!cell.visible) {
        cellContent = ''; 
    } else if (cell.hasMine) {
        cellContent = 'B'; 
    } else if (cell.numberOfNeighbouringMines > 0) {
        cellContent = cell.numberOfNeighbouringMines; 
    } 
    else{
        cellContent = '';
    }

    const cellClass = cell.visible ? 'clicked' : 'cell';

    return(
        <div onClick={onClickHandler} className={cellClass}>
            {cellContent}
        </div>
    )

    
}

export default Cell;