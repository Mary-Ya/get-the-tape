// test file
import React from "react";
import { render, screen } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import TapeStatusText from '../index';


test('should new tape status text contain local', () => {
  render(<TapeStatusText status={'NEW'} />)
  const tapeStatusText = screen.getAllByTestId('tape-status-text')
  const inputNode2 = screen.getByText('This list is local')
  expect(tapeStatusText.includes(inputNode2));
})