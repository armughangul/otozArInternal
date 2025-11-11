import React, {useEffect, useRef, useState} from 'react';
import Voice from '@react-native-voice/voice';
import {useSharedValue, withTiming} from 'react-native-reanimated';
import {PermissionsAndroid, Platform} from 'react-native';
import {AiProps} from '../AiSearchView';
import {getAiFiltersData} from '../../../Network/Services/AiService';
import CommonManager from '../../../utilis/CommonManager';
import { setLoading } from '../../../redux/Reducers/AppReducer';
import { useDispatch } from 'react-redux';
const AiSearchManager = (props: AiProps) => {
  const dispatch = useDispatch()
  const [showVoice, setVoice] = useState(false);
  const [text, setText] = useState('');
  const [recognizedText, setRecognizedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const volume = useSharedValue(0);
  const aiVoiceList = useRef<string[]>([""])
  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);
  const onSpeechStart = () => {
    console.log('🎤 Speech started');
  };

  const onSpeechResults = (event: any) => {
    const text = event.value?.join(' ') || '';
    aiVoiceList.current[aiVoiceList.current.length - 1] = text
    let completeTxt = aiVoiceList.current.reduce((pre,next)=>pre += next + " ","")
    setRecognizedText(completeTxt);
  };

  const onSpeechError = (error: any) => {
    console.log('❌ Speech error:', error);
    if (isListening) startListening();
  };

  const onSpeechEnd = () => {
    console.log('🔁 Speech ended');
    if (isListening) startListening(); // auto restart
  };

  const onSpeechVolumeChanged = (event: any) => {
    const vol = event.value || 0;
    const normalized = Math.min(vol / 10, 1);
    volume.value = withTiming(normalized, {duration: 80});
  };
  const requestAndroidPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const startListening = async () => {
    const hasPermission = await requestAndroidPermission();
    if (!hasPermission) return;
    try {
      setVoice(true);
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  };

  const stopListening = async () => {
    try {
      setIsListening(false);
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };
  const onDeleteVoice = () => {
    aiVoiceList.current = [""]
    stopListening();
    setVoice(false);
  };
  const sendVocie = () => {
    stopListening();
    onAiSearch(recognizedText)
  };
  const onMic = () => {
    aiVoiceList.current = [""]
    setRecognizedText('');
    startListening();
  };
  const onAiSearch = (txt: string) => {
    if (txt == ""){
          CommonManager.shared.showMessage("Please search or speak then ai find its relevant cars")
      return
    }
    dispatch(setLoading(true))
    let params = {
      query: txt,
    };
    getAiFiltersData(params)
      .then(async response => {
        console.log('response is ', response);
            dispatch(setLoading(false))
        props.onSearch(response)
      })
      .catch((response: any) => {
                    dispatch(setLoading(false))
        console.log('Error is ', response);
      });
  };
  const onPause = ()=>{
    stopListening()
  }
  return {
    showVoice,
    setVoice,
    text,
    setText,
    volume,
    recognizedText,
    setRecognizedText,
    isListening,
    setIsListening,
    onMic,
    stopListening,
    onDeleteVoice,
    sendVocie,
    onAiSearch,
    startListening,
    onPause,
    aiVoiceList
  };
};

export default AiSearchManager;
export type AiSearchManagerType = ReturnType<typeof AiSearchManager>;
