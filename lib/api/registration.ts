import type {
  PublicRegistrationRequest,
  PublicRegistrationResponse,
  TeamMemberInput,
} from "@/types/registration";

const API_ROOT = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_ROOT) {
  // eslint-disable-next-line no-console
  console.warn(
    "[registration api] NEXT_PUBLIC_API_BASE_URL is not set. Registration submissions will fail until it is configured."
  );
}

export async function submitPublicRegistration(
  payload: PublicRegistrationRequest
): Promise<PublicRegistrationResponse> {
  if (!API_ROOT) {
    throw new Error(
      "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL."
    );
  }

  const formData = new FormData();

  formData.append("competitionId", payload.competitionId);
  formData.append("teamName", payload.teamName);
  formData.append("turnstileToken", payload.turnstileToken);

  if (payload.referenceCode) {
    formData.append("referenceCode", payload.referenceCode);
  }

  formData.append("leaderFullName", payload.leaderFullName);
  formData.append("leaderEmail", payload.leaderEmail);
  formData.append("leaderCnic", payload.leaderCnic);

  if (payload.leaderPhone) {
    formData.append("leaderPhone", payload.leaderPhone);
  }

  if (payload.leaderInstitution) {
    formData.append("leaderInstitution", payload.leaderInstitution);
  }

  if (payload.leaderRollNumber) {
    formData.append("leaderRollNumber", payload.leaderRollNumber);
  }

  if (payload.members.length > 0) {
    formData.append("members", JSON.stringify(payload.members));
  }

  formData.append("paymentScreenshot", payload.paymentScreenshot);
  formData.append("isEarlyBird", String(payload.isEarlyBird));

  const response = await fetch(`${API_ROOT}/public/registrations`, {
    method: "POST",
    body: formData,
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message =
      json?.message ||
      (Array.isArray(json?.errors) && json.errors[0]?.message) ||
      "Failed to submit registration.";
    throw new Error(message);
  }

  return json.data as PublicRegistrationResponse;
}

export interface RegistrationConflict {
  participant: {
    id: string;
    fullName: string;
    cnic: string;
    email: string;
  };
  competition: {
    id: string;
    name: string;
    compDay: string;
    startTime: string;
    endTime: string;
  };
  team: {
    id: string;
    name: string;
  };
}

export interface CheckRegistrationConflictsRequest {
  competitionId: string;
  leaderCnic?: string;
  members?: TeamMemberInput[];
}

export interface CheckRegistrationConflictsResponse {
  success: boolean;
  conflicts: RegistrationConflict[];
}

export async function checkRegistrationConflicts(
  payload: CheckRegistrationConflictsRequest
): Promise<CheckRegistrationConflictsResponse> {
  if (!API_ROOT) {
    throw new Error(
      "API base URL is not configured. Please set NEXT_PUBLIC_API_BASE_URL."
    );
  }

  const response = await fetch(`${API_ROOT}/public/registrations/conflicts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      competitionId: payload.competitionId,
      leaderCnic: payload.leaderCnic ?? "",
      members: payload.members ? JSON.stringify(payload.members) : "",
    }),
  });

  const json = await response.json();

  if (!response.ok || !json.success) {
    const message =
      json?.message ||
      (Array.isArray(json?.errors) && json.errors[0]?.message) ||
      "Failed to check for conflicts.";
    throw new Error(message);
  }

  return json as CheckRegistrationConflictsResponse;
}

