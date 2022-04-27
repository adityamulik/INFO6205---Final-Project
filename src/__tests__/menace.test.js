import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import Game from '../components/Game'; 

test('total games 1000', () => {
  render(<Game />);
  const randomBtn = screen.getByTestId('random-btn');
  const games = screen.getByTestId('total');
  expect(randomBtn).toBeInTheDocument();
  expect(games).toBeInTheDocument();
 
  expect(games).toHaveTextContent('Total Games 0');
  for (let i=0; i<1000; i++) {
    setTimeout(() => {}, 1000);
    fireEvent.click(randomBtn);
  }  
  expect(games).toHaveTextContent('Total Games 1000');
})

test('total games 5000', () => {
  render(<Game />);
  const randomBtn = screen.getByTestId('random-btn');
  const games = screen.getByTestId('total');
  expect(randomBtn).toBeInTheDocument();
  expect(games).toBeInTheDocument();
 
  expect(games).toHaveTextContent('Total Games 0');
  for (let i=0; i<5000; i++) {
    setTimeout(() => {}, 1000);
    fireEvent.click(randomBtn);
  }  
  expect(games).toHaveTextContent('Total Games 5000');
})

test('total games 10000', () => {
  render(<Game />);
  const randomBtn = screen.getByTestId('random-btn');
  const games = screen.getByTestId('total');
  expect(randomBtn).toBeInTheDocument();
  expect(games).toBeInTheDocument();
 
  expect(games).toHaveTextContent('Total Games 0');
  for (let i=0; i<10000; i++) {
    setTimeout(() => {}, 1000);
    fireEvent.click(randomBtn);
  }  
  expect(games).toHaveTextContent('Total Games 10000');
})

test('total games 15000', () => {
  render(<Game />);
  const randomBtn = screen.getByTestId('random-btn');
  const games = screen.getByTestId('total');
  expect(randomBtn).toBeInTheDocument();
  expect(games).toBeInTheDocument();
 
  expect(games).toHaveTextContent('Total Games 0');
  for (let i=0; i<15000; i++) {
    setTimeout(() => {}, 1000);
    fireEvent.click(randomBtn);
  }  
  expect(games).toHaveTextContent('Total Games 15000');
})

test('total games 20000', () => {
  render(<Game />);
  const randomBtn = screen.getByTestId('random-btn');
  const games = screen.getByTestId('total');
  expect(randomBtn).toBeInTheDocument();
  expect(games).toBeInTheDocument();
 
  expect(games).toHaveTextContent('Total Games 0');
  for (let i=0; i<20000; i++) {
    setTimeout(() => {}, 1000);
    fireEvent.click(randomBtn);
  }  
  expect(games).toHaveTextContent('Total Games 20000');
})