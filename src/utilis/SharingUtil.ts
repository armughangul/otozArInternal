import {Directory, File, Paths} from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {Alert, Linking} from 'react-native';
import CommonManager from './CommonManager';
import { setLoading } from '../redux/Reducers/AppReducer';

export const showFile = (url: string) => {
        console.log("url for open ",url)
  Linking.openURL(url).catch((err: any) =>
    console.error('An error occurred', err),
  );
};
export const downloadAndSaveFile = async (fileUrl: string) => {
    console.log("url for download ",fileUrl)
    CommonManager.shared.dispatch!(setLoading(true))
  const destination = new Directory(Paths.cache, 'pdfs');
  try {
    if (destination.exists){
      destination.delete()
    }
    destination.create();
    const output = await File.downloadFileAsync(fileUrl, destination);
          CommonManager.shared.dispatch!(setLoading(false))
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(output.uri);
    } else {
      Alert.alert('Downloaded', 'File saved to app folder:\n' + output.uri);
    }
  } catch (error) {
    console.error(error);
  }
};
