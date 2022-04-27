import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Game from '../components/Game'; 


// Testcases for running 1000, 2500, 5000, 8000 and 10000 sample testcases to show the learning by reinforcement 
test('total games 1000', () => {
  render(<Game />);
  const resetBtn = screen.getByTestId('reset'); // This will get the reset menace buttom
  const randomBtn = screen.getByTestId('random-btn'); // This will get the random buttom
  const totalGames = screen.getByTestId('total'); // This will get the total value of games played
  const wins = screen.getByTestId('wins'); // This will get the total wins of MENACE
  const loss = screen.getByTestId('loss'); // This will get the total loss of MENACE

  fireEvent.click(resetBtn); // Resets the menace

  // Assertions that the values are available in the document
  expect(randomBtn).toBeInTheDocument();
  expect(totalGames).toBeInTheDocument();
  expect(wins).toBeInTheDocument();
  expect(loss).toBeInTheDocument();  
 
  // Assertion to check if the initial count of total games is 0
  expect(totalGames).toHaveTextContent('0');

  // Looping over games
  for (let i=0; i<1000; i++) {
    // Random button fired for n no of games
    fireEvent.click(randomBtn);
  }  
  // Assertion to check if the total number of games is equal to n
  expect(totalGames).toHaveTextContent('1000');
  // Logic  - Training probability calculation (when menace wins)
  let probability = 1 - (loss.textContent/ wins.textContent);

  //Ratio above 1 is round of to One 
  expect(probability).toBeLessThanOrEqual(1);
})

test('total games 2500', () => {
  render(<Game />);
  const resetBtn = screen.getByTestId('reset');
  const randomBtn = screen.getByTestId('random-btn');
  const totalGames = screen.getByTestId('total');
  const wins = screen.getByTestId('wins');
  const loss = screen.getByTestId('loss');

  fireEvent.click(resetBtn);

  expect(randomBtn).toBeInTheDocument();
  expect(totalGames).toBeInTheDocument();
  expect(wins).toBeInTheDocument();
  expect(loss).toBeInTheDocument();  
 
  expect(totalGames).toHaveTextContent('0');
  for (let i=0; i<2500; i++) {
    fireEvent.click(randomBtn); 
  }  
  expect(totalGames).toHaveTextContent('2500');

  let probability = 1 - (loss.textContent/ wins.textContent);

  console.log(probability);

  expect(probability).toBeLessThanOrEqual(1);
})

test('total games 5000', () => {
  render(<Game />);
  const resetBtn = screen.getByTestId('reset');
  const randomBtn = screen.getByTestId('random-btn');
  const totalGames = screen.getByTestId('total');
  const wins = screen.getByTestId('wins');
  const loss = screen.getByTestId('loss');

  fireEvent.click(resetBtn);

  expect(randomBtn).toBeInTheDocument();
  expect(totalGames).toBeInTheDocument();
  expect(wins).toBeInTheDocument();
  expect(loss).toBeInTheDocument();  
 
  expect(totalGames).toHaveTextContent('0');
  for (let i=0; i<5000; i++) {
    fireEvent.click(randomBtn);
  }  
  expect(totalGames).toHaveTextContent('5000');

  let probability = 1 - (loss.textContent/ wins.textContent);

  expect(probability).toBeLessThanOrEqual(1);
})

test('total games 8000', () => {
  render(<Game />);
  const resetBtn = screen.getByTestId('reset');
  const randomBtn = screen.getByTestId('random-btn');
  const totalGames = screen.getByTestId('total');
  const wins = screen.getByTestId('wins');
  const loss = screen.getByTestId('loss');

  fireEvent.click(resetBtn);

  expect(randomBtn).toBeInTheDocument();
  expect(totalGames).toBeInTheDocument();
  expect(wins).toBeInTheDocument();
  expect(loss).toBeInTheDocument();  
 
  expect(totalGames).toHaveTextContent('0');
  for (let i=0; i<8000; i++) {
    fireEvent.click(randomBtn);
  }  
  expect(totalGames).toHaveTextContent('8000');

  let probability = 1 - (loss.textContent/ wins.textContent);

  expect(probability).toBeLessThanOrEqual(1);
})

test('total games 10000', () => {
  render(<Game />);
  const resetBtn = screen.getByTestId('reset');
  const randomBtn = screen.getByTestId('random-btn');
  const totalGames = screen.getByTestId('total');
  const wins = screen.getByTestId('wins');
  const loss = screen.getByTestId('loss');

  fireEvent.click(resetBtn);

  expect(randomBtn).toBeInTheDocument();
  expect(totalGames).toBeInTheDocument();
  expect(wins).toBeInTheDocument();
  expect(loss).toBeInTheDocument();  
 
  expect(totalGames).toHaveTextContent('0');
  for (let i=0; i<10000; i++) {
    fireEvent.click(randomBtn);
  }  
  expect(totalGames).toHaveTextContent('10000');

  let probability = 1 - (loss.textContent/ wins.textContent);

  expect(probability).toBeLessThanOrEqual(1);
})