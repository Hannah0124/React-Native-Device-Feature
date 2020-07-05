import * FileSystem from 'expo-file-system';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
  return async dispatch => {
    
    const fileName = image.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    // I want to move a file here
    try {
      await FileSystem.moveAsync({
        from: image, // where the file currently sits
        to: newPath
      });
    } catch(err) {
      console.log(err);
      throw err;
    }

    dispatch({ type: ADD_PLACE, placeData: { title: title, image: newPath } });
  };
};