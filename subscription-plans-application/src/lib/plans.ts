const URL_BASE = process.env.REACT_APP_BACKEND_URL_BASE || "http://localhost:3001";

export interface Plan {
  code: string;
  name: string;
  monthlyCost: number;
  annualCost: number;

}
export const fetchPlans = async (): Promise<Plan[]> => {
  const response = await fetch(`${URL_BASE}/plans`);
  if (response.ok) {
    return (await response.json());
  } else {
    throw new Error(`Coulnd't fetch plans: ${response.text()}. Status: ${response.status}`);
  }
}
