// import RNFS from 'react-native-fs';

// type MediaType = {
//   uri: string;
//   fileName: string;
//   type: string;
//   fileSize?: number;
// };

// export const uploadToS3 = async (
//   uploadUrl: string,
//   file: MediaType,
//   onProgress?: (percent: number) => void
// ): Promise<boolean> => {
//   try {
//     // Remove 'file://' prefix if present
//     const filePath = file.uri.replace('file://', '');

//     const uploadResult = await RNFS.uploadFiles({
//       toUrl: uploadUrl,
//       files: [
//         {
//           name: 'file', // S3 presigned URL ignores the name, but required by RNFS
//           filename: file.fileName,
//           filepath: filePath,
//           filetype: file.type,
//         },
//       ],
//       method: 'PUT',
//       headers: {
//         'Content-Type': file.type,
//       },
//       // Progress callback
//       progress: (event) => {
//         const percent = Math.round((event.totalBytesSent / event.totalBytesExpectedToSend) * 100);
//         onProgress?.(percent);
//       },
//     //   progressDivider: 1, // call progress every 1%
//     }).promise;

//     if (uploadResult.statusCode >= 200 && uploadResult.statusCode < 300) {
//       return true;
//     } else {
//       console.log('S3 upload failed status:', uploadResult.statusCode);
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.log('S3 upload error:', error);
//     throw error;
//   }
// };

// import RNFS from 'react-native-fs';
// import { Buffer } from 'buffer';

// type MediaType = {
//   uri: string;
//   fileName: string;
//   type: string;
//   fileSize?: number;
// };

// export const uploadToS3 = async (
//   uploadUrl: string,
//   file: MediaType,
//   onProgress?: (percent: number) => void
// ): Promise<boolean> => {
//   try {
//     // 1️⃣ Remove file:// prefix for RNFS
//     const filePath = file.uri.replace('file://', '');

//     // 2️⃣ Read file as base64
//     const base64Data = await RNFS.readFile(filePath, 'base64');

//     // 3️⃣ Convert to binary buffer
//     const buffer = Buffer.from(base64Data, 'base64');

//     // 4️⃣ Upload via fetch
//     const response = await fetch(uploadUrl, {
//       method: 'PUT', // S3 presigned URL
//       headers: {
//         'Content-Type': file.type,
//         // You can also add other headers S3 might need, e.g. 'x-amz-acl': 'public-read'
//       },
//       body: buffer, // raw binary
//     });

//     if (response.ok) {
//       return true;
//     } else {
//       console.log('S3 upload failed status:', response.status);
//       throw new Error('Upload failed');
//     }
//   } catch (error) {
//     console.log('S3 upload error:', error);
//     throw error;
//   }
// };

