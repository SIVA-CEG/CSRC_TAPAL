import { useEffect, useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import NewTapal from "./pages/NewTapal";
import AssignedTapal from "./pages/AssignedTapal";
import CompletedTapal from "./pages/CompletedTapal";
import TapalView from "./pages/TapalView";
import TapalSearch from "./pages/TapalSearch";
import {
  getTapals,
  assignTapal,
  transferTapal,
  completeTapal,
  markHardCopyReceived,
} from "./api/tapalApi";


const formatDate = (date) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString("en-GB").replace(/\//g, "-");
};

const mapTapal = (t) => ({
  id: t.tapal_no,
  acceptanceId: t.acceptance_id,
  tapalDate: formatDate(t.tapal_date),
  referenceDate: formatDate(t.reference_date),
  referenceNo: t.reference_no,
  mhFileNo: t.mh_file_no,
  ctdtCategory: t.ctdt_category,
  documentType: t.document_type,
  tapalFrom: t.tapal_from,
  department: t.department,
  campus: t.campus,
  amount: t.amount,
  tapalMode: t.tapal_mode,
  subject: t.subject,
  status: t.status,
  assignedTo: t.assigned_to,
  assignedAt: formatDate(t.assigned_at),
  remarks: t.remarks,
  despatchDate: formatDate(t.despatch_date),
  billUrl: t.bill_file
    ? `http://localhost:5000${t.bill_file}`
    : "/dummy-bill.pdf",
  billFileName: t.bill_file,
  hardCopyReceivedDate: formatDate(t.hard_copy_received_date),
hardCopyReceivedDateRaw: t.hard_copy_received_date
  ? t.hard_copy_received_date.split("T")[0]
  : "",
});

export default function App() {
  const [active, setActive] = useState("new");
  const [tapals, setTapals] = useState([]);

  const loadTapals = async () => {
    const data = await getTapals();
    setTapals(data.map(mapTapal));
  };

  useEffect(() => {
    loadTapals();
  }, []);

  const onAdd = async () => {
    await loadTapals();
  };

  const onAssign = async (id, assignedTo, remarks) => {
    await assignTapal(id, { assignedTo, remarks });
    await loadTapals();
  };

  const onTransfer = async (id, transferTo, remarks) => {
    await transferTapal(id, { transferTo, remarks });
    await loadTapals();
  };

  const onComplete = async (id) => {
    await completeTapal(id);
    await loadTapals();
  };

  const counts = {
    new: tapals.filter((t) => t.status === "new").length,
    assigned: tapals.filter((t) => t.status === "assigned").length,
    completed: tapals.filter((t) => t.status === "completed").length,
  };
  const onHardCopyReceived = async (id, hardCopyReceivedDate) => {
  await markHardCopyReceived(id, hardCopyReceivedDate);
  await loadTapals();
};

  const pages = {
  new: (
  <NewTapal
    tapals={tapals}
    onAssign={onAssign}
    onAdd={onAdd}
    onHardCopyReceived={onHardCopyReceived}
  />
),

  assigned: (
    <AssignedTapal
      tapals={tapals}
      onTransfer={onTransfer}
      onComplete={onComplete}
    />
  ),

  completed: <CompletedTapal tapals={tapals} />,

  view: <TapalView tapals={tapals} />,

  search: <TapalSearch tapals={tapals} />,
};
  return (
    <Layout active={active} setActive={setActive} counts={counts}>
      {pages[active]}
    </Layout>
  );
}