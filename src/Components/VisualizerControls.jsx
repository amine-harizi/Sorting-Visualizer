import '../App.css'
const VisualizerControls = ({ VisualizerControlsProps }) => {
    const { handleGenerateBtn,
        handleArraySizeChange,
        arrayInfos,
        arraySizes,
        handleSort} = VisualizerControlsProps

    return (

        <section className='controls-wrapper'>
            <div className="array-sizes-wrapper">
                <select name="array-sizes" id="array-sizes" onChange={handleArraySizeChange}>
                   {arraySizes.map((size, index) => <option key={index} value={size}>{size}</option>)}
                </select>

            </div>
            <div className="boxes-container">


                {Array.from({ length: arrayInfos.size })
                    .map((_, index) => <div className="size-box" key={index}> {arrayInfos.values[index]}</div>)}

            </div>

            <button className='btn' title='new Items' onClick={handleGenerateBtn}>New</button>
            <button className='btn' title='start sorting visualization' onClick={handleSort}>Sort</button>

        </section>

    )
}

export default VisualizerControls