import React, { useEffect, useState } from 'react';
import useCashableState from '@hooks/use-cashable-state';

function Settings() {
  // min_acousticness, max_acousticness 0.0 -1.0
  const [acousticness, setAcousticness] = useState([0.35, 1.33]);
  // target_acousticness

  // how suitable a track is for dancing 0 - 1
  // min_danceability, max_danceability
  const [danceability, setDanceability] = useState([0.35, 4.1]);
  //target_danceability

  // min_duration_ms, max_duration_ms
  const [duration, setDuration] = useState([2000, 4000]);
  // target_duration_ms

  // perceptual measure of intensity and activity -0.2 - 1.2
  // min_energy, max_energy
  const [energy, setEnergy] = useState([0.35, 3.15]);
  // target_energy

  // predicts whether a track contains no vocals
  // min_instrumentalness, max_instrumentalness
  const [instrumentalness, setInstrumentalness] = useCashableState([0.35, 1.71], 'instrumentalness');
  //target_instrumentalness

  // 0 = C, 1 = C♯/D♭, 2 = D
  // min_key, max_key [0 - 11]
  const [key, setKey] = useState([1, 10]);
  // target_key

  // the presence of an audience in the recording: 0.35
  // min_liveness, max_liveness
  const [liveness, setLiveness] = useState([0.4, 0.86]);
  //target_liveness

  // The overall loudness of a track in decibels -60 - 0
  // min_loudness, max_loudness
  const [loudness, setLoudness] = useState([-0.15, 0.7]);
  // target_loudness

  // the modality (major or minor)
  // min_mode,max_mode
  const [mode, setMode] = useState([-0.31, -0.31]);
  // target_mode

  // min_popularity, max_popularity
  const [popularity, setPopularity] = useCashableState([4, 86], 'popularity');
  // target_popularity

  // min_speechiness, max_speechiness
  const [speechiness, setSpeechiness] = useState([0.4, 0.86]);
  // target_speechiness

  // Target tempo (BPM)
  // min_tempo, max_tempo 205 - 63
  // Tempos are also related to different Genres: Hip Hop 85–95 BPM, Techno 120–125 BPM, House & Pop 115–130 BPM, Electro 128 BPM, Reggaeton >130 BPM, Dubstep 140 BPM
  const [tempo, setTempo] = useCashableState([140, 160], 'tempo');
  // target_tempo
  // min_time_signature, max_time_signature
  const [timeSignature, setTimeSignature] = useState([140, 160]);
  // target_time_signature

  // musical positiveness
  // min_valence, max_valence 0.04 - 0.96 (0 - 1)
  const [valence, setValence] = useState([-0.5, 6.5]);
  // target_valence

}