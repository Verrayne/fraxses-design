export type DateRange = "1d" | "7d" | "30d";
export type DemoPageState = "populated" | "loading" | "empty" | "error";
export type ResourceType = "Data Source" | "Data Model" | "Data Object" | "Query Builder" | "Cache Configuration";
export type TrendTone = "positive" | "negative" | "neutral" | "attention";
export type TrendDirection = "up" | "down" | "flat";
export type TaskSeverity = "info" | "normal" | "warning" | "critical";

export interface MetricData {
  id: string;
  heading: string;
  definition: string;
  value: string;
  comparison: string;
  trendTone: TrendTone;
  trendDirection: TrendDirection;
  sparkline?: number[];
  supportingLabel?: string;
  statusLabel?: string;
}

export interface NamedValue {
  name: string;
  value: number;
  definition?: string;
}

export interface CacheRunPoint {
  label: string;
  completed: number;
  failed: number;
}

export interface PublicationPoint {
  label: string;
  requests: number;
  approvals: number;
  rejections: number;
}

export interface GraphData {
  sourcesByType: NamedValue[];
  objectsBySize: NamedValue[];
  cacheRuns: CacheRunPoint[];
  discoveryStatus: NamedValue[];
  publications: PublicationPoint[];
}

export interface DashboardListItem {
  id: string;
  name: string;
  resourceType: ResourceType;
  meta: string;
  detail: string;
  trend?: string;
  status?: string;
  favourite?: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: TaskSeverity;
  age: string;
  primaryAction: string;
  secondaryAction?: string;
  complete?: boolean;
}

export interface DashboardRangeData {
  metrics: MetricData[];
  graphs: GraphData;
  favourites: DashboardListItem[];
  popular: DashboardListItem[];
  recent: DashboardListItem[];
  tasks: TaskItem[];
}

const metricDefinitions = {
  draftObjects: "Data Objects that have been created or edited but have not yet been published.",
  publishedObjects: "Data Objects currently published and available for authorised use.",
  draftSources: "Data Sources that have been created but are not yet fully connected or configured.",
  connectedSources: "Data Sources that are connected and have successfully completed their initial metadata discovery.",
  scheduledJobs: "Jobs that are scheduled, queued or still need to run, including cache runs, discoveries, tests and exception-management processes.",
  validationErrors: "Draft Data Objects that were saved with one or more validation errors.",
  publicationRequests: "Data Objects submitted for publication and awaiting review.",
  publicationApprovals: "Publication requests approved during the selected period.",
  publicationRejections: "Publication requests rejected during the selected period.",
  userCount: "The number of users active during the selected period.",
  importedObjects: "Data Objects imported by users during the selected period.",
};

function metrics(values: Array<Omit<MetricData, "definition">>): MetricData[] {
  const definitions: Record<string, string> = {
    draftObjects: metricDefinitions.draftObjects,
    publishedObjects: metricDefinitions.publishedObjects,
    draftSources: metricDefinitions.draftSources,
    connectedSources: metricDefinitions.connectedSources,
    scheduledJobs: metricDefinitions.scheduledJobs,
    validationErrors: metricDefinitions.validationErrors,
    publicationRequests: metricDefinitions.publicationRequests,
    publicationApprovals: metricDefinitions.publicationApprovals,
    publicationRejections: metricDefinitions.publicationRejections,
    userCount: metricDefinitions.userCount,
    importedObjects: metricDefinitions.importedObjects,
  };
  return values.map((item) => ({ ...item, definition: definitions[item.id] }));
}

const sourceTypes = [
  "Microsoft SQL Server",
  "PostgreSQL",
  "Oracle",
  "REST API",
  "CSV",
  "Excel",
  "Salesforce",
  "SAP",
];

function sourceValues(values: number[]): NamedValue[] {
  return sourceTypes.map((name, index) => ({ name, value: values[index] })).sort((a, b) => b.value - a.value);
}

