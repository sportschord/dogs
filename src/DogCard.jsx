import React from "react"
import './App.css';

const DogCard = ({ data, input, setNewDog }) => {


  const changeDog = (e) => {
    setNewDog(e.currentTarget.id)
  }

  return (

    data.map(d =>
      <div className="card"
        onClick={changeDog}
        key={d.Breed + d[input]}
        id={d.Breed}
      >
        <div className="imgWrap">
          <img src={d.Image} alt={d.Breed}/>
        </div>
        <div className="container">
          <p style={{justifySelf:"end"}}>{d[input]} | </p>
          <p style={{ fontWeight: "bold", paddingLeft: "5px", justifySelf: "start", textAlign:'left'}}> {d.Breed}</p>
          <p>{d['Coat Type']}</p>
          <p>{d['Coat Length']}</p>
          {/* <button href={d.links}/> */}
        </div>
      </div>
    )

  )
}

export default DogCard