import { Router } from 'express';
import controller from './controller.js';

const router = Router();

router.get("/", controller.getStudents);
router.get("/:id", controller.getStudentById);
router.put("/:id", controller.updateStudent);
router.post("/", controller.addStudent);
router.delete("/:id", controller.deleteStudent);

export default router;