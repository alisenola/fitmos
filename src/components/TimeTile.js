import React from 'react';
import moment from 'moment';

import OvalTile from './OvalTile';

// Component responsible for rendering information about class length
export default function TimeTile({ beginsDate, endsDate }) {
  return <OvalTile text={`${moment(endsDate).diff(moment(beginsDate), 'minutes')} min`} />;
}

TimeTile.propTypes = {
  beginsDate: React.PropTypes.number.isRequired,
  endsDate: React.PropTypes.number.isRequired,
};
