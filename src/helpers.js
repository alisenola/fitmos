// Function responsible for parsing XML AWS response into AWS image resource link
export const awsResponseLocationParser =
  (text) => text.substring(text.indexOf('<Location>') + 10, text.indexOf('</Location>'));

// Fucntion responsible for capitalizing string
export const capitalize =
  (str) => `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length)}`;

// Function responsible for validating email
export const validateEmail = (email) => {
  // eslint-disable-next-line max-len, no-useless-escape
  const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

// Function responsible for form validation
export const validateForm = (form, validator) => {
  Object.keys(form).forEach((key) => {
    if (!{}.hasOwnProperty.call(validator, key)) return;

    if (!validator[key].validate(form[key])) {
      throw new Error(`VALIDATION_ERROR/${validator[key].message}`);
    }
  });
};

// Function responsible for parsing input's value into integer
export const parseNumberInput = (val) => (val ? parseInt(val, 10) : 0);

// Function responsible for parsing AWS image URL into URL of resized image
export const resizedImage = (image, size) => (typeof image !== 'object' ? image :
  ({
    uri: image.uri.replace('images%2F', `resized/${size}%2F`),
  }));

// Function which updates chosen lists with new comment.
export const updateClassListWithComments = (state, list, comment) => {
  const classesList = state.getIn([list, 'list']);
  const classesEntry = classesList.findEntry(({ id }) => id === comment.class.id);

  if (classesEntry) {
    const updatedRecord =
      classesList.get(classesEntry[0]);
    updatedRecord.comments = [...classesEntry[1].comments, comment];
    return state.setIn(
      [list, 'list'],
      classesList.set(classesEntry[0], updatedRecord)
    );
  }

  return state;
};

// Function which updates chosen lists with new signed value for chosen record
export const updateSignedNumber = (state, list, classId, signed, place = 'list') => {
  const newList = state.getIn([list, place]);
  const newClassesEntry = newList.findEntry(({ id }) => id === classId);
  if (newClassesEntry) {
    const updatedEntry = { ...newClassesEntry[1], signed };
    return state.setIn([list, 'list', newClassesEntry[0]], updatedEntry);
  }

  return state;
};

// Function responsible for adjusting google response to state
export const adjustGoogleLocationResponse = (state, place, response) => {
  const resp = response ? response.long_name : undefined;
  const newState = state.setIn(
    ['addClass', 'form', 'location', place],
    resp || state.getIn(['addClass', 'form', 'location', place])
  );

  return newState;
};

// Function which creates S3 archive url from given opentok data
export const createArchiveUrl =
  (apiKey, archiveId) => `https://s3.amazonaws.com/atmosfit-video-archives/${apiKey}/${archiveId}/archive.mp4`;
