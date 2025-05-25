import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

//Funcion para obtener el tipo de usuario
export const obtenerTipoUsuario = async (uid) => {
  const docRef = doc(db, "usuarios", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    throw new Error("No se encontró el tipo de usuario.");
  }

  const datos = docSnap.data();
  if (!datos.tipoUsuario) {
    throw new Error("El usuario no tiene definido un tipo.");
  }

  return datos.tipoUsuario;
};
