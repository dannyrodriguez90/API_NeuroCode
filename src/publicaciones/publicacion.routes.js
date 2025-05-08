import { Router } from "express";
import {
    crearPublicacion,
    obtenerPublicaciones,
    obtenerPublicacionPorId,
    obtenerPublicacionesPorCurso,
    actualizarPublicacion,
    eliminarPublicacion,
    eliminarPublicacionPermanente
} from "./publicacion.controller.js";


const router = Router();

router.post("/crearPublicacion/", crearPublicacion);
router.get("/", obtenerPublicaciones);
router.get("obtenerPublicacionID/:id", obtenerPublicacionPorId);
router.get("/obtenerCurso/:cursoId", obtenerPublicacionesPorCurso);
router.put("actualizarPublicacion/:id", actualizarPublicacion);
router.delete("eliminarPublicacion/:id", eliminarPublicacion);
router.delete("/eliminarPermanente/:id", eliminarPublicacionPermanente);

export default router;