import { useMemo, useState, type ReactNode } from "react";
import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle.js";
import BarChart3 from "lucide-react/dist/esm/icons/bar-chart-3.js";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2.js";
import Clock3 from "lucide-react/dist/esm/icons/clock-3.js";
import Database from "lucide-react/dist/esm/icons/database.js";
import FileBox from "lucide-react/dist/esm/icons/file-box.js";
import FileCheck2 from "lucide-react/dist/esm/icons/file-check-2.js";
import FileWarning from "lucide-react/dist/esm/icons/file-warning.js";
import Info from "lucide-react/dist/esm/icons/info.js";
import Maximize2 from "lucide-react/dist/esm/icons/maximize-2.js";
import MoreHorizontal from "lucide-react/dist/esm/icons/more-horizontal.js";
import Network from "lucide-react/dist/esm/icons/network.js";
import RefreshCw from "lucide-react/dist/esm/icons/refresh-cw.js";
import SearchX from "lucide-react/dist/esm/icons/search-x.js";
import Star from "lucide-react/dist/esm/icons/star.js";
import X from "lucide-react/dist/esm/icons/x.js";
import Zap from "lucide-react/dist/esm/icons/zap.js";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button, Select } from "../components/ui/shared";
import {
  dashboardExampleData,
  type DashboardListItem,
  type DateRange,
  type DemoPageState,
  type MetricData,
  type NamedValue,
  type ResourceType,
  type TaskItem,
  type TaskSeverity,
} from "./dashboardExampleData";

