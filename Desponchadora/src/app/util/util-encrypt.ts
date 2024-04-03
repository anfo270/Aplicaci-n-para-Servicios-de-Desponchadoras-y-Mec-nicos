import * as CryptoJS from 'crypto-js';

export const encrypt = (data: string, key: string): string => {
    const keyBytes = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.lib.WordArray.random(16); // IV de 128 bits (16 bytes)

    const encrypted = CryptoJS.AES.encrypt(data, keyBytes, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    // Concatenar el IV con el texto cifrado para que pueda ser utilizado en el proceso de descifrado
    const cipherTextWithIV = iv.concat(encrypted.ciphertext);

    // Convertir el texto cifrado (incluyendo el IV) a una representación en Base64 para su almacenamiento o transmisión
    return CryptoJS.enc.Base64.stringify(cipherTextWithIV);
};

// Ejemplo de uso
const encryptedData = encrypt('Hola Mundo', '1234567890123456');
console.log('Texto cifrado:', encryptedData);
