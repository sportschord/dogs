import './App.css';
import * as d3 from "d3";
import React, { useEffect, useRef, useState } from 'react';
import ranks from './ranks.csv'
import traitdata from './traits.csv'
import descdata from './descs.csv'
import DogCard from './DogCard'

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {

  const [data, setData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [input, setInput] = useState("2020 Rank");
  const [dog, setDog] = useState('Retrievers (Labrador)');
  const [traits, setTraits] = useState([]);
  const [descs, setDescs] = useState([]);
  const [rankLabs, setRankLabs] = useState(['2020 Rank']);
  const [traitLabs, setTraitLabs] = useState(['Energy Level']);
  const [loading, setLoading] = useState(true);


  const dogData = data?.filter(d => d.Breed === dog)
  const dogTraits = traits?.filter(d => d.Breed === dog)
  const circles = [1, 2, 3, 4, 5]
  const ref = useRef(null);

  useEffect(() => {
    setWindowWidth(ref.current ? ref.current.offsetWidth : 0)
    console.log(windowWidth);
  }, [ref.current]);

  useEffect(() => {

    Promise.all([
      d3.csv(ranks),
      d3.csv(traitdata),
      d3.csv(descdata)
    ]).then((d) => {
      return (
        setData(d[0]),
        setTraits(d[1]),
        setDescs(d[2])
      )
    }).then(() =>
      setLoading(false),
    ).then(() =>
      setRankLabs(Object.keys(...dogData).filter(d => d.includes('Rank'))),
    ).then(() =>
      setTraitLabs(Object.keys(...dogTraits).filter(d => !d.includes('Breed')))
    )
  }, [loading]);

  // console.log(dogData);
  // console.log(dogTraits);
  console.log(descs);

  function setParentValue(newValue) {
    setDog(newValue);
  }

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {

    setData(data.slice().sort((a, b) => d3.ascending(parseFloat(a[input]), parseFloat(b[input]))))


  }, [input])

  const width = windowWidth * 3
  const barwidth = windowWidth


  return (
    <div className="App">
      <header className="App-header">
        <h2>AKC's Most Popular Dogs</h2>
        <div className='filters'>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={input}
                label={input}
                onChange={handleChange}
              >
                {rankLabs?.map(d =>
                  <MenuItem value={d} key={d}>{d.replace(' Rank', '')}</MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
        </div>
      </header>

      {loading ? <div>loading</div> :
        <div className='layout'>
          <div className='ranks'>
            <Stack spacing={0.7}>
              <DogCard data={data} input={input} setNewDog={setParentValue} />
            </Stack>
          </div>
          <hr className="solid" />
          <div className='detail'>
            <div className='radar'>
              {dogData.map(d =>
                <div>
                  <div className='radarHeader'>
                    <h3>{d.Breed}</h3>
                    <div className='yearRanks'>
                      {rankLabs?.map(e =>
                        <div>
                          <p style={{ fontSize: '0.5em' }}>{e.replace(' Rank', '')}</p>
                          <p style={{ fontSize: '0.8em' }}>{d[e]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <img src={d.Image} className='largeImage' />
                  <div className='traits'>
                    {traitLabs.map(f =>
                      <div>
                        <div className='traitHeader'>
                          <p>{f}</p>
                          <p>{d[f]}</p>
                        </div>
                        <svg width={width / 3} height={20}>
                          {circles.map(g =>
                            <rect
                              x={(g - 1) * (barwidth / 5)}
                              y={12}
                              width={(barwidth / 5) - 3}
                              height={8}
                              rx={5}
                              id={g}
                              fill={d[f] >= g ? 'aliceblue' : 'black'}
                              style={{ margin: '2px' }}
                            />
                          )}
                        </svg>
                        {/* <p>{d[f]}</p> */}
                        {descs.filter(i => i.Trait === f).map(h =>
                          <div className='boundaries' ref={ref}>
                            <p style={{ fontSize: '0.6em' }}>{h['Trait_1']}</p>
                            <p style={{ fontSize: '0.6em' }}>{h['Trait_5']}</p>
                          </div>

                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      }
      <div className='footer'>
        <p style={{ padding: "1vh" }}>Made By @SportsChord</p>

      </div>
    </div>
  );
}

export default App;
