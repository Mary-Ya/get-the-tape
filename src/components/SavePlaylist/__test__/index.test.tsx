import React from "react";
import { getByText, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SavePlaylist from "../index";

import mockData from '../../../../jest.mock';

const mockPlaylistName = "Best Ballads";
jest.mock("@common/name-gen", () => {
  const originalModule = jest.requireActual("@common/name-gen");
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => mockPlaylistName),
    getRandomListName: "mocked getRandomListName",
  };
});

describe("Save Playlist panel: expect to see all parts needed", () => {
  test("if playlist is empty yet", () => {
    const fakeFetch = () => {
      return new Promise((resolve) => {
        resolve(mockData.playList);
      });
    };

    render(
      <SavePlaylist
        accessToken=""
        myId=""
        trackList={[]}
        fetchTrackList={fakeFetch}
      />
    );

    const playlistNameComponent = screen.getByTestId("playlist-name");
    expect(getByText(playlistNameComponent, mockPlaylistName));
  });
});
