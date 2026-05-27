import { useMemo, useState } from "react";
import DataTable from "../components/common/DataTable";
import TapalDetailModal from "../components/tapal/TapalDetailModal";
import AssignModal from "../components/tapal/AssignModal";
import TapalForm from "../components/tapal/TapalForm";

export default function NewTapal({ tapals, onAssign, onAdd }) {
  const [detail, setDetail] = useState(null);
  const [assign, setAssign] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const newTapals = useMemo(
    () => tapals.filter((tapal) => tapal.status === "new"),
    [tapals]
  );

  const rowsWithIdx = newTapals.map((tapal, index) => ({
    ...tapal,
    slNo: index + 1,
  }));

  const columns = [
    { key: "slNo", label: "Sl.No." },
    {
      key: "id",
      label: "Tapal ID",
      render: (tapal) => (
        <button className="tapal-id-link" onClick={() => setDetail(tapal)}>
          {tapal.id}
        </button>
      ),
    },
    { key: "mhFileNo", label: "M.H.No / File No." },
    { key: "tapalDate", label: "Date" },
    { key: "ctdtCategory", label: "Category" },
    { key: "documentType", label: "Tapal Type" },
    { key: "tapalFrom", label: "Tapal From" },
    {
  key: "bill",
  label: "View Bill",
  render: (t) => (
    <button
      className="btn btn-outline btn-sm"
      onClick={() => window.open(t.billUrl || "/dummy-bill.pdf", "_blank")}
    >
      View Bill
    </button>
  ),
},
    {
      key: "action",
      label: "Action",
      render: (tapal) => (
        <button className="btn btn-primary btn-sm" onClick={() => setAssign(tapal)}>
          Assign
        </button>
      ),
    },
  ];

  return (
    <div className="page-stack">
      <div className="page-header-row">
        <div>
          <h2 className="page-title">New Tapals</h2>
          <p className="page-subtitle">Incoming tapals pending assignment</p>
        </div>

        <button
          className={`btn ${showForm ? "btn-outline" : "btn-primary"}`}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {showForm ? "✕ Cancel" : "+ Add New Tapal"}
        </button>
      </div>

      {showForm && (
        <div className="card form-card">
          <div className="card-header">
            <div>
              <h3>Add New Tapal</h3>
              <p>Enter tapal details carefully before saving.</p>
            </div>
          </div>

          <TapalForm
            onAdd={(data) => {
              onAdd(data);
              setShowForm(false);
            }}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <div>
            <h3>Pending Tapals</h3>
            <p>{newTapals.length} records available for assignment</p>
          </div>
        </div>

        <DataTable
          columns={columns}
          rows={rowsWithIdx}
          totalLabel={`${newTapals.length} record${newTapals.length !== 1 ? "s" : ""}`}
        />
      </div>

      {detail && (
        <TapalDetailModal tapal={detail} onClose={() => setDetail(null)} />
      )}

      {assign && (
        <AssignModal
          tapal={assign}
          onClose={() => setAssign(null)}
          onAssign={onAssign}
        />
      )}
    </div>
  );
}