const objectSizes = [
  { name: "Small", definition: "1-3 entities" },
  { name: "Medium", definition: "4-10 entities" },
  { name: "Large", definition: "More than 10 entities" },
];

function sizeValues(values: number[]): NamedValue[] {
  return objectSizes.map((item, index) => ({ ...item, value: values[index] }));
}

export const dashboardExampleData: Record<DateRange, DashboardRangeData> = {
  "1d": {
    metrics: metrics([
      { id: "draftObjects", heading: "Draft Objects", value: "34", comparison: "5 edited today", trendTone: "neutral", trendDirection: "flat", sparkline: [18, 22, 19, 25, 27, 31, 34], supportingLabel: "Work in progress" },
      { id: "publishedObjects", heading: "Published Objects", value: "612", comparison: "+0.8% today", trendTone: "positive", trendDirection: "up", sparkline: [590, 594, 598, 603, 606, 610, 612] },
      { id: "draftSources", heading: "Draft Sources", value: "8", comparison: "2 require connection details", trendTone: "attention", trendDirection: "flat", statusLabel: "2 require attention" },
      { id: "connectedSources", heading: "Connected Sources", value: "146", comparison: "1 connected today", trendTone: "positive", trendDirection: "up", sparkline: [140, 141, 142, 143, 145, 145, 146] },
      { id: "scheduledJobs", heading: "Scheduled Jobs", value: "27", comparison: "6 fewer pending jobs", trendTone: "positive", trendDirection: "down", supportingLabel: "Queued or scheduled" },
      { id: "validationErrors", heading: "Objects with Validation Errors", value: "11", comparison: "+3 since this morning", trendTone: "negative", trendDirection: "up", statusLabel: "Blocking submission" },
      { id: "publicationRequests", heading: "Publication Requests", value: "9", comparison: "Awaiting review", trendTone: "attention", trendDirection: "flat" },
      { id: "publicationApprovals", heading: "Publication Approvals", value: "7", comparison: "+2 vs yesterday", trendTone: "positive", trendDirection: "up", sparkline: [2, 3, 3, 5, 5, 6, 7] },
      { id: "publicationRejections", heading: "Publication Rejections", value: "2", comparison: "1 more than yesterday", trendTone: "negative", trendDirection: "up" },
      { id: "userCount", heading: "User Count", value: "58", comparison: "Active today", trendTone: "neutral", trendDirection: "flat", supportingLabel: "Across 7 workspaces" },
      { id: "importedObjects", heading: "Imported Objects", value: "19", comparison: "4 from CSV uploads", trendTone: "neutral", trendDirection: "flat", sparkline: [4, 5, 8, 9, 13, 17, 19] },
    ]),
    graphs: {
      sourcesByType: sourceValues([38, 31, 18, 17, 14, 12, 9, 7]),
      objectsBySize: sizeValues([312, 206, 94]),
      cacheRuns: [
        { label: "00:00", completed: 18, failed: 1 },
        { label: "04:00", completed: 22, failed: 0 },
        { label: "08:00", completed: 36, failed: 2 },
        { label: "12:00", completed: 41, failed: 1 },
        { label: "16:00", completed: 29, failed: 3 },
        { label: "20:00", completed: 24, failed: 1 },
      ],
      discoveryStatus: [
        { name: "Completed", value: 31 },
        { name: "Running", value: 6 },
        { name: "Queued", value: 5 },
        { name: "Stopped by AI", value: 3 },
        { name: "Failed", value: 2 },
      ],
      publications: [
        { label: "08:00", requests: 2, approvals: 1, rejections: 0 },
        { label: "12:00", requests: 3, approvals: 2, rejections: 1 },
        { label: "16:00", requests: 4, approvals: 3, rejections: 1 },
        { label: "20:00", requests: 2, approvals: 1, rejections: 0 },
      ],
    },
    favourites: [
      { id: "fav-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "Owned by Customer Data", detail: "Opened 2h ago", favourite: true },
      { id: "fav-claims-sql", name: "Claims SQL Server", resourceType: "Data Source", meta: "Insurance workspace", detail: "Updated today", favourite: true },
      { id: "fav-risk-model", name: "Operational Risk Model", resourceType: "Data Model", meta: "Governance", detail: "Opened yesterday", favourite: true },
    ],
    popular: [
      { id: "pop-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "143 users", detail: "2,440 opens", trend: "+12% today" },
      { id: "pop-finance-api", name: "Finance REST API", resourceType: "Data Source", meta: "58 users", detail: "920 queries", trend: "+4%" },
      { id: "pop-policy-model", name: "Policy Performance Model", resourceType: "Data Model", meta: "41 users", detail: "310 opens", trend: "steady" },
    ],
    recent: [
      { id: "recent-object", name: "Revenue Exceptions Object", resourceType: "Data Object", meta: "Edited", detail: "18 minutes ago", status: "Draft" },
      { id: "recent-source", name: "PostgreSQL Warehouse", resourceType: "Data Source", meta: "Viewed", detail: "42 minutes ago", status: "Connected" },
      { id: "recent-query", name: "Claims sampling session", resourceType: "Query Builder", meta: "Session", detail: "1 hour ago", status: "Saved" },
    ],
    tasks: [
      { id: "task-ai-stop", title: "AI stopped a discovery", description: "Supplier discovery paused after detecting unexpected schema drift.", category: "Discovery", severity: "warning", age: "35m old", primaryAction: "Review", secondaryAction: "Dismiss" },
      { id: "task-cache", title: "Cache run failed", description: "Customer 360 cache failed after two retry attempts.", category: "Cache", severity: "critical", age: "1h old", primaryAction: "Retry", secondaryAction: "View log" },
      { id: "task-draft-source", title: "Draft source needs details", description: "Claims SQL Server is missing connection credentials.", category: "Source setup", severity: "normal", age: "Today", primaryAction: "Configure source" },
    ],
  },
  "7d": {
    metrics: metrics([
      { id: "draftObjects", heading: "Draft Objects", value: "86", comparison: "12 fewer than last week", trendTone: "positive", trendDirection: "down", sparkline: [92, 89, 94, 91, 88, 87, 86], supportingLabel: "Across 5 workspaces" },
      { id: "publishedObjects", heading: "Published Objects", value: "648", comparison: "+6.4% vs previous 7 days", trendTone: "positive", trendDirection: "up", sparkline: [610, 615, 619, 626, 633, 641, 648] },
      { id: "draftSources", heading: "Draft Sources", value: "15", comparison: "3 require connection details", trendTone: "attention", trendDirection: "flat", statusLabel: "3 require attention" },
      { id: "connectedSources", heading: "Connected Sources", value: "156", comparison: "+7 connected this week", trendTone: "positive", trendDirection: "up", sparkline: [143, 145, 148, 149, 153, 154, 156] },
      { id: "scheduledJobs", heading: "Scheduled Jobs", value: "42", comparison: "9 fewer pending jobs", trendTone: "positive", trendDirection: "down", supportingLabel: "Next 24 hours" },
      { id: "validationErrors", heading: "Objects with Validation Errors", value: "18", comparison: "+5 vs previous week", trendTone: "negative", trendDirection: "up", statusLabel: "Blocking submission" },
      { id: "publicationRequests", heading: "Publication Requests", value: "31", comparison: "Awaiting review", trendTone: "attention", trendDirection: "flat" },
      { id: "publicationApprovals", heading: "Publication Approvals", value: "44", comparison: "+18% vs previous week", trendTone: "positive", trendDirection: "up", sparkline: [4, 6, 5, 7, 8, 6, 8] },
      { id: "publicationRejections", heading: "Publication Rejections", value: "8", comparison: "2 more than previous week", trendTone: "negative", trendDirection: "up" },
      { id: "userCount", heading: "User Count", value: "126", comparison: "Active this week", trendTone: "neutral", trendDirection: "flat", supportingLabel: "14 new users" },
      { id: "importedObjects", heading: "Imported Objects", value: "142", comparison: "+22 from last week", trendTone: "positive", trendDirection: "up", sparkline: [12, 18, 20, 24, 19, 27, 22] },
    ]),
    graphs: {
      sourcesByType: sourceValues([42, 36, 21, 20, 18, 15, 12, 9]),
      objectsBySize: sizeValues([348, 218, 82]),
      cacheRuns: [
        { label: "Mon", completed: 112, failed: 4 },
        { label: "Tue", completed: 124, failed: 3 },
        { label: "Wed", completed: 118, failed: 7 },
        { label: "Thu", completed: 136, failed: 5 },
        { label: "Fri", completed: 142, failed: 4 },
        { label: "Sat", completed: 96, failed: 2 },
        { label: "Sun", completed: 88, failed: 1 },
      ],
      discoveryStatus: [
        { name: "Completed", value: 94 },
        { name: "Queued", value: 18 },
        { name: "Running", value: 12 },
        { name: "Stopped by AI", value: 7 },
        { name: "Failed", value: 5 },
      ],
      publications: [
        { label: "Mon", requests: 7, approvals: 6, rejections: 1 },
        { label: "Tue", requests: 5, approvals: 7, rejections: 1 },
        { label: "Wed", requests: 6, approvals: 8, rejections: 2 },
        { label: "Thu", requests: 4, approvals: 5, rejections: 1 },
        { label: "Fri", requests: 8, approvals: 9, rejections: 2 },
        { label: "Sat", requests: 2, approvals: 4, rejections: 0 },
        { label: "Sun", requests: 1, approvals: 5, rejections: 1 },
      ],
    },
    favourites: [
      { id: "fav-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "Owned by Customer Data", detail: "Opened yesterday", favourite: true },
      { id: "fav-claims-sql", name: "Claims SQL Server", resourceType: "Data Source", meta: "Insurance workspace", detail: "Updated 2 days ago", favourite: true },
      { id: "fav-risk-model", name: "Operational Risk Model", resourceType: "Data Model", meta: "Governance", detail: "Opened 4 days ago", favourite: true },
      { id: "fav-product-model", name: "Product Catalogue Model", resourceType: "Data Model", meta: "Retail workspace", detail: "Updated this week", favourite: true },
    ],
    popular: [
      { id: "pop-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "143 users", detail: "9,840 opens", trend: "+18% this week" },
      { id: "pop-finance-api", name: "Finance REST API", resourceType: "Data Source", meta: "72 users", detail: "4,120 queries", trend: "+9%" },
      { id: "pop-policy-model", name: "Policy Performance Model", resourceType: "Data Model", meta: "61 users", detail: "1,870 opens", trend: "+6%" },
      { id: "pop-salesforce", name: "Salesforce Accounts", resourceType: "Data Source", meta: "44 users", detail: "1,240 queries", trend: "steady" },
    ],
    recent: [
      { id: "recent-object", name: "Revenue Exceptions Object", resourceType: "Data Object", meta: "Edited", detail: "Today", status: "Draft" },
      { id: "recent-source", name: "PostgreSQL Warehouse", resourceType: "Data Source", meta: "Viewed", detail: "Yesterday", status: "Connected" },
      { id: "recent-model", name: "Supplier Risk Model", resourceType: "Data Model", meta: "Opened", detail: "2 days ago", status: "Published" },
      { id: "recent-query", name: "Claims sampling session", resourceType: "Query Builder", meta: "Session", detail: "3 days ago", status: "Saved" },
      { id: "recent-cache", name: "Customer cache rules", resourceType: "Cache Configuration", meta: "Updated", detail: "5 days ago", status: "Needs run" },
    ],
    tasks: [
      { id: "task-ai-stop", title: "AI stopped a discovery", description: "Supplier discovery paused after detecting unexpected schema drift.", category: "Discovery", severity: "warning", age: "35m old", primaryAction: "Review", secondaryAction: "Dismiss" },
      { id: "task-cache", title: "Cache run failed", description: "Customer 360 cache failed after two retry attempts.", category: "Cache", severity: "critical", age: "1h old", primaryAction: "Retry", secondaryAction: "View log" },
      { id: "task-approval", title: "Object requires publication approval", description: "Revenue Exceptions Object is waiting for your review.", category: "Publication", severity: "normal", age: "Today", primaryAction: "Approve", secondaryAction: "Open object" },
      { id: "task-intel", title: "Data Intelligence change needs approval", description: "Three relationship suggestions were submitted by AI review.", category: "Data Intelligence", severity: "info", age: "2d old", primaryAction: "Review" },
      { id: "task-validation", title: "Object contains validation errors", description: "Policy Terms Object has blocking field mapping errors.", category: "Validation", severity: "warning", age: "3d old", primaryAction: "Resolve errors" },
    ],
  },
  "30d": {
    metrics: metrics([
      { id: "draftObjects", heading: "Draft Objects", value: "214", comparison: "+24 vs previous month", trendTone: "neutral", trendDirection: "up", sparkline: [160, 172, 181, 176, 194, 203, 214], supportingLabel: "Monthly working set" },
      { id: "publishedObjects", heading: "Published Objects", value: "812", comparison: "+14.2% vs previous 30 days", trendTone: "positive", trendDirection: "up", sparkline: [690, 710, 724, 752, 781, 798, 812] },
      { id: "draftSources", heading: "Draft Sources", value: "28", comparison: "6 require connection details", trendTone: "attention", trendDirection: "flat", statusLabel: "6 require attention" },
      { id: "connectedSources", heading: "Connected Sources", value: "184", comparison: "+31 connected this month", trendTone: "positive", trendDirection: "up", sparkline: [151, 158, 162, 169, 174, 180, 184] },
      { id: "scheduledJobs", heading: "Scheduled Jobs", value: "76", comparison: "14 fewer pending jobs", trendTone: "positive", trendDirection: "down", supportingLabel: "Next 7 days" },
      { id: "validationErrors", heading: "Objects with Validation Errors", value: "41", comparison: "-9 resolved this month", trendTone: "positive", trendDirection: "down", statusLabel: "Still blocking 41" },
      { id: "publicationRequests", heading: "Publication Requests", value: "74", comparison: "Awaiting review", trendTone: "attention", trendDirection: "flat" },
      { id: "publicationApprovals", heading: "Publication Approvals", value: "186", comparison: "+28% vs previous month", trendTone: "positive", trendDirection: "up", sparkline: [18, 25, 20, 30, 28, 34, 31] },
      { id: "publicationRejections", heading: "Publication Rejections", value: "29", comparison: "+6 vs previous month", trendTone: "negative", trendDirection: "up" },
      { id: "userCount", heading: "User Count", value: "238", comparison: "Active this month", trendTone: "neutral", trendDirection: "up", supportingLabel: "31 new users" },
      { id: "importedObjects", heading: "Imported Objects", value: "487", comparison: "+96 imports this month", trendTone: "neutral", trendDirection: "up", sparkline: [48, 62, 54, 71, 83, 77, 92] },
    ]),
    graphs: {
      sourcesByType: sourceValues([51, 43, 29, 27, 24, 19, 17, 14]),
      objectsBySize: sizeValues([426, 271, 115]),
      cacheRuns: [
        { label: "W1", completed: 642, failed: 18 },
        { label: "W2", completed: 704, failed: 21 },
        { label: "W3", completed: 768, failed: 16 },
        { label: "W4", completed: 826, failed: 14 },
        { label: "W5", completed: 392, failed: 7 },
      ],
      discoveryStatus: [
        { name: "Completed", value: 318 },
        { name: "Queued", value: 44 },
        { name: "Running", value: 22 },
        { name: "Stopped by AI", value: 16 },
        { name: "Failed", value: 13 },
      ],
      publications: [
        { label: "W1", requests: 28, approvals: 42, rejections: 7 },
        { label: "W2", requests: 34, approvals: 49, rejections: 9 },
        { label: "W3", requests: 26, approvals: 51, rejections: 6 },
        { label: "W4", requests: 31, approvals: 44, rejections: 5 },
        { label: "W5", requests: 14, approvals: 18, rejections: 2 },
      ],
    },
    favourites: [
      { id: "fav-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "Owned by Customer Data", detail: "Opened this month", favourite: true },
      { id: "fav-claims-sql", name: "Claims SQL Server", resourceType: "Data Source", meta: "Insurance workspace", detail: "Updated 9 days ago", favourite: true },
      { id: "fav-risk-model", name: "Operational Risk Model", resourceType: "Data Model", meta: "Governance", detail: "Opened 12 days ago", favourite: true },
      { id: "fav-product-model", name: "Product Catalogue Model", resourceType: "Data Model", meta: "Retail workspace", detail: "Updated this month", favourite: true },
    ],
    popular: [
      { id: "pop-customer-360", name: "Customer 360 Object", resourceType: "Data Object", meta: "184 users", detail: "31,420 opens", trend: "+24% this month" },
      { id: "pop-finance-api", name: "Finance REST API", resourceType: "Data Source", meta: "96 users", detail: "15,880 queries", trend: "+16%" },
      { id: "pop-policy-model", name: "Policy Performance Model", resourceType: "Data Model", meta: "74 users", detail: "6,940 opens", trend: "+11%" },
      { id: "pop-salesforce", name: "Salesforce Accounts", resourceType: "Data Source", meta: "69 users", detail: "4,630 queries", trend: "+5%" },
    ],
    recent: [
      { id: "recent-object", name: "Revenue Exceptions Object", resourceType: "Data Object", meta: "Edited", detail: "This week", status: "Draft" },
      { id: "recent-source", name: "PostgreSQL Warehouse", resourceType: "Data Source", meta: "Viewed", detail: "This week", status: "Connected" },
      { id: "recent-model", name: "Supplier Risk Model", resourceType: "Data Model", meta: "Opened", detail: "Last week", status: "Published" },
      { id: "recent-query", name: "Claims sampling session", resourceType: "Query Builder", meta: "Session", detail: "2 weeks ago", status: "Saved" },
      { id: "recent-cache", name: "Customer cache rules", resourceType: "Cache Configuration", meta: "Updated", detail: "3 weeks ago", status: "Needs run" },
    ],
    tasks: [
      { id: "task-ai-stop", title: "AI stopped a discovery", description: "Supplier discovery paused after detecting unexpected schema drift.", category: "Discovery", severity: "warning", age: "35m old", primaryAction: "Review", secondaryAction: "Dismiss" },
      { id: "task-cache", title: "Cache run failed", description: "Customer 360 cache failed after two retry attempts.", category: "Cache", severity: "critical", age: "1h old", primaryAction: "Retry", secondaryAction: "View log" },
      { id: "task-approval", title: "Object requires publication approval", description: "Revenue Exceptions Object is waiting for your review.", category: "Publication", severity: "normal", age: "Today", primaryAction: "Approve", secondaryAction: "Open object" },
      { id: "task-intel", title: "Data Intelligence change needs approval", description: "Three relationship suggestions were submitted by AI review.", category: "Data Intelligence", severity: "info", age: "2d old", primaryAction: "Review" },
      { id: "task-draft-source", title: "Draft source needs connection details", description: "Finance API sandbox is missing authentication settings.", category: "Source setup", severity: "normal", age: "5d old", primaryAction: "Configure source" },
      { id: "task-validation", title: "Object contains validation errors", description: "Policy Terms Object has blocking field mapping errors.", category: "Validation", severity: "warning", age: "1w old", primaryAction: "Resolve errors" },
    ],
  },
};
