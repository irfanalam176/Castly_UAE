import { Platform, Alert } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  request,
  requestMultiple,
  check,
  checkMultiple,
  openSettings,
} from 'react-native-permissions';

// ─── Helper ───────────────────────────────────────────────────────────────────

const showSettingsAlert = (permissionName: string) => {
  Alert.alert(
    `${permissionName} Permission Required`,
    `Please enable ${permissionName} permission in Settings to continue.`,
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ],
  );
};

// ─── Camera ───────────────────────────────────────────────────────────────────

export const requestCameraPermission = async (): Promise<boolean> => {
  const cameraPermission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });

  if (!cameraPermission) return false;

  const currentStatus = await check(cameraPermission);
  if (currentStatus === RESULTS.BLOCKED) { showSettingsAlert('Camera'); return false; }

  const result = currentStatus === RESULTS.GRANTED
    ? RESULTS.GRANTED
    : await request(cameraPermission);

  if (result === RESULTS.BLOCKED) { showSettingsAlert('Camera'); return false; }
  if (result !== RESULTS.GRANTED) return false;

  // ── Also request storage on Android ≤ 12 so saveToPhotos works ──
  if (Platform.OS === 'android') {
    const apiLevel = Number(Platform.Version);

    if (apiLevel >= 33) {
      // Android 13+ — request media permissions
      const mediaResults = await requestMultiple([
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.READ_MEDIA_VIDEO,
      ]);
      const allGranted = Object.values(mediaResults).every(r => r === RESULTS.GRANTED);
      if (!allGranted) showSettingsAlert('Media Library');
      // Don't block camera if media denied — saveToPhotos just won't save
    } else {
      // Android ≤ 12 — request write storage
      const writeStatus = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      if (writeStatus !== RESULTS.GRANTED) {
        const writeResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        if (writeResult === RESULTS.BLOCKED) showSettingsAlert('Storage');
      }
    }
  }

  return true;
};

// ─── Microphone ───────────────────────────────────────────────────────────────

export const requestMicrophonePermission = async (): Promise<boolean> => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.MICROPHONE,
    android: PERMISSIONS.ANDROID.RECORD_AUDIO,
  });

  if (!permission) return false;

  const currentStatus = await check(permission);

  if (currentStatus === RESULTS.GRANTED) return true;

  if (currentStatus === RESULTS.BLOCKED) {
    showSettingsAlert('Microphone');
    return false;
  }

  const result = await request(permission);
  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.BLOCKED) {
    showSettingsAlert('Microphone');
  }

  return false;
};

// ─── Photo Library ────────────────────────────────────────────────────────────

export const requestPhotoLibraryPermission = async (): Promise<boolean> => {
  // Android 13+ uses the system photo picker — no permission needed
  if (Platform.OS === 'android' && Number(Platform.Version) >= 33) {
    return true;
  }

  const permission = Platform.select({
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
    android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
  });

  if (!permission) return false;

  const currentStatus = await check(permission);

  if (currentStatus === RESULTS.GRANTED || currentStatus === RESULTS.LIMITED) return true;

  if (currentStatus === RESULTS.BLOCKED) {
    showSettingsAlert('Photo Library');
    return false;
  }

  const result = await request(permission);
  if (result === RESULTS.GRANTED || result === RESULTS.LIMITED) return true;

  if (result === RESULTS.BLOCKED) {
    showSettingsAlert('Photo Library');
  }

  return false;
};

// ─── Camera + Microphone ──────────────────────────────────────────────────────

export const requestCameraAndMicPermission = async (): Promise<boolean> => {
  const permissions = Platform.select({
    ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
    android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
  });

  if (!permissions) return false;

  const currentStatuses = await checkMultiple(permissions);

  const allGranted = Object.values(currentStatuses).every(r => r === RESULTS.GRANTED);
  if (allGranted) return true;

  // Only skip dialog if BLOCKED
  const anyBlocked = Object.values(currentStatuses).some(r => r === RESULTS.BLOCKED);
  if (anyBlocked) {
    showSettingsAlert('Camera and Microphone');
    return false;
  }

  // UNDETERMINED or DENIED — ask once
  const results = await requestMultiple(permissions);
  const allNowGranted = Object.values(results).every(r => r === RESULTS.GRANTED);
  if (allNowGranted) return true;

  const anyNowBlocked = Object.values(results).some(r => r === RESULTS.BLOCKED);
  if (anyNowBlocked) {
    showSettingsAlert('Camera and Microphone');
  }

  return false;
};
// ─── Location ────────────────────────────────────────────────────────────────

export const requestLocationPermission = async (): Promise<boolean> => {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });

  if (!permission) return false;

  const currentStatus = await check(permission);

  if (currentStatus === RESULTS.GRANTED) return true;

  if (currentStatus === RESULTS.BLOCKED) {
    showSettingsAlert('Location');
    return false;
  }

  const result = await request(permission);
  if (result === RESULTS.GRANTED) return true;

  if (result === RESULTS.BLOCKED) {
    showSettingsAlert('Location');
  }

  return false;
};

export const requestDocumentPickerPermission = async (): Promise<boolean> => {
  // Android 13+ uses system picker — no permission needed
  if (Platform.OS === 'android' && Number(Platform.Version) >= 33) {
    return true;
  }

  // Android ≤ 12 needs READ_EXTERNAL_STORAGE
  if (Platform.OS === 'android') {
    const permission = PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.GRANTED) return true;

    if (currentStatus === RESULTS.BLOCKED) {
      showSettingsAlert('Storage');
      return false;
    }

    const result = await request(permission);
    if (result === RESULTS.GRANTED) return true;

    if (result === RESULTS.BLOCKED) showSettingsAlert('Storage');
    return false;
  }

  return true; // iOS — no permission needed for document picker
};