import { useT } from "../../lib/i18n/LocalizationProvider";
import { DataTable, type Column } from "../../shared/ui/DataTable";
import { PageHeader } from "../../shared/ui/PageHeader";
import { StatusPill } from "../../shared/ui/StatusPill";

type Item = { id: string; name: string; owner: string; status: "Active" | "Paused" | "Archived" };

// Static sample rows on purpose -- this page has no Blocks Data schema and
// makes no GraphQL call, so it renders before any collection is provisioned.
const items: Item[] = [
  { id: "1", name: "Onboarding checklist", owner: "Ayesha R.", status: "Active" },
  { id: "2", name: "Quarterly report", owner: "Tanvir H.", status: "Paused" },
  { id: "3", name: "Vendor contracts", owner: "Nadia K.", status: "Active" },
  { id: "4", name: "Legacy import", owner: "Rafid M.", status: "Archived" },
  { id: "5", name: "Support playbook", owner: "Ayesha R.", status: "Active" }
];

const statusTone = { Active: "good", Paused: "warn", Archived: "neutral" } as const;

export function ItemsPage() {
  const { t } = useT();

  const columns: Column<Item>[] = [
    { key: "name", header: t("items.name"), render: (row) => <strong>{row.name}</strong> },
    { key: "owner", header: t("items.owner"), render: (row) => row.owner },
    { key: "status", header: t("items.status"), render: (row) => <StatusPill tone={statusTone[row.status]}>{row.status}</StatusPill> }
  ];

  return (
    <section>
      <PageHeader
        title={t("items.title")}
        subtitle={t("items.subtitle")}
        actions={<StatusPill tone="neutral">{`${items.length} rows`}</StatusPill>}
      />
      <DataTable columns={columns} rows={items} />
    </section>
  );
}
