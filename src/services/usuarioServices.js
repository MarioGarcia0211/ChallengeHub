// services/usuarioService.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function obtenerDatosUsuario() {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const uid = user.uid;
          const usuarioRef = doc(db, "usuarios", uid);
          const usuarioSnap = await getDoc(usuarioRef);

          if (!usuarioSnap.exists()) {
            reject("No se encontró el documento del usuario");
            return;
          }

          const { tipoUsuario } = usuarioSnap.data();

          const datosRef = doc(db, "usuarios", uid, tipoUsuario, "datos");
          const datosSnap = await getDoc(datosRef);

          if (!datosSnap.exists()) {
            reject("No se encontró el documento de datos");
            return;
          }

          const datosUsuario = {
            ...datosSnap.data(),
            fotoPerfil: datosSnap.data().fotoPerfil || "/src/assets/nagi.jpg",
          };

          resolve(datosUsuario);
        } catch (error) {
          reject(error);
        }
      } else {
        reject("Usuario no autenticado");
      }
    });
  });
}
