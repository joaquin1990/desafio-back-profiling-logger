import { Router } from "express";

const router = Router();

router.route("/console").get((req, res) => {
  const info = {
    argumentos: process.argv.slice(2),
    plataforma: process.platform,
    node_version: process.version,
    memoria_reservada: process.memoryUsage(),
    excec_path: process.execPath,
    process_id: process.pid,
    project_path: process.cwd(),
  };
  console.log(info);
  res.send(info);
});

router.route("/noconsole").get((req, res) => {
  const info = {
    argumentos: process.argv.slice(2),
    plataforma: process.platform,
    node_version: process.version,
    memoria_reservada: process.memoryUsage(),
    excec_path: process.execPath,
    process_id: process.pid,
    project_path: process.cwd(),
  };
  res.send(info);
});

export default router;
