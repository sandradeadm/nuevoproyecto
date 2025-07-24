const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/logs', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        l.hora_y_fecha,
        u.nombre AS usuario,
        o.descripcion AS operacion,
        l.detalle,
        l.ip,
        l.mac,
        l.usuario_afectado
      FROM logs l
      LEFT JOIN usuarios u ON l.id_usuario = u.id_usuario
      LEFT JOIN operaciones o ON l.id_operacion = o.id_operacion
      ORDER BY l.hora_y_fecha DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('Error en /api/logs:', err);
    res.status(500).json({ error: 'Error al obtener los logs.' });
  }
});
router.post('/logs', async (req, res) => {
  try {
    const { id_operacion, id_usuario, detalle, ip, usuario_afectado } = req.body;
    // mac lo dejamos null
    await db.query(`
      INSERT INTO logs (id_operacion, hora_y_fecha, id_usuario, mac, ip, detalle, usuario_afectado)
      VALUES ($1, NOW(), $2, NULL, $3, $4, $5)
    `, [id_operacion, id_usuario, ip || null, detalle, usuario_afectado || null]);
    res.json({ ok: true });
  } catch (err) {
    console.error('Error al insertar log:', err);
    res.status(500).json({ error: 'Error al insertar log.' });
  }
});
module.exports = router;
