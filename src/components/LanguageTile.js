import React from 'react';
import { languages } from 'country-data';

import { capitalize } from '../helpers';

import OvalTile from './OvalTile';

// Component responsible for rendering language from languge code
export default function LocationTile({ language }) {
  return <OvalTile text={`${capitalize(languages[language].name)}`} />;
}

LocationTile.propTypes = {
  language: React.PropTypes.string.isRequired,
};
