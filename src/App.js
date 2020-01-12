import React from 'react';
import './App.css';
import { Random } from 'random-js';
import { GridListTile, GridList, makeStyles } from '@material-ui/core';
import * as R from 'ramda';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500
  },
  background: {
    backgroundImage: 'url(briefcase.png)'
  }
}));

function generateCases(numOfCases, startingDollarAmount) {
  const availableCases = R.range(1, numOfCases+1);
  new Random().shuffle(availableCases);
  const cases = [];
  let dollarAmmount = startingDollarAmount;
  for(let i = 1; i <= numOfCases; i++) {
    cases[i-1] = {
      dollarAmmount,
      caseNumber: availableCases[i-1]
    }
    dollarAmmount *= 2;
  }

  return cases;
}

function App() {
  const cases = R.sortBy(R.prop('caseNumber'), generateCases(12, 250));
  const classes = useStyles();
  console.log(cases);
  return (
    <div className={classes.root}>
      <GridList cellHeight={268} className={classes.gridList} cols={3}>
        {cases.map((tile) => (
          <GridListTile key={tile.containingCase} cols={1}>
            <span className={classes.background}>
              {tile.caseNumber} {tile.dollarAmmount}
            </span>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default App;