import RNFS from 'react-native-fs';
import { Buffer } from 'buffer';
import { ROUTES } from '../services/routes';
import { store } from '../redux/stores/store';
import { setTokens, logout } from '../redux/reducers/userSlice';
import ReactNativeBlobUtil from 'react-native-blob-util';
const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = store.getState().user.refreshToken;
  if (!refreshToken) {
    store.dispatch(logout());
    return null;
  }

  try {
    const res = await fetch(`${ROUTES.BASE_URL}/${ROUTES.refresh_token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      store.dispatch(logout());
      return null;
    }

    const data = await res.json();
    store.dispatch(
      setTokens({
        accessToken: data.tokens.accessToken,
        refreshToken: data.tokens.refreshToken,
      }),
    );
    return data.tokens.accessToken;
  } catch (err) {
    store.dispatch(logout());
    return null;
  }
};

type MediaType = {
  uri: string;
  fileName: string;
  type: string;
  fileSize?: number;
};

export type PresignResponse = {
  key: string;
  publicUrl: string;
  fileUrl: string;
  uploadUrl: string;
  method: 'PUT';
  contentType: string;
  expiresIn: number;
};

// export const getPresignedUrl = async (
//   filename: string,
//   accessToken: string,
// ): Promise<PresignResponse> => {
//   const response = await fetch(
//     `${ROUTES.BASE_URL}/${ROUTES.storage_presigned_url}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify({ filename }),
//     },
//   );

//   if (!response.ok) {
//     const errorBody = await response.text(); // 👈 add this
//     console.log('Presign failed — status:', response.status, 'body:', errorBody);
//     throw new Error(`Failed to get presigned URL (${response.status})`);
//   }

//   return response.json();
// };

export const getPresignedUrl = async (
  filename: string,
  accessToken: string,
): Promise<PresignResponse> => {
  
  const fetchPresign = async (token: string) => {
    const response = await fetch(
      `${ROUTES.BASE_URL}/${ROUTES.storage_presigned_url}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename }),
      },
    );

    if (!response.ok) {
      if (response.status === 401) throw new Error('Unauthorized');
      const errorBody = await response.text();
      throw new Error(`Presign failed (${response.status}): ${errorBody}`);
    }
    return response.json();
  };

  try {
    return await fetchPresign(accessToken);
  } catch (err: any) {
    if (err.message === 'Unauthorized') {
      const newToken = await refreshAccessToken();
      if (!newToken) throw new Error('Token refresh failed');
      return fetchPresign(newToken); // retry with new token
    }
    throw err;
  }
};

// export const uploadToS3 = async (
//   uploadUrl: string,
//   file: MediaType,
//   contentType: string, // ✅ use contentType from presign response
// ): Promise<boolean> => {
//   try {
//     const filePath = file.uri.replace('file://', '');
//     const base64Data = await RNFS.readFile(filePath, 'base64');
//     const buffer = Buffer.from(base64Data, 'base64');

//     console.log('Uploading to S3 with contentType:', contentType);

//     const response = await fetch(uploadUrl, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': contentType, // ✅ must match what presign was generated with
//       },
//       body: buffer,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.log('S3 error response:', errorText);
//       throw new Error(`S3 upload failed: ${response.status}`);
//     }
//     return true;
//   } catch (error) {
//     console.log('S3 upload error:', error);
//     throw error;
//   }
// };

export const uploadToS3 = async (
  uploadUrl: string,
  file: MediaType,
  contentType: string,
): Promise<boolean> => {
  try {
    const filePath = file.uri.replace('file://', '');

    const response = await ReactNativeBlobUtil.fetch(
      'PUT',
      uploadUrl,
      {
        'Content-Type': contentType,
      },
      ReactNativeBlobUtil.wrap(filePath), // streams file directly from disk
    );

    const status = response.respInfo.status;

    if (status >= 200 && status < 300) {
      return true;
    }

    console.log('S3 upload failed:', status, response.text());
    throw new Error(`S3 upload failed: ${status}`);
  } catch (error) {
    console.log('S3 upload error:', error);
    throw error;
  }
};
// export const presignAndUpload = async (
//   uri: string,
//   fileName: string,
//   type: string,
//   accessToken: string,
// ): Promise<{ fileUrl: string; key: string }> => {  // ✅ return both
//   const presign = await getPresignedUrl(fileName, accessToken);
//   console.log('Presign response:', presign);
//   await uploadToS3(presign.uploadUrl, { uri, fileName, type }, presign.contentType);
//   return {
//     fileUrl: presign.fileUrl,
//     key: presign.key, // ✅
//   };

export const presignAndUpload = async (
  uri: string,
  fileName: string,
  type: string,
  accessToken: string,
): Promise<{ fileUrl: string; key: string }> => {
  // ✅ automatically refreshes token if expired
  const presign = await getPresignedUrl(fileName, accessToken);

  await uploadToS3(
    presign.uploadUrl,
    { uri, fileName, type },
    presign.contentType,
  );

  return {
    fileUrl: presign.fileUrl,
    key: presign.key,
  };
};
