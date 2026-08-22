export type ComplaintStatus =
  | "Submitted"
  | "Under Review"
  | "In Progress"
  | "Resolved";

export type ComplaintEvidence = {
  name: string;
  type: string;
  size: number;
};

export type Complaint = {
  id: string;
  userId: string;

  category: string;
  title: string;
  description: string;

  date: string;
  time: string;
  location: string;

  status: ComplaintStatus;

  evidence: ComplaintEvidence[];

  createdAt: string;
  updatedAt: string;

  timeline: ComplaintTimelineItem[];
};

export type ComplaintTimelineItem = {
  title: string;
  description: string;
  date: string;
  completed: boolean;
};

const STORAGE_KEY = "janaraksha_complaints";
const USER_KEY = "janaraksha_current_user";

/* ============================================================
   USER
   ============================================================ */

export type DemoUser = {
  id: string;
  name: string;
  email: string;
};

export function getCurrentUser(): DemoUser {
  if (typeof window === "undefined") {
    return {
      id: "demo-user",
      name: "Citizen",
      email: "citizen@example.com",
    };
  }

  const stored = localStorage.getItem(USER_KEY);

  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Ignore invalid localStorage data.
    }
  }

  const defaultUser: DemoUser = {
    id: "demo-user",
    name: "Citizen",
    email: "citizen@example.com",
  };

  localStorage.setItem(USER_KEY, JSON.stringify(defaultUser));

  return defaultUser;
}

export function setCurrentUser(user: DemoUser) {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/* ============================================================
   COMPLAINT STORAGE
   ============================================================ */

function readComplaints(): Complaint[] {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) return [];

  try {
    const parsed = JSON.parse(stored);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeComplaints(complaints: Complaint[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(complaints),
  );
}

/* ============================================================
   ID GENERATOR
   ============================================================ */

export function generateComplaintId(): string {
  const year = new Date().getFullYear();

  const randomNumber = Math.floor(
    10000 + Math.random() * 90000,
  );

  return `JR-${year}-${randomNumber}`;
}

/* ============================================================
   GET ALL COMPLAINTS
   ============================================================ */

export function getComplaints(): Complaint[] {
  return readComplaints();
}

/* ============================================================
   GET CURRENT USER COMPLAINTS
   ============================================================ */

export function getMyComplaints(): Complaint[] {
  const user = getCurrentUser();

  return readComplaints()
    .filter((complaint) => complaint.userId === user.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );
}

/* ============================================================
   GET SINGLE COMPLAINT
   ============================================================ */

export function getComplaintById(
  complaintId: string,
): Complaint | null {
  const complaints = readComplaints();

  return (
    complaints.find(
      (complaint) =>
        complaint.id.toLowerCase() ===
        complaintId.trim().toLowerCase(),
    ) ?? null
  );
}

/* ============================================================
   CREATE COMPLAINT
   ============================================================ */

export type CreateComplaintInput = {
  category: string;
  title: string;
  description: string;

  date: string;
  time: string;
  location: string;

  evidence?: ComplaintEvidence[];
};

export function createComplaint(
  input: CreateComplaintInput,
): Complaint {
  const user = getCurrentUser();

  const now = new Date().toISOString();

  const complaint: Complaint = {
    id: generateComplaintId(),

    userId: user.id,

    category: input.category,
    title: input.title,
    description: input.description,

    date: input.date,
    time: input.time,
    location: input.location,

    status: "Submitted",

    evidence: input.evidence ?? [],

    createdAt: now,
    updatedAt: now,

    timeline: [
      {
        title: "Complaint submitted",
        description:
          "Your complaint has been successfully submitted.",
        date: now,
        completed: true,
      },
      {
        title: "Complaint received",
        description:
          "The complaint has been received by JanaRaksha.",
        date: "",
        completed: false,
      },
      {
        title: "Under review",
        description:
          "The complaint will be reviewed by the appropriate authority.",
        date: "",
        completed: false,
      },
      {
        title: "Investigation",
        description:
          "Further action may be taken if required.",
        date: "",
        completed: false,
      },
      {
        title: "Resolved",
        description:
          "The complaint has been resolved.",
        date: "",
        completed: false,
      },
    ],
  };

  const complaints = readComplaints();

  complaints.push(complaint);

  writeComplaints(complaints);

  return complaint;
}

/* ============================================================
   UPDATE STATUS
   ============================================================ */

export function updateComplaintStatus(
  complaintId: string,
  status: ComplaintStatus,
) {
  const complaints = readComplaints();

  const complaintIndex = complaints.findIndex(
    (complaint) => complaint.id === complaintId,
  );

  if (complaintIndex === -1) return null;

  const complaint = complaints[complaintIndex];

  complaint.status = status;
  complaint.updatedAt = new Date().toISOString();

  const statusIndex: Record<ComplaintStatus, number> = {
    Submitted: 0,
    "Under Review": 2,
    "In Progress": 3,
    Resolved: 4,
  };

  const completedUntil = statusIndex[status];

  complaint.timeline = complaint.timeline.map(
    (item, index) => ({
      ...item,
      completed: index <= completedUntil,
      date:
        index <= completedUntil
          ? item.date || complaint.updatedAt
          : "",
    }),
  );

  complaints[complaintIndex] = complaint;

  writeComplaints(complaints);

  return complaint;
}

/* ============================================================
   DELETE COMPLAINT
   ============================================================ */

export function deleteComplaint(
  complaintId: string,
): boolean {
  const complaints = readComplaints();

  const updated = complaints.filter(
    (complaint) => complaint.id !== complaintId,
  );

  if (updated.length === complaints.length) {
    return false;
  }

  writeComplaints(updated);

  return true;
}

/* ============================================================
   STATISTICS
   ============================================================ */

export function getComplaintStats() {
  const complaints = getMyComplaints();

  return {
    total: complaints.length,

    submitted: complaints.filter(
      (complaint) =>
        complaint.status === "Submitted",
    ).length,

    underReview: complaints.filter(
      (complaint) =>
        complaint.status === "Under Review",
    ).length,

    inProgress: complaints.filter(
      (complaint) =>
        complaint.status === "In Progress",
    ).length,

    resolved: complaints.filter(
      (complaint) =>
        complaint.status === "Resolved",
    ).length,
  };
}

/* ============================================================
   CLEAR DEMO DATA
   ============================================================ */

export function clearComplaintData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem(STORAGE_KEY);
}