const dateRangeOptions: Array<{ value: DateRange; label: string }> = [
  { value: "1d", label: "1 Day" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
];

const demoStates: Array<{ value: DemoPageState; label: string }> = [
  { value: "populated", label: "Populated" },
  { value: "loading", label: "Loading" },
  { value: "empty", label: "Empty" },
  { value: "error", label: "Error" },
];

export function DashboardExamplePage() {
  const [dateRange, setDateRange] = useState<DateRange>("7d");
  const [demoState, setDemoState] = useState<DemoPageState>("populated");
  const [infoVisible, setInfoVisible] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [favouriteOverrides, setFavouriteOverrides] = useState<Record<string, boolean>>({});
  const data = dashboardExampleData[dateRange];

  const favourites = useMemo(
    () => data.favourites.map((item) => ({ ...item, favourite: favouriteOverrides[item.id] ?? item.favourite })),
    [data.favourites, favouriteOverrides],
  );
  const metrics = useMemo(
    () => [...data.metrics].sort((left, right) => Number(right.id === "scheduledJobs") - Number(left.id === "scheduledJobs")),
    [data.metrics],
  );

  const showToast = (message: string) => {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage(null), 2400);
  };

  const handleTaskAction = (task: TaskItem) => {
    showToast(`Open: ${task.title}`);
  };

  const handleFavouriteToggle = (item: DashboardListItem) => {
    setFavouriteOverrides((current) => ({ ...current, [item.id]: !(current[item.id] ?? item.favourite) }));
    showToast(`${item.name} ${item.favourite ? "removed from" : "added to"} favourites`);
  };

  return (
    <article className="fx-dashboard-page">
      <div className="fx-dashboard-welcome">
        <div>
          <h1>Welcome, Demo</h1>
        </div>
      </div>

      <div className="fx-dashboard-setup-row">
        {infoVisible && (
          <InformationBox
            title="Complete your data source setup"
            body="Two draft data sources still require connection details before discovery can begin."
            action="Review sources"
            icon={<Info size={18} />}
            onAction={() => showToast("Review sources action")}
            onDismiss={() => setInfoVisible(false)}
          />
        )}
        <SegmentedControl value={dateRange} options={dateRangeOptions} onChange={setDateRange} />
      </div>

      {demoState === "loading" ? (
        <LoadingDashboard />
      ) : demoState === "empty" ? (
        <EmptyDashboard />
      ) : demoState === "error" ? (
        <ErrorDashboard onRetry={() => setDemoState("populated")} />
      ) : (
        <>
          <SectionHeader title="Metrics" description="Compact cards compare values, trends, statuses and supporting context." />
          <section className="fx-dashboard-metric-grid" aria-label="Dashboard metrics">
            {metrics.map((metric) => <MetricCard key={metric.id} metric={metric} />)}
          </section>

          <SectionHeader title="Graphs" description="Larger chart cards use the existing Recharts library and theme chart tokens." />
          <section className="fx-dashboard-graph-grid" aria-label="Dashboard graphs">
            <GraphCard title="Data Sources" description="Connected sources sorted from highest to lowest.">
              <HorizontalValueChart data={data.graphs.sourcesByType.slice(0, 5)} dataKeyLabel="Connected sources" />
            </GraphCard>
            <GraphCard title="Data Objects by Size" description="Size groups include their entity-count definitions in the tooltip.">
              <HorizontalValueChart data={data.graphs.objectsBySize} dataKeyLabel="Data objects" />
            </GraphCard>
            <GraphCard title="Cache Runs" description="Completed cache runs for the selected period.">
              <CacheRunsChart data={data.graphs.cacheRuns} />
            </GraphCard>
            <GraphCard title="Discovery Status" description="Discovery processes grouped by current status, including AI-stopped runs.">
              <HorizontalValueChart data={data.graphs.discoveryStatus} dataKeyLabel="Discoveries" />
            </GraphCard>
            <GraphCard title="Publications" description="Requests, approvals and rejections are grouped for comparison.">
              <PublicationsChart data={data.graphs.publications} />
            </GraphCard>
            {[0, 1, 2].map((index) => <GraphEmptyState key={index} />)}
          </section>

          <SectionHeader title="Cards" description="Large dashboard cards show list, table and task formats at two cards per row." />
          <section className="fx-dashboard-large-grid" aria-label="Dashboard cards">
            <ListCard title="Favourites" onOpen={() => showToast("Open favourites")}>
              {favourites.map((item) => <ResourceRow key={item.id} item={item} context="type" onFavouriteToggle={handleFavouriteToggle} showFavourite />)}
            </ListCard>
            <ListCard title="Popular" onOpen={() => showToast("Open popular items")}>
              {data.popular.map((item) => <ResourceRow key={item.id} item={item} context="none" />)}
            </ListCard>
            <ListCard title="Recent" onOpen={() => showToast("Open recent activity")}>
              {data.recent.map((item) => <ResourceRow key={item.id} item={item} context="type" action="open" onOpen={() => showToast(`Open: ${item.name}`)} />)}
            </ListCard>
            <ListCard title="Tasks" onOpen={() => showToast("Open tasks")}>
              {data.tasks.map((task) => <TaskRow key={task.id} task={task} onOpen={handleTaskAction} />)}
            </ListCard>
          </section>
        </>
      )}

      <section className="fx-dashboard-demo-state">
        <Select label="Demo state" value={demoState} onChange={(event) => setDemoState(event.target.value as DemoPageState)}>
          {demoStates.map((state) => <option key={state.value} value={state.value}>{state.label}</option>)}
        </Select>
      </section>

      {toastMessage && (
        <div className="fx-dashboard-toast" role="status">
          <CheckCircle2 size={16} />
          <span>{toastMessage}</span>
        </div>
      )}
    </article>
  );
}

function InformationBox({ title, body, icon, action, onAction, onDismiss }: { title: string; body: string; icon?: ReactNode; action?: string; onAction?: () => void; onDismiss: () => void }) {
  return (
    <section className="fx-dashboard-info-box">
      <div className="fx-dashboard-info-icon" aria-hidden="true">{icon}</div>
      <div className="fx-dashboard-info-copy">
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
      {action && <Button size="sm" variant="surface" suffixIcon={false} onClick={onAction}>{action}</Button>}
      <button className="fx-dashboard-icon-button fx-focus" type="button" aria-label="Dismiss information box" onClick={onDismiss}>
        <X size={16} />
      </button>
    </section>
  );
}

