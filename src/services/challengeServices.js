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
} from "firebase/firestore";

//Funcion para crear un retp
export const crearReto = async (reto) => {
  try {
    const retoConFecha = {
      ...reto,
      fechaRegistro: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, "retos"), retoConFecha);
    return docRef.id;
  } catch (error) {
    console.error("Error al crear el reto:", error);
    throw error;
  }
};

//Funcion para obtener retos por empresa
export const obtenerRetosPorEmpresa = async (empresa) => {
  try {
    const q = query(
      collection(db, "retos"),
      where("idUsuarioEmpresa", "==", empresa),
      orderBy("fechaRegistro", "desc")
    );

    const querySnapshot = await getDocs(q);

    const retos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return retos;
  } catch (error) {
    console.error("Error al obtener los retos:", error);
    throw error;
  }
};

// Función para actualizar un reto existente
export const actualizarReto = async (idReto, datosActualizados) => {
  try {
    const retoRef = doc(db, "retos", idReto);
    await updateDoc(retoRef, {
      ...datosActualizados,
      fechaActualizacion: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error al actualizar el reto:", error);
    throw error;
  }
};

// Función para eliminar un reto por su ID
export const eliminarRetoPorID = async (idReto) => {
  try {
    const retoRef = doc(db, "retos", idReto);
    await deleteDoc(retoRef);
  } catch (error) {
    console.error("Error al eliminar el reto:", error);
    throw error;
  }
};
