import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

// Función iniciar sesión
export const iniciarSesion = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(userCredential)
    return userCredential.user;
  } catch (error) {
    // console.log(error.code);
    throw mapFirebaseError(error.code);
  }
};

// Funcion cerrar sesión
export const cerrarSesion = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw "No se pudo cerrar la sesión. Intenta de nuevo.";
  }
};

// Función para mapear los errores de Firebase y devolver mensajes más comprensibles
const mapFirebaseError = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return "El correo ya está registrado.";
    case "auth/invalid-email":
      return "El correo electrónico no es válido.";
    case "auth/user-disabled":
      return "La cuenta ha sido deshabilitada.";
    case "auth/user-not-found":
      return "No existe una cuenta con ese correo.";
    case "auth/wrong-password":
      return "La contraseña es incorrecta.";
    case "auth/invalid-credential":
      return "Correo o contraseña incorrectos.";
    default:
      return "Ocurrió un error inesperado. Intenta nuevamente.";
  }
};
