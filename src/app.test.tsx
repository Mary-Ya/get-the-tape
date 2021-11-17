import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {getByTestId, getByText, screen} from '@testing-library/dom'
import App from "./app";
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);

test.only('this will be the only test that runs', () => {
  expect(true).toBe(true);
});
