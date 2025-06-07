import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  orderBy,
  getDoc,
  collectionGroup,
} from "firebase/firestore";

export const obtenerPostulacionRetoPorEmpresa = async (
  empresaId,
  estadoFiltrado
) => {
  try {
    const retosRef = collection(db, "retos");
    const q = query(retosRef, where("idUsuarioEmpresa", "==", empresaId));
    const retosSnapshot = await getDocs(q);

    const postulaciones = [];

    for (const retoDoc of retosSnapshot.docs) {
      const retoId = retoDoc.id;
      const retoData = retoDoc.data();

      const postulacionesRef = collection(
        db,
        "retos",
        retoId,
        "postulacionReto"
      );
      const postulacionesSnap = await getDocs(postulacionesRef);

      for (const postDoc of postulacionesSnap.docs) {
        const postData = postDoc.data();

        // Filtrar por estado
        if (postData.estado !== estadoFiltrado) continue;

        // Obtener datos del usuario desde la subcolección "persona"
        const userRef = doc(
          db,
          "usuarios",
          postData.idPersona,
          "persona",
          "datos"
        );
        const userSnap = await getDoc(userRef);
        const userData = userSnap.exists() ? userSnap.data() : null;

        postulaciones.push({
          id: postDoc.id,
          ...postData,
          retoId,
          datosReto: {
            id: retoId,
            ...retoData,
          },
          datosUsuario: {
            id: postData.idPersona,
            ...userData,
          },
        });
      }
    }

    return postulaciones;
  } catch (error) {
    console.error("Error al obtener postulaciones:", error);
    return [];
  }
};
