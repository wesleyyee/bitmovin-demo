import React from 'react';
import { Link } from 'react-router-dom';

export const VideoList = () => (
  <ul>
    <li><Link to="/video/1">Video 1</Link></li>
    <li><Link to="/video/2">Video 2</Link></li>
  </ul>
);