function SegmentedControl({ value, options, onChange }: { value: DateRange; options: Array<{ value: DateRange; label: string }>; onChange: (value: DateRange) => void }) {
  return (
    <div className="fx-dashboard-segmented" role="radiogroup" aria-label="Date range">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`fx-dashboard-segment fx-focus ${value === option.value ? "is-active" : ""}`}
          role="radio"
          aria-checked={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="fx-dashboard-section-header">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

function MetricCard({ metric }: { metric: MetricData }) {
  return (
    <article className="fx-dashboard-metric-card">
      <div className="fx-dashboard-metric-topline">
        <HoverTooltipHeading title={metric.heading} tooltip={metric.definition} />
      </div>
      <p className="fx-dashboard-metric-value">{metric.value}</p>
      {metric.id !== "scheduledJobs" && (
        <p className={`fx-dashboard-trend fx-dashboard-trend-${metric.trendTone}`}>
          <span>{metric.comparison}</span>
        </p>
      )}
    </article>
  );
}

function GraphCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <article className="fx-dashboard-graph-card">
      <div className="fx-dashboard-card-heading">
        <HoverTooltipHeading title={title} tooltip={description} />
        <button className="fx-dashboard-icon-button fx-focus" type="button" aria-label={`${title} options`}>
          <MoreHorizontal size={17} />
        </button>
      </div>
      <div className="fx-dashboard-chart-frame">{children}</div>
    </article>
  );
}

function GraphEmptyState() {
  const description = "An additional dashboard visualisation can be placed here.";
  return (
    <article className="fx-dashboard-graph-card fx-dashboard-graph-empty">
      <div className="fx-dashboard-card-heading">
        <HoverTooltipHeading title="Graph example" tooltip={description} />
      </div>
      <div className="fx-dashboard-empty-chart" aria-hidden="true">
        <BarChart3 size={36} />
        <span />
        <span />
        <span />
      </div>
    </article>
  );
}

function HorizontalValueChart({ data, dataKeyLabel }: { data: NamedValue[]; dataKeyLabel: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} layout="vertical" margin={{ top: 4, right: 16, bottom: 4, left: 8 }} accessibilityLayer>
        <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" horizontal={false} />
        <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} />
        <YAxis dataKey="name" type="category" width={98} tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip content={<DashboardChartTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
        <Bar dataKey="value" name={dataKeyLabel} fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

function CacheRunsChart({ data }: { data: Array<{ label: string; completed: number; failed: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }} accessibilityLayer>
        <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} width={36} />
        <Tooltip content={<DashboardChartTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
        <Bar dataKey="completed" name="Completed" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

function PublicationsChart({ data }: { data: Array<{ label: string; requests: number; approvals: number; rejections: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={data} margin={{ top: 4, right: 8, bottom: 4, left: 0 }} accessibilityLayer>
        <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} allowDecimals={false} width={32} />
        <Tooltip content={<DashboardChartTooltip />} cursor={{ fill: "var(--surface-hover)" }} />
        <Legend wrapperStyle={legendStyle} />
        <Bar dataKey="requests" name="Requests" fill="var(--chart-1)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="approvals" name="Approvals" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
        <Bar dataKey="rejections" name="Rejections" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}

const chartFontFamily = "Inter, ui-sans-serif, system-ui, sans-serif";
const axisTick = { fill: "var(--foreground-subtle)", fontFamily: chartFontFamily, fontSize: 11, fontWeight: 500 };
const legendStyle = { color: "var(--foreground-subtle)", fontFamily: chartFontFamily, fontSize: 11, fontWeight: 500 };

function HoverTooltipHeading({ title, tooltip }: { title: string; tooltip: string }) {
  return (
    <div className="fx-dashboard-heading-tooltip" tabIndex={0}>
      <h3>{title}</h3>
      <span role="tooltip">{tooltip}</span>
    </div>
  );
}

function DashboardChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | string; color?: string; payload?: NamedValue }>; label?: string }) {
  if (!active || !payload?.length) return null;
  const heading = label ?? payload[0]?.payload?.name;
  const definition = payload[0]?.payload?.definition;
  return (
    <div className="fx-dashboard-chart-tooltip">
      {heading && <strong>{heading}</strong>}
      {payload.map((entry) => (
        <span key={entry.name}>
          <i style={{ background: entry.color }} />
          {entry.name}: {entry.value}
        </span>
      ))}
      {definition && <small>{definition}</small>}
    </div>
  );
}

function ListCard({ title, children, onOpen }: { title: string; children: ReactNode; onOpen: () => void }) {
  return (
    <article className="fx-dashboard-list-card">
      <div className="fx-dashboard-card-heading">
        <h3>{title}</h3>
        <button className="fx-dashboard-icon-button fx-focus" type="button" aria-label={`Open ${title}`} onClick={onOpen}>
          <Maximize2 size={16} />
        </button>
      </div>
      <div className="fx-dashboard-list-body">{children}</div>
    </article>
  );
}

