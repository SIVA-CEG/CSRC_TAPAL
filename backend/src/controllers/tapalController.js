const pool = require("../config/db");

exports.getTapals = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tapals ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addTapal = async (req, res) => {
  try {
    const {
      tapalNo,
      acceptanceId,
      tapalDate,
      referenceDate,
      referenceNo,
      mhFileNo,
      ctdtCategory,
      documentType,
      tapalFrom,
      department,
      campus,
      amount,
      tapalMode,
      subject,
    } = req.body;

    const billFile = req.file ? `/uploads/bills/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO tapals 
      (tapal_no, acceptance_id, tapal_date, reference_date, reference_no, mh_file_no,
       ctdt_category, document_type, tapal_from, department, campus, amount,
       tapal_mode, subject, bill_file)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
       RETURNING *`,
      [
        tapalNo,
        acceptanceId,
        tapalDate,
        referenceDate,
        referenceNo,
        mhFileNo,
        ctdtCategory,
        documentType,
        tapalFrom,
        department,
        campus,
        amount,
        tapalMode,
        subject,
        billFile,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignTapal = async (req, res) => {
  try {
    const { assignedTo, remarks } = req.body;

    const result = await pool.query(
      `UPDATE tapals 
       SET status='assigned', assigned_to=$1, assigned_at=CURRENT_DATE, remarks=$2
       WHERE tapal_no=$3 RETURNING *`,
      [assignedTo, remarks, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.transferTapal = async (req, res) => {
  try {
    const { transferTo, remarks } = req.body;

    const result = await pool.query(
      `UPDATE tapals 
       SET assigned_to=$1, assigned_at=CURRENT_DATE, remarks=$2
       WHERE tapal_no=$3 RETURNING *`,
      [transferTo, remarks, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.completeTapal = async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE tapals 
       SET status='completed', despatch_date=CURRENT_DATE
       WHERE tapal_no=$1 RETURNING *`,
      [req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};