function ResourceRow({ item, context = "full", action = "menu", showFavourite, onFavouriteToggle, onOpen }: { item: DashboardListItem; context?: "full" | "type" | "none"; action?: "menu" | "open"; showFavourite?: boolean; onFavouriteToggle?: (item: DashboardListItem) => void; onOpen?: () => void }) {
  const Icon = resourceIcon(item.resourceType);
  return (
    <div className="fx-dashboard-list-row">
      <span className="fx-dashboard-resource-icon" aria-hidden="true"><Icon size={17} /></span>
      <div className="fx-dashboard-row-main">
        <p>{item.name}</p>
        {context === "full" && <span>{item.resourceType} · {item.meta}</span>}
        {context === "type" && <span>{item.resourceType}</span>}
      </div>
      <div className="fx-dashboard-row-meta">
        <span>{item.detail}</span>
      </div>
      {showFavourite && (
        <button className={`fx-dashboard-icon-button fx-focus ${item.favourite ? "is-favourite" : ""}`} type="button" aria-label={`${item.favourite ? "Remove" : "Add"} favourite`} onClick={() => onFavouriteToggle?.(item)}>
          <Star size={16} />
        </button>
      )}
      {action === "open" ? (
        <Button size="xs" variant="surface" suffixIcon={false} onClick={onOpen}>Open</Button>
      ) : (
        <button className="fx-dashboard-icon-button fx-focus" type="button" aria-label={`${item.name} actions`}>
          <MoreHorizontal size={16} />
        </button>
      )}
    </div>
  );
}

function TaskRow({ task, onOpen }: { task: TaskItem; onOpen: (task: TaskItem) => void }) {
  const Icon = taskIcon(task.severity);
  return (
    <div className="fx-dashboard-task-row">
      <span className="fx-dashboard-task-icon" aria-hidden="true"><Icon size={17} /></span>
      <div className="fx-dashboard-row-main">
        <p>{task.title}</p>
        <span>{task.description}</span>
      </div>
      <div className="fx-dashboard-task-actions">
        <Button size="xs" variant="surface" suffixIcon={false} onClick={() => onOpen(task)}>
          Open
        </Button>
      </div>
    </div>
  );
}

function LoadingDashboard() {
  return (
    <section className="fx-dashboard-loading" aria-label="Loading dashboard examples">
      {Array.from({ length: 11 }, (_, index) => <span className="fx-dashboard-skeleton-card" key={index} />)}
      {Array.from({ length: 4 }, (_, index) => <span className="fx-dashboard-skeleton-large" key={`large-${index}`} />)}
    </section>
  );
}

function EmptyDashboard() {
  return (
    <StatePanel icon={<SearchX size={28} />} title="No dashboard activity yet" body="Once sources, objects and jobs are active, the demonstration metrics and visualisations would appear here." />
  );
}

function ErrorDashboard({ onRetry }: { onRetry: () => void }) {
  return (
    <StatePanel icon={<AlertTriangle size={28} />} title="Dashboard examples could not load" body="This recoverable state keeps the global date-range control visible while the content area reports the issue.">
      <Button variant="surface" prefixIcon={<RefreshCw size={15} />} suffixIcon={false} onClick={onRetry}>Retry</Button>
    </StatePanel>
  );
}

function StatePanel({ icon, title, body, children }: { icon: ReactNode; title: string; body: string; children?: ReactNode }) {
  return (
    <section className="fx-dashboard-state-panel">
      <div className="fx-dashboard-state-icon">{icon}</div>
      <h2>{title}</h2>
      <p>{body}</p>
      {children && <div className="fx-dashboard-state-actions">{children}</div>}
    </section>
  );
}

function resourceIcon(type: ResourceType) {
  if (type === "Data Source") return Database;
  if (type === "Data Model") return Network;
  if (type === "Data Object") return FileBox;
  if (type === "Query Builder") return Zap;
  return Clock3;
}

function taskIcon(severity: TaskSeverity) {
  if (severity === "critical") return AlertTriangle;
  if (severity === "warning") return FileWarning;
  if (severity === "info") return Info;
  return FileCheck2;
}
